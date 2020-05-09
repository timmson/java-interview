const Logger = require("../lib/logger");
const {expect} = require("chai");
require("mocha");

function mockLog() {

}

describe("Logger should", () => {

	const logger = new Logger(mockLog);

	it("print info", async () => {
		logger.info("");
		expect(true).is.equal(true);
	});

	it("print info file", async () => {
		logger.infoFile("", "");
		expect(true).is.equal(true);
	});

	it("print error", async () => {
		logger.error("");
		expect(true).is.equal(true);
	});

	it("print error file", async () => {
		logger.errorFile({errors: []});
		expect(true).is.equal(true);
	});

});

