const trueFs = require("fs");
const Transformer = require("../lib/transformer");
const {expect} = require("chai");
require("mocha");

class MockFS {

	readFile(name) {
		return name.indexOf(".yaspellerrc") >= 0 ? trueFs.readFileSync(name) : "";
	}

	writeFileContent() {
		return Promise.resolve();
	}

}

class MockPR {

	splitIntoLines() {
		return [];
	}

	getArticleName() {
		return "";
	}

	getQuestions() {
		return [];
	}

	replaceTableOfContent() {
		return [];
	}

	mapHeaderToLink() {
		return "";
	}

}

describe("Transformer should", () => {

	const fs = new MockFS();
	const pr = new MockPR();
	const transformer = new Transformer(fs, pr);

	it("transform root file", () => {
		transformer.transformRootFile("some file", [{questions: []}]);
		expect(true).is.equal(true);
	})

	it("transform file", () => {
		transformer.transform("some file", []);
		expect(true).is.equal(true);
	})

	it("persist structure", () => {
		transformer.persistStructure("some file", []);
		expect(true).is.equal(true);
	})

});

