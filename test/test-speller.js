const Speller = require("../lib/speller");
const {expect} = require("chai");
require("mocha");

describe("Speller should", () => {
	it("2 errors on given string", async () => {
		const arrange = "Потомучта Сплитератором ее";

		class YaSpellerMock {

			static checkText(text, callback, settings) {
				callback(null, [{word: "Потомучта"}, {word: "ее"}]);
			}

		}

		const result = await new Speller({
			"lang": "ru",
			"checkYo": true,
			"dictionary": ["сплитератор.*"]
		}, YaSpellerMock).check(arrange);

		expect(result).has.length(2);
		expect(result[0].word).is.equal("Потомучта");
		expect(result[1].word).is.equal("ее");
	});

	it("throw error when API returned an error", async () => {
		const arrange = "";

		class YaSpellerMock {

			static checkText(text, callback, settings) {
				callback("Something went wrong", null);
			}

		}

		const result = await new Speller({}, YaSpellerMock).check(arrange);

		expect(result).has.length(1);
		expect(result[0]).is.equal("Something went wrong");
	});

});

