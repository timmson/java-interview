const parser = require("../lib/parser");


describe("Parser should", () => {
	test("return split file content into lines", () => {
		const arrange = "# Main Header\r\n## Header 1 \r\n## Header 2 \n## Header 3";

		const result = parser.splitIntoLines(arrange);

		expect(result).toHaveLength(4);
	});


	test("return Article Name", () => {
		const arrange = ["# Main Header", "## Header 1 ", "## Header 2 ", "## Header 3"];

		const result = parser.getArticleName(arrange);

		expect(result).toEqual("Main Header");
	});

	test("return Questions", () => {
		const arrange = ["# Main Header", "## Header 1 ", "## Header 2 ", "## Header 3"];

		const result = parser.getQuestions(arrange);

		expect(result).toHaveLength(3);
	});

	test("remove table of content", () => {
		const arrange = ["", "", "# Main Header", "+ fffff ", "+ cccccc", ""];
		const toc = ["+ (AAAA)[] ", "+ (BBBB)[]"];

		const result = parser.replaceTableOfContent(arrange, toc);

		expect(result).toEqual(["", "", "# Main Header", "+ (AAAA)[] ", "+ (BBBB)[]", ""]);
	});

	test("return link when header given without file", () => {
		const arrange = "Что будет результатом выполнения операции `int[] array = {8, --3, 10, 4}; int result = Arrays.binarySearch(array, 8);`?";

		const result = parser.mapHeaderToLink(arrange);

		expect(result).toEqual("+ [" + arrange + "](#что-будет-результатом-выполнения-операции-int-array-8-3-10-4-int-result-arraysbinarysearcharray-8)");
	});

	test("return link when header given without file 2", () => {
		const arrange = "Чем отличается `<c:import>` от `<jsp:include>` и директивы `<%@include %>`?";

		const result = parser.mapHeaderToLink(arrange);

		expect(result).toEqual("+ [" + arrange + "](#чем-отличается-cimport-от-jspinclude-и-директивы-include-)");
	});

	test("return link when header given with file", () => {
		const arrange = "Какая основная разница между `String`, `StringBuffer`, `StringBuilder`?";

		const result = parser.mapHeaderToLink(arrange, "004-core.md");

		expect(result).toEqual("+ [" + arrange + "](004-core.md#какая-основная-разница-между-string-stringbuffer-stringbuilder)");
	});


});
