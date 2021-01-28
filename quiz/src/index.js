import "bootstrap";
import "./index.scss";
import Question from "../../lib/question";
import Vue from "vue";
import URL from "url";
import QueryString from "querystring";

const question = new Question();

const url = URL.parse(window.location.href);
const params = QueryString.parse(url.query);

const root = "../";

new Vue({
	el: "#app",
	data: {
		currentYear: new Date().getFullYear().toString(),
		isAnswerOpen: false,
		defaultQuestion: params["question"],
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

			window.history.replaceState(
				{},
				"Вопросы для собеседования",
				"?" + QueryString.stringify({question: q.url})
			);

			q.url = root + q.url;
			this.question = q;
			this.defaultQuestion = null;
		}
	},
	mounted() {
		this.loadQuestion(null);
	}
});
