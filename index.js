const path = require("path");
const fs = require("fs");

const EOL = "\r\n";
const extension = ".md";
const header1 = "# ";
const header2 = "## ";


function getFilteredFiles(files) {
    return files.filter(f => f.indexOf(extension) >= 0 && f.indexOf("README") < 0)
}

function getFileContent(fileName) {
    return fs.readFileSync(fileName, "utf8");
}

function getHeaders(data, headerSign) {
    return data.split(/\r?\n/).filter(s => s.indexOf(headerSign) === 0);
}

function getArticleName(data) {
    return getHeaders(data, header1)[0].slice(header1.length);
}

function getQuestions(data) {
    return getHeaders(data, header2).map(h => h.slice(header2.length));
}

function mapHeaderToLink(header, fileName) {
    return "+ [" + header + "](" + (fileName !== undefined ? fileName : "") + "#" + header.replace(/[&\/\\#,+()$~%.'`":*?<>{}«»_]/g,"").split(" ").join("-") + ")";
}

const files = fs.readdirSync(path.join(__dirname, "./"));

const mdFilesContents = getFilteredFiles(files)
    .map(mdFile => {
            let fileContent = getFileContent(mdFile);
            return {
                fileName: mdFile,
                articleName: getArticleName(fileContent),
                questions: getQuestions(fileContent)
            }
        }
    );


let readMeContents = [];
readMeContents.push("# Вопросы для собеседования на Java Developer");

readMeContents.push("");

mdFilesContents.forEach(mdFileContent => {
    readMeContents.push(mapHeaderToLink(mdFileContent.articleName));

});

readMeContents.push("");

mdFilesContents.forEach(mdFileContent => {
    readMeContents.push("## " + mdFileContent.articleName);
    mdFileContent.questions.forEach(q => {
        readMeContents.push(mapHeaderToLink(q, mdFileContent.fileName));
    });
    readMeContents.push("");
    readMeContents.push("[к оглавлению](#Вопросы-для-собеседования-на-java-developer)");
    readMeContents.push("");
});

fs.writeFileSync("README.md", readMeContents.join(EOL));