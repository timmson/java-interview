class Question {

	constructor(questions) {
		this.questions = questions || require("../questions");
	}

	getQuestion() {
		return this.questions[Math.floor(Math.random() * this.questions.length)];
	}
}

module.exports = Question;