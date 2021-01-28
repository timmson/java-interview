const Converter = require("showdown").Converter;
const Mustache = require("mustache");

const Logger = require("./logger");
const Speller = require("./speller");

const converter = new Converter({tables: true});
const EOL = "\r\n";
const dirName = __dirname + "/../";

class Transformer {

	constructor(fs, pr, logger) {
		this.fs = fs || require("./fs");
		this.pr = pr || require("./parser");
		this.logger = logger || new Logger();
		this.sp = new Speller(JSON.parse(this.fs.readFile(dirName + "/.yaspellerrc")));
	}

	transformRootFile(rootFileName, mdFilesContents) {
		const articles = mdFilesContents.map(mdFileContent => this.pr.mapHeaderAndAnchorToLink(mdFileContent.articleName, "", mdFileContent.fileName));

		const template = this.fs.readFile(rootFileName + ".template");

		let startTime = new Date().getTime();
		const readMeContents = Mustache.render(template, {articles: articles});
		this.fs.writeFileContent(rootFileName, readMeContents)
			.then(() => this.logger.infoFile(rootFileName, startTime)).catch(e => this.logger.error(e));
	}

	transform(mdFile) {
		let promises = [];
		let startTime = new Date().getTime();
		let fileSource = this.fs.readFile(mdFile);

		promises.push(new Promise((resolve) => {
			this.sp.check(fileSource, mdFile).then(errors => resolve({fileName: mdFile, errors: errors}));
		}));

		let fileContent = this.pr.splitIntoLines(fileSource);
		let articleName = this.pr.getArticleName(fileContent);
		let questions = this.pr.getQuestions(fileContent);
		let newFileContent = this.pr.replaceTableOfContent(fileContent, questions.map(q => this.pr.mapHeaderAndAnchorToLink(q.title, q.anchor))).join(EOL);

		promises.push(new Promise((resolve) => {
			this.fs.writeFileContent(mdFile, newFileContent).then(
				resolve({fileName: mdFile, errors: []}),
				e => resolve({fileName: mdFile, errors: [e]})
			);
		})
		);

		this.logger.infoFile(mdFile, startTime);

		let mdFileName = mdFile.split("/");

		return {
			fileName: mdFileName[mdFileName.length - 1],
			articleName: articleName,
			questions: questions,
			promises: promises
		};
	}

	persistStructure(moduleFileName, mdFilesContents) {
		let startTime = new Date().getTime();

		let content = mdFilesContents.reduce((accumulator, current) => {
			return accumulator.concat(current.questions.map(q => {
				return {
					subject: current.articleName,
					url: current.fileName.split(".")[0] + ".html" + q.anchor,
					title: converter.makeHtml(q.title),
					answer: q.body ? converter.makeHtml(q.body) : ""
				};
			}));
		}, []);

		let data = "module.exports =" + JSON.stringify(content) + ";";
		this.fs.writeFileContent(moduleFileName, data)
			.then(() => this.logger.infoFile(moduleFileName, startTime)).catch(e => this.logger.error(e));
	}

}

module.exports = Transformer;