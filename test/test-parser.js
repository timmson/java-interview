const parser = require("../lib/parser");
const {expect} = require("chai");
require("mocha");


describe("Parser should", () => {
    it("return split file content into lines", () => {
        const arrange = "# Main Header\r\n## Header 1 \r\n## Header 2 \n## Header 3";

        const result = parser.splitIntoLines(arrange);

        expect(result).has.length(4);
    });


    it("return Article Name", () => {
        const arrange = ['# Main Header', '## Header 1 ', '## Header 2 ', '## Header 3'];

        const result = parser.getArticleName(arrange);

        expect(result).is.equal("Main Header");
    });

    it("return Questions", () => {
        const arrange = ['# Main Header', '## Header 1 ', '## Header 2 ', '## Header 3'];

        const result = parser.getQuestions(arrange);

        expect(result).has.length(3);
    });

    it("return link when header given without file", () => {
        const arrange = "Какая основная разница между `String`, `StringBuffer`, `StringBuilder`?";

        const result = parser.mapHeaderToLink(arrange);

        expect(result).is.equal("+ [Какая основная разница между `String`, `StringBuffer`, `StringBuilder`?](#Какая-основная-разница-между-String-StringBuffer-StringBuilder)")
    });

    it("return link when header given with file", () => {
        const arrange = "Какая основная разница между `String`, `StringBuffer`, `StringBuilder`?";

        const result = parser.mapHeaderToLink(arrange, "004-core.md");

        expect(result).is.equal("+ [Какая основная разница между `String`, `StringBuffer`, `StringBuilder`?](004-core.md#Какая-основная-разница-между-String-StringBuffer-StringBuilder)")
    });


});
