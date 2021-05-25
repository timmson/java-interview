import "bootstrap";
import "./index.scss";
import Question from "../../lib/question";
import Vue from "vue";

const question = new Question();

const params = new URL(window.location.href).searchParams;

const root = "../";

new Vue({
	el: "#app",
	data: {
		currentYear: new Date().getFullYear().toString(),
		isAnswerOpen: false,
		defaultQuestion: params.get("question"),
		question: {
			subject: "",
			url: "",
			title: "",
			answer: ""
		},
	},
	methods: {
		goToContents: function () {
			window.location.href = root;
		},
		openAnswer: function () {
			this.isAnswerOpen = !this.isAnswerOpen;
		},
		loadQuestion: function () {
			this.isAnswerOpen = false;
			let q = question.getQuestion(this.defaultQuestion) || {
				url: "",
				subject: "Такой темы еще нет:(",
				title: "Такого вопроса еще нет:(",
				answer: "Но ты можешь его добавить в <a href=\"https://github.com/timmson/java-interview\">github.com/timmson/java-interview</a>"
			};

			params.set("question", q.url);
			window.history.replaceState({}, "Вопросы для собеседования", "?" + params.toString());

			q.url = root + q.url;
			this.question = q;
			this.defaultQuestion = null;
		}
	},
	mounted() {
		this.loadQuestion(null);
	}
});
