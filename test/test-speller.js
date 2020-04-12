const Speller = require("../lib/speller");
const {expect} = require("chai");
require("mocha");

//const settings = JSON.parse(require("fs").readFileSync(__dirname + "/../.yaspellerrc", "utf8"));
const settings = {"lang": "ru", "checkYo": true, "dictionary": ["сплитератор.*"]}
const speller = new Speller(settings);

describe("Speller should", () => {
	it("return split file content into lines", async () => {
		const arrange = "Потомучта Сплитератором ее";

		const result = await speller.check(arrange);

		expect(result).has.length(2);
		expect(result[0].word).is.equal("Потомучта");
		expect(result[1].word).is.equal("ее");
	});

});