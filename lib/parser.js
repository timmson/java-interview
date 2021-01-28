const header1 = "# ";
const header2 = "## ";
const list = "+ ";

const EOL = "\r\n";

class Parser {

	static splitIntoLines(data) {
		return data.split(/\r?\n/).map(s => s.trimRight());
	}

	static getHeaders(lines, headerSign) {
		return lines.filter(s => s.indexOf(headerSign) === 0);
	}

	static getArticleName(lines) {
		return Parser.getHeaders(lines, header1)[0].slice(header1.length).trim();
	}

	static getQuestions(lines) {
		let body = [];
		let questions = [];

		for (let i = 0; i < lines.length; i++) {

			if (lines[i].indexOf(header2) === 0) {
				if (questions.length > 0) {
					questions[questions.length - 1].body = body.slice(0, -3).join(EOL);
				}
				let header = lines[i].slice(header2.length).trim();
				questions.push({
					title: header,
					anchor: Parser.mapHeaderToAnchor(header),
					body: "",
				});
				body = [];
			} else {
				body.push(lines[i]);
			}

		}

		if (questions.length > 0) {
			questions[questions.length - 1].body = body.slice(0, -3).join(EOL);
		}

		return questions;
	}

	static replaceTableOfContent(lines, toc) {
		let dt = lines;
		while (dt[3] !== undefined && dt[3].indexOf(list) >= 0) {
			dt.splice(3, 1);
		}
		toc.reverse().forEach(c => dt.splice(3, 0, c));
		return dt;
	}

	static mapHeaderToLink(header, fileName) {
		return Parser.mapHeaderAndAnchorToLink(header, Parser.mapHeaderToAnchor(header), fileName);
	}

	static mapHeaderToAnchor(header) {
		return "#" + header.replace(/[&/\\#@,+=()$~%.'`":;*?<>{}[\]«»_]/g, "").split(" ").join("-").replace(/[-]{2,}/g, "-").toLocaleLowerCase();
	}

	static mapHeaderAndAnchorToLink(header, anchor, fileName) {
		return "+ [" + header + "](" + (fileName !== undefined ? fileName : "") + anchor + ")";
	}

}

module.exports = Parser;