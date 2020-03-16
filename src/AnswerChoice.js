import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Radio } from "@material-ui/core";

export default function AnswerChoice(props) {
  const answerValue = `${props.questionId}_${props.choiceId}`;
  const choiceId = `choice${props.choiceId}`;

  function handleChangeAnswer(e) {
    const [question_id, choice_id] = e.target.value.split("_");
    const newState = new Map(props.answers);
    newState.set(question_id, [choice_id, null]);
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
  answer: PropTypes.string,
  index: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired
};
