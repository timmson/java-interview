const questions = require("../lib/questions");
const MindMap = require("../lib/mindmap");

describe("Map should", () => {

	const mindMap = new MindMap(questions);

	test("transform question to nodes", () => {

		const map = mindMap.getMap();

		expect(map.nodes).toHaveLength(29);

		expect(map.links).toHaveLength(28);
	});

});