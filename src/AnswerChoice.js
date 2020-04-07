import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Radio } from "@material-ui/core";

/**
 * This renders an AnswerChoice in a Question in a Quiz using Material-UI components
 * @param {PropTypes} props 
 */
export default function AnswerChoice(props) {
  const answerValue = `${props.questionId}_${props.id}`;
  const choiceId = `choice${props.choiceId}`;

  /**
   * Handler for the selection of an answer that updates the state of the quiz
   * @param {HTMLElement} e - the radio button selected, used to determine the answer id
   */
  function handleChangeAnswer(e) {
    const [questionId, choiceId] = e.target.value.split("_");
    const newState = props.answerState.map(state => {
      if (state.questionId === parseInt(questionId)) {
        state.answerChoiceId = parseInt(choiceId);
      }
      return state;
    });

    const unAnswered = newState.filter(state => state.answerChoiceId === null);
    
    props.onChoiceSelected(newState);
    props.toggleSubmit(unAnswered.length === 0);
  }

  return (
    <FormControlLabel
      value={answerValue}
      control={
        <Radio
          name={"rg_" + props.questionId}
          id={choiceId}
          color="primary"
          onChange={handleChangeAnswer}
        />
      }
      label={props.body}
    />
  );
}

AnswerChoice.propTypes = {
  questionId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  answerState: PropTypes.array.isRequired, // TODO: Make this a bit more specific about being an array of objects and what keys are required
  onChoiceSelected: PropTypes.func.isRequired,
  toggleSubmit: PropTypes.func.isRequired,
};
