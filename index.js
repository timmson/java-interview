const fs = require("./lib/fs");
const pr = require("./lib/parser");

const EOL = "\r\n";
const rootFileName = "README.md";

const mdFilesContents = fs.getListOfMDFiles(__dirname).slice(0, 1)
    .map(mdFile => {
            let fileContent = fs.readFileContent(mdFile);

            return {
                fileName: mdFile,
                articleName: pr.getArticleName(fileContent),
                questions: pr.getQuestions(fileContent)
            }
        }
    );

/*
let readMeContents = [];
readMeContents.push("# Вопросы для собеседования на Java Developer");

readMeContents.push("");

mdFilesContents.forEach(mdFileContent => readMeContents.push(pr.mapHeaderToLink(mdFileContent.articleName)));

readMeContents.push("");

mdFilesContents.forEach(mdFileContent => {
    readMeContents.push("## " + mdFileContent.articleName);

    mdFileContent.questions.forEach(q => readMeContents.push(pr.mapHeaderToLink(q, mdFileContent.fileName)));
    readMeContents.push("");

    readMeContents.push("[к оглавлению](#Вопросы-для-собеседования-на-java-developer)");
    readMeContents.push("");
});

fs.writeFileContent(rootFileName, readMeContents.join(EOL));

console.log("✓ File " + rootFileName + " was generated");
*/
