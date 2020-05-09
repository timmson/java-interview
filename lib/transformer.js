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
		readMeContents.push("# Вопросы для собеседования на Java Developer");

		readMeContents.push("");

		mdFilesContents.forEach(mdFileContent => readMeContents.push(pr.mapHeaderToLink(mdFileContent.articleName)));

		readMeContents.push("");

		mdFilesContents.forEach((mdFileContent) => {
			readMeContents.push("## " + mdFileContent.articleName);

			mdFileContent.questions.forEach(q => readMeContents.push(pr.mapHeaderToLink(q, mdFileContent.fileName)));
			readMeContents.push("");

			readMeContents.push("[к оглавлению](#вопросы-для-собеседования-на-java-developer)");
			readMeContents.push("");
		});

		let startTime = new Date().getTime();
		fs.writeFileContent(rootFileName, readMeContents.join(EOL)).then(() => logger.infoFile(rootFileName, startTime)).catch(e => logger.error(e));
	}

	transform(mdFile) {
		let promises = [];
		let startTime = new Date().getTime();
		let fileSource = fs.readFile(mdFile);

		async function f() {

		}

		promises.push(new Promise(async (resolve) => {
			let errors = await sp.check(fileSource, mdFile);
			resolve({fileName: mdFile, errors: errors});
		}));


		let fileContent = pr.splitIntoLines(fileSource);
		let articleName = pr.getArticleName(fileContent);
		let questions = pr.getQuestions(fileContent);
		let newFileContent = pr.replaceTableOfContent(fileContent, questions.map(q => pr.mapHeaderToLink(q))).join(EOL);

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

};

module.exports = Transformer;