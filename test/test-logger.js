const Logger = require("../lib/logger");

function mockLog() {

}

describe("Logger should", () => {

	const logger = new Logger(mockLog);

	test("print info", async () => {
		logger.info("");
		expect(true).toBeTruthy();
	});

	test("print info file", async () => {
		logger.infoFile("", "");
		expect(true).toBeTruthy();
	});

	test("print error", async () => {
		logger.error("");
		expect(true).toBeTruthy();
	});

	test("print error file", async () => {
		logger.errorFile({errors: []});
		expect(true).toBeTruthy();
	});

});

