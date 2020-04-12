const YaSpeller = require("yaspeller");

class Speller {

	constructor(settings) {
		this.settings = settings || {dictionary: []};
	}

	check(text) {
		const _this = this;
		return new Promise((resolve, reject) => {
			let callback = function (err, data) {
				if (err) {
					resolve([err]);
				} else {
					resolve(data.filter(d => !_this.isInDictionary(d.word)));
				}
			};

			YaSpeller.checkText(text, callback, this.settings);
		});

	}

	isInDictionary(text) {
		return this.settings.dictionary.filter(d => text.toLowerCase().match(d.toLowerCase())).length > 0
	}

}

module.exports = Speller;