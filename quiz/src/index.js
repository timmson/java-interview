import "bootstrap";
import "./index.scss";

import Question from "../../lib/question";

import Vue from "vue";

const question = new Question();

new Vue({
	el: "#app",
	data: {
		currentYear: new Date().getFullYear().toString(),
		isAnswerOpen: false,
		question: {
			subject: "",
			url: "",
			title: "",
			answer: ""
		},
	},
	methods: {
		goToContents: function (event) {
			window.location.href = "../";
		},
		openAnswer: function (event) {
			this.isAnswerOpen = !this.isAnswerOpen;
		},
		loadQuestion: function (event) {
			this.isAnswerOpen = false;
			this.question = question.getQuestion();
		}
	},
	mounted() {
		this.loadQuestion(null);
	}
});
