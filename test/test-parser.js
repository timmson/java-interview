const parser = require("../lib/parser");
const {expect} = require("chai");
require("mocha");


describe("Parser should", () => {
	it("return split file content into lines", () => {
		const arrange = "# Main Header\r\n## Header 1 \r\n## Header 2 \n## Header 3";

		const result = parser.splitIntoLines(arrange);

		expect(result).to.have.lengthOf(4);
	});


	it("return Article Name", () => {
		const arrange = ["# Main Header", "## Header 1 ", "## Header 2 ", "## Header 3"];

		const result = parser.getArticleName(arrange);

		expect(result).is.equal("Main Header");
	});

	it("return Questions", () => {
		const arrange = ["# Main Header", "## Header 1 ", "## Header 2 ", "## Header 3"];

		const result = parser.getQuestions(arrange);

		expect(result).to.have.lengthOf(3);
	});

	it("remove table of content", () => {
		const arrange = ["", "", "# Main Header", "+ fffff ", "+ cccccc", ""];
		const toc = ["+ (AAAA)[] ", "+ (BBBB)[]"];

		const result = parser.replaceTableOfContent(arrange, toc);

		expect(result).to.eql(["", "", "# Main Header", "+ (AAAA)[] ", "+ (BBBB)[]", ""]);
	});

	it("return link when header given without file", () => {
		const arrange = "Что будет результатом выполнения операции `int[] array = {8, --3, 10, 4}; int result = Arrays.binarySearch(array, 8);`?";

		const result = parser.mapHeaderToLink(arrange);

		expect(result).is.equal("+ [" + arrange + "](#что-будет-результатом-выполнения-операции-int-array-8-3-10-4-int-result-arraysbinarysearcharray-8)")
	});

	it("return link when header given without file 2", () => {
		const arrange = "Чем отличается `<c:import>` от `<jsp:include>` и директивы `<%@include %>`?";

		const result = parser.mapHeaderToLink(arrange);

		expect(result).is.equal("+ [" + arrange + "](#чем-отличается-cimport-от-jspinclude-и-директивы-include-)")
	});

	it("return link when header given with file", () => {
		const arrange = "Какая основная разница между `String`, `StringBuffer`, `StringBuilder`?";

		const result = parser.mapHeaderToLink(arrange, "004-core.md");

		expect(result).is.equal("+ [" + arrange + "](004-core.md#какая-основная-разница-между-string-stringbuffer-stringbuilder)")
	});


});
