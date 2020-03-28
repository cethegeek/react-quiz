import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Divider, Button, Collapse } from "@material-ui/core";
import Question from "./Question.js";
import { Alert, AlertTitle } from '@material-ui/lab';

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

  /**
   * Handles the submission of the entire quiz
   * @param {HTMLElement} e - the submit button for the quiz, not relevant in this context
   */
  function handleSubmitClick(e) {
    // Marks every question as correct or incorrect
    let correct = 0;
    const newState = answerState.map(state => {
      const answer = props.answerKey.filter(ak => ak.questionId === state.questionId);
      if (state.answerChoiceId === answer[0].choiceId) {
        state.answerCorrect = true;
        correct++;
      }
      return state;
    });
    setAnswerState(newState);
    setScore((correct/newState.length)*100);
    setSubmitted(true);
  }

  // Define the initial state based on the questions/choices
  // State is a map where:
  // key = questionId
  // value = [answerChoiceId, boolean defining if the answerChoiceId matches the correct answer in the answerKey]
  const initialState = [];
  props.questions.forEach(question => {
    initialState.push({ questionId: question.questionId, answerChoiceId: null, answerCorrect: false });
  });

  // This defines the state of the application
  const [isSubmitEnabled, toggleSubmit] = useState(false);
  const [answerState, setAnswerState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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
        answerState={answerState}
        onChoiceSelected={setAnswerState}
        toggleSubmit={toggleSubmit}
        submitted={submitted}
      />
    );
  });

  return (
    <Paper className="quiz" id={props.id} elevation={0}>
      <Typography id="quizHeading" variant="h3" gutterBottom>
        Test your knowledge:
      </Typography>
      <Divider />
      <br />
      <Collapse in={submitted}>
        <Alert display="none" severity="info">
          <AlertTitle>Completed!</AlertTitle>
          You scored {score}% correctly.
        </Alert>
        <br />
      </Collapse>
      {rows}
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        id="submitButton"
        type="button"
        disabled={!isSubmitEnabled}
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
