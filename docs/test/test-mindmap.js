const {expect} = require("chai");
require("mocha");

const questions = require("../../lib/questions");
const MindMap = require("../src/mindmap");

describe("Map should", () => {

	const mindMap = new MindMap(questions);

	it("transform question to nodes", () => {

		const map = mindMap.getMap();

		expect(map.nodes).has.length(29);

		expect(map.links).has.length(28);
	});

});