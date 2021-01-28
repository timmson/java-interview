class Speller {

	constructor(settings, yaSpeller) {
		this.yaSpeller = yaSpeller || require("yaspeller");
		this.settings = settings || {dictionary: []};
	}

	check(text, fileName) {
		const _this = this;
		return new Promise((resolve) => {
			let callback = function (err, data) {
				if (err) {
					resolve([err]);
				} else {
					resolve(data.filter(d => !_this.isInDictionary(d.word)).map(d => {
						d.fileName = fileName;
						return d;
					}));
				}
			};

			_this.yaSpeller.checkText(text, callback, this.settings);
		});

	}

	isInDictionary(text) {
		return this.settings.dictionary.filter(d => text.toLowerCase().match(d.toLowerCase())).length > 0;
	}

}

module.exports = Speller;