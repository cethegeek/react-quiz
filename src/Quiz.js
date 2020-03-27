import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Divider, Button } from "@material-ui/core";
import Question from "./Question.js";

const useStyles = makeStyles(theme => ({
  submitButton: {
    margin: "5px"
  },
}));

/**
 * This renders a Quiz using Material-UI components
 * @param {PropTypes} props 
 */
export default function Quiz(props) {
  const classes = useStyles();

  const answerKey = new Map();
  let score = 0;
  props.answerKey.forEach(ak => {
    answerKey.set(String(ak.questionId), String(ak.choiceId));
  });

  /**
   * Handles the submission of the entire quiz
   * @param {HTMLElement} e - the submit button for the quiz, not relevant in this context
   */
  function handleSubmitClick(e) {
    const newState = new Map(answers);

    // Marks every question as correct or incorrect

    // Computes the new state
    // for (var key of answers.keys()) {
    //   var answerState = answers.get(key);
    //   if (answerState !== undefined) {
    //     if (answerKey.get(key) === answerState[0]) {
    //       score += 1;
    //     }
    //     newState.set(key, [answerState[0], (answerKey.get(key) === answerState[0])]);

    //     setAnswers(newState);
    //   }
    // }

    // Display the results

    console.log(newState);
    alert(`You have a ${(score / questionCounter) * 100}% accuracy rate!`);
  }

  // Define the initial state based on the questions/choices
  // State is a map where:
  // key = questionId
  // value = [answerChoiceId, boolean defining if the answerChoiceId matches the correct answer in the answerKey]
  const initialState = new Map();
  props.questions.forEach(question => {
    initialState.set(question.questionId, [null, false]);
  });

  // This defines the state of the application
  const [answers, setAnswers] = useState(new Map(initialState));

  const rows = [];
  let questionCounter = 1;
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
        answerKey={answerKey}
      />
    );
  });
  questionCounter--;

  console.log(answers.size);
  console.log(questionCounter);
  console.log(answers);

  return (
    <Paper className="quiz" id={props.id} elevation={0}>
      <Typography id="quizHeading" variant="h3" gutterBottom>
        Test your knowledge:
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
  questions: PropTypes.array.isRequired, 
  answerKey: PropTypes.array.isRequired
};
