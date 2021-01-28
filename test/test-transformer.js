const trueFs = require("fs");
const Logger = require("../lib/logger");
const Transformer = require("../lib/transformer");

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

	mapHeaderAndAnchorToLink() {
		return "";
	}

}

function mockLog() {

}

describe("Transformer should", () => {

	const fs = new MockFS();
	const pr = new MockPR();
	const transformer = new Transformer(fs, pr, new Logger(mockLog));

	test("transform root file", () => {
		transformer.transformRootFile("some file", [{fileName: "myfile", questions: [{}]}]);
		expect(true).toBeTruthy();
	});

	test("transform file", () => {
		transformer.transform("some file", []);
		expect(true).toBeTruthy();
	});

	test("persist structure", () => {
		transformer.persistStructure("some file", [{fileName: "myfile", questions: [{}]}]);
		expect(true).toBeTruthy();
	});

});

