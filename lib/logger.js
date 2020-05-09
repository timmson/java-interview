require("colors");

class Logger {

	constructor(log) {
		this.log = log || console.log
	}

	info(text) {
		this.log(text.green);
	}

	infoFile(fileName, startTime) {
		this.log("✓".green + " " + fileName + " " + ((new Date().getTime() - startTime) + " ms").magenta);
	}

	error(text) {
		this.log(text.red);
	}

	errorFile(errorResult) {
		this.log("✗".red + " " + errorResult.fileName);
		this.log("-----".red);
		this.log(JSON.stringify(errorResult.errors, null, 2).red);
		this.log("-----".red);
	}

}

module.exports = Logger;