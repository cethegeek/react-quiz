import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Divider, Button } from "@material-ui/core";
import Question from "./Question.js";

const useStyles = makeStyles(theme => ({
  submitButton: {
    margin: "5px"
  },
}));

export default function Quiz(props) {
  const classes = useStyles();

  const heading = `Test your knowledge:`;
  const rows = [];
  let questionCounter = 1;

  const answerKey = new Map();
  let score = 0;
  props.answerKey.forEach(ak => {
    answerKey.set(String(ak.questionId), String(ak.choiceId));
  });

  function handleSubmitClick(e) {
    const newState = new Map(answers);
    for (var key of answers.keys()) {
      var answerState = answers.get(key);
      if (answerKey.get(key) === answerState[0]) {
        score += 1;
        newState.set(key, [answerState[0], true]);
      } else {
        newState.set(key, [answerState[0], false]);
      }
      setAnswers(newState);
    }
    alert(`You have a ${(score / questionCounter) * 100}% accuracy rate!`);
  }

  const [answers, setAnswers] = useState(new Map());
  props.questions.forEach(question => {
    rows.push(
      <Question
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
    <Paper className="quiz" id={props.id} elevation={0}>
      <Typography id="quizHeading" variant="h3" gutterBottom>
        {heading}
      </Typography>
      <Divider />
      <br />
      {rows}
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        id="submitButton"
        type="button"
        disabled={!(answers.size === questionCounter)}
        onClick={handleSubmitClick}>
        Submit
      </Button>
    </Paper>
  );
}

Quiz.propTypes = {
  id: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  answerKey: PropTypes.array.isRequired
};
