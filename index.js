const fs = require("./lib/fs");
const pr = require("./lib/parser");
const Speller = require("./lib/speller");
require("colors");

const EOL = "\r\n";
const rootFileName = "README.md";
const dirName = __dirname;
const sp = new Speller(JSON.parse(fs.readFile(dirName + "/.yaspellerrc")));

console.log("File spellcheking and generation:");

function log(fileName, startTime) {
	console.log("✓".green + " " + dirName + "/" + fileName + " " + ((new Date().getTime() - startTime) + " ms").magenta);
}

function logError(errorResult) {
	console.log("✗".red + " " + dirName + "/" + errorResult.fileName);
	console.log("-----".red);
	console.log(JSON.stringify(errorResult.errors, null, 2).red);
	console.log("-----".red);
}

let promises = [];

const mdFilesContents = fs.getListOfMDFiles(dirName)
	.map((mdFile) => {
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
			let newFileContnent = pr.replaceTableOfContent(fileContent, questions.map(q => pr.mapHeaderToLink(q))).join(EOL);

			promises.push(new Promise(async (resolve) => {
					let errors = [];
					try {
						await fs.writeFileContent(mdFile, newFileContnent);
					} catch (e) {
						errors.push(e);
					}
					resolve({fileName: mdFile, errors: errors});
				})
			);

			log(mdFile, startTime);

			return {
				fileName: mdFile,
				articleName: articleName,
				questions: questions
			}
		}
	);

Promise.all(promises).then(results => {

	let errorResults = results.filter(er => er.errors && er.errors.length > 0);

	if (errorResults.length > 0) {
		errorResults.forEach(v => logError(v));
		process.exit(1);
	}

	let readMeContents = [];
	readMeContents.push("# Вопросы для собеседования на Java Developer");

	readMeContents.push("");

	mdFilesContents.forEach(mdFileContent => readMeContents.push(pr.mapHeaderToLink(mdFileContent.articleName)));

	readMeContents.push("");

	mdFilesContents.forEach((mdFileContent) => {
		readMeContents.push("## " + mdFileContent.articleName);

		mdFileContent.questions.forEach(q => readMeContents.push(pr.mapHeaderToLink(q, mdFileContent.fileName)));
		readMeContents.push("");

		readMeContents.push("[к оглавлению](#Вопросы-для-собеседования-на-java-developer)");
		readMeContents.push("");
	});

	let startTime = new Date().getTime();
	fs.writeFileContent(rootFileName, readMeContents.join(EOL)).then(() => log(rootFileName, startTime)).catch(e => console.error(e));
})


