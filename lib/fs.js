const fs = require("fs");
const path = require("path");
const extension = ".md";

class FS {

    static getListOfMDFiles(directory) {
        return fs.readdirSync(directory)
            .filter(f => f.indexOf(extension) >= 0 && f.indexOf("README") < 0);
    }

    static readFileContent(fileName) {
        return fs.readFileSync(fileName, "utf8");
    }

    static writeFileContent(fileName, data) {
        fs.writeFileSync(fileName, data);
    }

}

module.exports = FS;