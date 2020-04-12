const fs = require("fs");
const YaSpeller = require("yaspeller");

class Speller {

	Speller(fileName) {
		this.settings = fileName ? JSON.parse(fs.readFileSync(fileName, "utf8")) : {};
	}

	check(text) {
		return new Promise((resolve, reject) => {
				let callback = function (err, data) {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				};
				YaSpeller.checkText(text, callback, this.settings);
			}
		);
	}

}

module.exports = Speller;