const fs = require("./lib/fs");
const pr = require("./lib/parser");
require("colors");

const EOL = "\r\n";
const rootFileName = "README.md";
const dirName = __dirname;

console.log("Files generation:");

function log(fileName, startTime) {
    console.log("✓".green + " " + dirName + "/" + fileName + " " + ((new Date().getTime() - startTime) + " ms").magenta);
}

const mdFilesContents = fs.getListOfMDFiles(dirName)
    .map((mdFile) => {
            let startTime = new Date().getTime();
            let fileContent = fs.readFileContent(mdFile);
            let articleName = pr.getArticleName(fileContent);
            let questions = pr.getQuestions(fileContent);

            fs.writeFileContent(
                mdFile,
                pr.replaceTableOfContent(fileContent, questions.map(q => pr.mapHeaderToLink(q))).join(EOL)
            ).then(() => log(mdFile, startTime)).catch(e => console.error(e));

            return {
                fileName: mdFile,
                articleName: articleName,
                questions: questions
            }
        }
    );

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
