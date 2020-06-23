const colors = ["#fffac1", "#f7da53", "#d9e795", "#b8d6f7", "#ddf8a8", "#85d1cd", "#4fccec", "#ffb16d", "#eea9c9", "#f48999", "#c29dc9"];

const rootNode = [
	{
		key: 1,
		text: "Вопросы для собеседования на разработчика Java",
		color: "#b8d6f7",
		link: "../"
	}
];

class MindMap {

	constructor(questions) {
		this.questions = questions;
	}

	getMap() {
		const subjects = {};
		this.questions.forEach(q => {
			if (subjects[q.subject] === undefined) {
				subjects[q.subject] = [q];
			} else {
				subjects[q.subject].push(q);
			}
		});

		const rootKey = rootNode[0].key;
		let currentKey = rootKey;
		const nodes = rootNode.concat(Object.keys(subjects).map(s => new Object({
			key: ++currentKey,
			text: s,
			color: colors[Math.floor(Math.random() * (colors.length - 1))],
			link: "../" + subjects[s][0].url.split("#")[0]
		})));


		const links = nodes.filter(n => n.key > rootKey).map(n => new Object({from: rootKey, to: n.key, color: "#939393"}));

		return {nodes, links};
	}

}

module.exports = MindMap;