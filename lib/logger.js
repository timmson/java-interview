require("colors");

class Logger {

	static info(text) {
		console.log(text.green);
	}

	static infoFile(fileName, startTime) {
		console.log("✓".green + " " + fileName + " " + ((new Date().getTime() - startTime) + " ms").magenta);
	}

	static error(text) {
		console.log(text.red);
	}

	static errorFile(errorResult) {
		console.log("✗".red + " " + errorResult.fileName);
		console.log("-----".red);
		console.log(JSON.stringify(errorResult.errors, null, 2).red);
		console.log("-----".red);
	}

}

module.exports = Logger;