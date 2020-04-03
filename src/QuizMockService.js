/**
 * A mocked Quiz service for CRUDing Quizzes.
 * This could be replaced by an AWS API Gateway endpoint to run Lamdba functions and properly persist quizzes, os some other REST api implementation.
 */
export default class QuizMockService {
    constructor() {
      this.nextId = 1;
      this.quizzes = [];
    }

    /**
     * Checks the payload containing a quiz to validate it is well-formed
     * TODO: Replace this slow crap with some library that validates by json schema, like https://github.com/epoberezkin/ajv or https://github.com/korzio/djv
     * @param {string} quiz json payload containing a quiz 
     */
    static _validateQuizPayload(quiz) {
      const possibleQuiz = JSON.parse(quiz);
      let validQuiz = false, validQuestions = false, validChoices = false;

      validQuiz = possibleQuiz.hasOwnProperty("quizModule") &&
                  possibleQuiz.hasOwnProperty("questions") &&
                  possibleQuiz.hasOwnProperty("answerKey");

      if (validQuiz && Array.isArray(possibleQuiz.questions)) {
        validQuestions = possibleQuiz.questions.every(question => question.hasOwnProperty("body") &&
                                                                  question.hasOwnProperty("choices"));
      }

      if (validQuestions) {
        let innerValidChoices = [];
        possibleQuiz.questions.forEach(question => {
          if (Array.isArray(question.choices)) {
            innerValidChoices.push(question.choices.every(choice => choice.hasOwnProperty("body")));
          }
        });
        validChoices = innerValidChoices.every(valid => valid);
      }
      //const validAnswerKey = possibleQuiz.answerKey.every(akey => akey.hasOwnProperty("questionId") && akey.hasOwnProperty("choiceId"));

      return validQuiz && validQuestions && validChoices; //&& validAnswerKey;
    }

    /**
     * Return quiz list in the data store, basic info only
     */
    async getQuizList(callback) {
      return JSON.stringify(this.quizzes);
    }

    /**
     * Return a specific quiz by ID
     * @param {number} id the id for the desired quiz 
     */
    async getQuizById(id) {
      const quiz = this.quizzes.filter(element => element.quizId === id)[0];
      return JSON.stringify(quiz);
    }

    /**
     * Add a quiz to the data store
     * @param {string} quiz the json payload containing the basic info for a quiz
     */
    async addQuiz(quiz) {
      if (! QuizMockService._validateQuizPayload(quiz)) {
        return JSON.stringify({ errorCode: 422, errorMessage: "Unprocessable Entity" })
      }
      const newQuiz = JSON.parse(quiz);
      newQuiz.quizId = this.nextId++;
      this.quizzes.push(newQuiz);
      return JSON.stringify(newQuiz);
    }

    /**
     * Add multiple quizzes to the data store
     * @param {string} quizList the json payload containing the list of info for quizzes
     */
    async addManyQuizzes(quizList) {
      const newQuizzes = JSON.parse(quizList);
      newQuizzes.forEach((element, index) => {
        element.quizId = this.nextId++;
        this.quizzes.push(element);
      });
      return newQuizzes;
    }
  }