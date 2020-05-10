class Question {

	constructor(questions) {
		this.questions = questions || require("./questions");
	}

	getQuestion(url) {
		if (url) {
			return this.questions.filter((q) => q.url === url)[0];
		} else {
			return this.questions[Math.floor(Math.random() * this.questions.length)];
		}
	}
}

module.exports = Question;