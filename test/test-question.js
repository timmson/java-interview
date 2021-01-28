const Question = require("../lib/question");

describe("Question should", () => {

	const questions = [
		{
			subject: "ООП",
			url: "001-oop.html##что-такое-инкапсуляция",
			question: "Что такое <i>«инкапсуляция»</i>?",
			answer: "<b>Инкапсуляция<b> – это свойство системы, позволяющее объединить данные и методы, " +
				"работающие с ними, в классе и скрыть детали реализации от пользователя, открыв только то, что " +
				"необходимо при последующем использовании."
		},
		{
			subject: "ООП",
			url: "001-oop.html##что-такое-наследование",
			question: "Что такое <i>«наследование»</i>?",
			answer: "<b>Наследование<b> – это свойство системы, позволяющее описать новый класс на основе уже " +
				"существующего с частично или полностью заимствующейся функциональностью."
		}
	];

	const question = new Question(questions);

	test("return random question", () => {
		const result = question.getQuestion();

		expect(result).not.toBeUndefined();
	});

	test("return question by url", () => {
		const result = question.getQuestion("001-oop.html##что-такое-наследование");

		expect(result).toEqual(questions[1]);
	});

	test("return undefined by missing url", () => {
		const result = question.getQuestion("some missing url");

		expect(result).toBeUndefined();
	});

});