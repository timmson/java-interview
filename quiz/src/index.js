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
		goToContents: function (event) {
			window.location.href = root;
		},
		openAnswer: function (event) {
			this.isAnswerOpen = !this.isAnswerOpen;
		},
		loadQuestion: function (event) {
			this.isAnswerOpen = false;
			this.question = question.getQuestion(this.defaultQuestion);
			window.history.replaceState({}, "Вопросы для собеседования", "?" + QueryString.stringify({question: this.question.url}));
			this.question.url = root + this.question.url;
			this.defaultQuestion = null;
		}
	},
	mounted() {
		this.loadQuestion(null);
	}
});
