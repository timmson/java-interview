const Speller = require("../lib/speller");

describe("Speller should", () => {
	test("2 errors on given string", async () => {
		const arrange = "Потомучта Сплитератором ее";

		class YaSpellerMock {

			static checkText(text, callback) {
				callback(null, [{word: "Потомучта"}, {word: "ее"}]);
			}

		}

		const result = await new Speller({
			"lang": "ru",
			"checkYo": true,
			"dictionary": ["сплитератор.*"]
		}, YaSpellerMock).check(arrange);

		expect(result).toHaveLength(2);
		expect(result[0].word).toEqual("Потомучта");
		expect(result[1].word).toEqual("ее");
	});

	test("throw error when API returned an error", async () => {
		const arrange = "";

		class YaSpellerMock {

			static checkText(text, callback) {
				callback("Something went wrong", null);
			}

		}

		const result = await new Speller({}, YaSpellerMock).check(arrange);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual("Something went wrong");
	});

});

