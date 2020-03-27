import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Radio } from "@material-ui/core";

/**
 * This renders an AnswerChoice in a Question in a Quiz using Material-UI components
 * @param {PropTypes} props 
 */
export default function AnswerChoice(props) {
  const answerValue = `${props.questionId}_${props.choiceId}`;
  const choiceId = `choice${props.choiceId}`;

  /**
   * Handler for the selection of an answer that updates the state
   * @param {HTMLElement} e - the radio button selected, used to determine the answer id
   */
  function handleChangeAnswer(e) {
    const [question_id, choice_id] = e.target.value.split("_");
    const newState = new Map(props.answers);
    newState.set(question_id, [choice_id, (props.answerKey.get(question_id) === choice_id)]);
    // TODO: Look at the answer key and define the correctness state
    props.setAnswers(newState);
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
  choiceId: PropTypes.number.isRequired,
  optionStatus: PropTypes.string,
  body: PropTypes.string.isRequired,
  answers: PropTypes.instanceOf(Map).isRequired,
  setAnswers: PropTypes.func.isRequired,
};
