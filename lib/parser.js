const header1 = "# ";
const header2 = "## ";

class Parser {

    static splitIntoLines(data) {
        return data.split(/\r?\n/);
    }

    static getHeaders(data, headerSign) {
        return data.filter(s => s.indexOf(headerSign) === 0);
    }

    static getArticleName(data) {
        return Parser.getHeaders(data, header1)[0].slice(header1.length).trim();
    }

    static getQuestions(data) {
        return Parser.getHeaders(data, header2).map(h => h.slice(header2.length).trim());
    }

    static mapHeaderToLink(header, fileName) {
        return "+ [" + header + "](" + (fileName !== undefined ? fileName : "") + "#" + header.replace(/[&\/\\#,+()$~%.'`":*?<>{}«»_]/g,"").split(" ").join("-") + ")";
    }

}

module.exports = Parser;