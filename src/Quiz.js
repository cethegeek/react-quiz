import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Quiz.css";

// TODO: This could use some further componentization to different files.

function QuestionPanel(props) {
  const rows = [];
  props.choices.forEach(choice => {
    const key = `${props.id}_${choice.choiceId}`
    rows.push(
      <AnswerOption 
        key={key}
        questionId={props.id}
        choiceId={choice.choiceId}
        //optionStatus: PropTypes.string,
        //answer: PropTypes.string,
        body={choice.body}
        answers={props.answers}
        setAnswers={props.setAnswers} />
    );
  });

  return (
    <div className="questionPanel" id={"questionPanel" + props.id}>
      <h2 className="questionHeader">
        {props.questionNumber}) {props.body}
      </h2>
      <ol type="a" className="answerPanel" id={"answerPanel" + props.id}>
        {rows}
      </ol>
    </div>
  );
}

QuestionPanel.propTypes = {
  id: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired
};

function AnswerOption(props) {
  const answerValue = `${props.questionId}_${props.choiceId}`
  const choiceId = `choice${props.choiceId}`

  function handleChangeAnswer(e) {
    const [question_id, choice_id] = e.target.value.split('_');
    const newState = new Map(props.answers);
    newState.set(question_id, choice_id);
    props.setAnswers(newState);
  }

  return (
    <li className="answerOption">
      <input
        className="answerOption"
        type="radio"
        name={"rg_" + props.questionId}
        //checked=""
        id={choiceId}
        value={answerValue}
        //disabled={props.optionStatus}
        onChange={handleChangeAnswer}
      />
      <label className="answerOptionLabel" htmlFor={choiceId}>
        {props.body}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  questionId: PropTypes.number.isRequired,
  choiceId: PropTypes.number.isRequired,
  optionStatus: PropTypes.string,
  answer: PropTypes.string,
  body: PropTypes.string.isRequired
};

export default function Quiz(props) {
  const heading = `We have ${props.numberOfQuestions} question${props.numberOfQuestions > 1 ? "s" : ""} for you:`;
  const rows = [];
  let questionCounter = 1;

  const answerKey = new Map();
  let score = 0;
  props.answerKey.forEach(ak => {
    answerKey.set(String(ak.questionId), String(ak.choiceId));
  });
  function handleSubmitClick(e) {
    //TODO: Compare current state with the answer key and celebrate if all match
    for (var key of answers.keys()) {
      score += answerKey.get(key) === answers.get(key) ? 1 : 0;
    }
    alert(`You have a ${(score/questionCounter)*100}% accuracy rate!`);
  }

  const [answers, setAnswers] = useState(new Map());
  props.questions.forEach(question => {
    rows.push(
      <QuestionPanel
        key={question.questionId}
        id={question.questionId}
        questionNumber={questionCounter++}
        body={question.body}
        choices={question.choices}
        answers={answers}
        setAnswers={setAnswers}
      />
    );
  });
  questionCounter--;

  return (
    <div className="quiz" id={props.id}>
      <h1 id="quizHeading">{heading}</h1>
      {rows}
      <button 
        id="submitButton" 
        type="button"
        disabled={!(answers.size === questionCounter)}
        onClick={handleSubmitClick}>
          Submit
      </button>
    </div>
  );
}

Quiz.propTypes = {
  id: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  answerKey: PropTypes.array.isRequired
};
