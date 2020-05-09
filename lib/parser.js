const header1 = "# ";
const header2 = "## ";
const list = "+ ";

class Parser {

	static splitIntoLines(data) {
		return data.split(/\r?\n/).map(s => s.trimRight());
	}

	static getHeaders(data, headerSign) {
		return data.filter(s => s.indexOf(headerSign) === 0);
	}

	static getArticleName(data) {
		return Parser.getHeaders(data, header1)[0].slice(header1.length).trim();
	}

	static getQuestions(data) {
		return Parser.getHeaders(data, header2).map(h => h.slice(header2.length).trim())
			.map(q => new Object({
				title: q,
				anchor: this.mapHeaderToLink(q),
				body: "!!!!",
			}));
	}

	static replaceTableOfContent(data, toc) {
		let dt = data;
		while (dt[3] !== undefined && dt[3].indexOf(list) >= 0) {
			dt.splice(3, 1);
		}
		toc.reverse().forEach(c => dt.splice(3, 0, c));
		return dt;
	}

	static mapHeaderToLink(header, fileName) {
		return "+ [" + header + "](" + (fileName !== undefined ? fileName : "") + "#" + header.replace(/[&\/\\#,+()$~%.'`":*?<>{}«»_]/g, "").split(" ").join("-").toLocaleLowerCase() + ")";
	}

}

module.exports = Parser;