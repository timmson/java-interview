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

function logError(fileName, startTime, reason) {
	console.log("✗".red + " " + dirName + "/" + fileName + " " + ((new Date().getTime() - startTime) + " ms").magenta);
	console.log("-----".red);
	console.log(JSON.stringify(reason, null, 2).red);
	console.log("-----".red);
}

let promises = [];

const mdFilesContents = fs.getListOfMDFiles(dirName)
	.map((mdFile) => {
			let startTime = new Date().getTime();
			let fileSource = fs.readFile(mdFile);

			async function f() {

			}

			promises.push(sp.check(fileSource));

			let fileContent = pr.splitIntoLines(fileSource);
			let articleName = pr.getArticleName(fileContent);
			let questions = pr.getQuestions(fileContent);

			promises.push(fs.writeFileContent(
				mdFile,
				pr.replaceTableOfContent(fileContent, questions.map(q => pr.mapHeaderToLink(q))).join(EOL)
			));

			log(mdFile, startTime);

			return {
				fileName: mdFile,
				articleName: articleName,
				questions: questions
			}
		}
	);

Promise.all(promises).then(values => {

	let err = values.filter(v => v && v.length > 0);
	err.forEach(v => logError("", 0, v));

	if (err.length > 0) {
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


