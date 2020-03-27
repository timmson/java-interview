const fs = require("./lib/fs");
const pr = require("./lib/parser");
require("colors");

const EOL = "\r\n";
const rootFileName = "README.md";

const mdFilesContents = fs.getListOfMDFiles(__dirname)
    .map(mdFile => {
            let fileContent = fs.readFileContent(mdFile);
            let articleName = pr.getArticleName(fileContent);
            let questions = pr.getQuestions(fileContent);

            fs.writeFileContent(
                mdFile,
                pr.replaceTableOfContent(fileContent, questions.map(q => pr.mapHeaderToLink(q))).join(EOL)
            ).then(() => console.log("✓".green + " File " + mdFile + " was generated")).catch(e => console.error(e));

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

mdFilesContents.forEach(mdFileContent => {
    readMeContents.push("## " + mdFileContent.articleName);

    mdFileContent.questions.forEach(q => readMeContents.push(pr.mapHeaderToLink(q, mdFileContent.fileName)));
    readMeContents.push("");

    readMeContents.push("[к оглавлению](#Вопросы-для-собеседования-на-java-developer)");
    readMeContents.push("");
});

fs.writeFileContent(rootFileName, readMeContents.join(EOL)).then(() => console.log("✓".green + " File " + rootFileName + " was generated")).catch(e => console.error(e));
