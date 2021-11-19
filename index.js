const fs = require("./lib/fs");
const Logger = require("./lib/logger");
const Transformer = require("./lib/transformer");

const logger = new Logger();
logger.info("File spellchecking and generation:");

let transformer = new Transformer();
const mdFilesContents = fs.getListOfMDFiles(__dirname).map((mdFile) => transformer.transform(__dirname + "/" + mdFile));

Promise.all(mdFilesContents.reduce((accumulator, current) => accumulator.concat(current.promises), [])).then(results => {

	let errorResults = results.filter(er => er.errors && er.errors.length > 0);

	if (errorResults.length > 0) {
		errorResults.forEach(v => logger.errorFile(v));
		process.exit(1);
	}

	transformer.transformRootFile(__dirname + "/" + "README.md", mdFilesContents);
	transformer.persistStructure(__dirname + "/lib/" + "questions.js", mdFilesContents);

});


