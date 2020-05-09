const fs = require("./fs");
const logger = require("./logger");
const pr = require("./parser");
const Speller = require("./speller");

const EOL = "\r\n";
const dirName = __dirname + "/../";
const sp = new Speller(JSON.parse(fs.readFile(dirName + "/.yaspellerrc")));

class Transformer {

	constructor() {
	}

	transformRootFile(rootFileName, mdFilesContents) {
		let readMeContents = [];
		readMeContents.push("# Вопросы для собеседования на разработчика Java");

		readMeContents.push("");
		readMeContents.push("[..::Live quiz::..](https://timmson.github.io/java-interview/quiz/)");
		readMeContents.push("");

		mdFilesContents.forEach(mdFileContent => readMeContents.push(pr.mapHeaderToLink(mdFileContent.articleName)));

		readMeContents.push("");

		mdFilesContents.forEach((mdFileContent) => {
			readMeContents.push("## " + mdFileContent.articleName);

			mdFileContent.questions.forEach(q => readMeContents.push(q => pr.mapHeaderAndAnchorToLink(q.title, q.anchor, mdFileContent.fileName)));
			readMeContents.push("");

			readMeContents.push("[к оглавлению](#вопросы-для-собеседования-на-разработчика-java)");
			readMeContents.push("");
		});

		let startTime = new Date().getTime();
		fs.writeFileContent(rootFileName, readMeContents.join(EOL))
			.then(() => logger.infoFile(rootFileName, startTime)).catch(e => logger.error(e));
	}

	transform(mdFile) {
		let promises = [];
		let startTime = new Date().getTime();
		let fileSource = fs.readFile(mdFile);

		promises.push(new Promise(async (resolve) => {
			let errors = await sp.check(fileSource, mdFile);
			resolve({fileName: mdFile, errors: errors});
		}));


		let fileContent = pr.splitIntoLines(fileSource);
		let articleName = pr.getArticleName(fileContent);
		let questions = pr.getQuestions(fileContent);
		let newFileContent = pr.replaceTableOfContent(fileContent, questions.map(q => pr.mapHeaderAndAnchorToLink(q.title, q.anchor))).join(EOL);

		promises.push(new Promise(async (resolve) => {
				let errors = [];
				try {
					await fs.writeFileContent(mdFile, newFileContent);
				} catch (e) {
					errors.push(e);
				}
				resolve({fileName: mdFile, errors: errors});
			})
		);

		logger.infoFile(mdFile, startTime);

		let mdFileName = mdFile.split("/")
		return {
			fileName: mdFileName[mdFileName.length - 1],
			articleName: articleName,
			questions: questions,
			promises: promises
		}
	}

	persistStructure(moduleFileName, mdFilesContents) {
		let startTime = new Date().getTime();

		let content = mdFilesContents.reduce((accumulator, current) => {
			return accumulator.concat(current.questions.map(q => new Object({
				subject: current.articleName,
				url: "../" + current.fileName.split(".")[0] + ".html" + q.anchor,
				title: q.title,
				answer: q.body
			})));
		}, []);

		let data = "module.exports =" + JSON.stringify(content) + ";";
		fs.writeFileContent(moduleFileName, data)
			.then(() => logger.infoFile(moduleFileName, startTime)).catch(e => logger.error(e));
	}

}

module.exports = Transformer;