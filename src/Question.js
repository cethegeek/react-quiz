import React from "react";
import PropTypes from "prop-types";
import AnswerChoice from "./AnswerChoice.js";
import {
  makeStyles,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Avatar,
  RadioGroup,
  Divider,
  Collapse
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  bcaGreen: {
    backgroundColor: "#3d5f65"
  },
  questionText: {
    fontWeight: "bold",
    fontSize: "large"
  },
  questionPanel: {
    marginBottom: "10px",
    marginLeft: "5px",
    marginRight: "5px"
  },
  wide: {
    width: '100%',
  }
}));

/**
 * This renders a Question in a Quiz using Material-UI components
 * @param {PropTypes} props 
 */
export default function Question(props) {
  const classes = useStyles();

  const choiceRows = [];
  props.choices.forEach((choice, idx, array) => {
    const key = `${props.id}_${choice.choiceId}`;
    choiceRows.push(
      <AnswerChoice
        key={key}
        questionId={props.id}
        id={choice.choiceId}
        body={choice.body}
        answerState={props.answerState}
        onChoiceSelected={props.onChoiceSelected}
        toggleSubmit={props.toggleSubmit}
      />
    );
    if (idx !== array.length - 1) {
      choiceRows.push(<Divider key={"div"+key} light />);
    }
  });

  return (
    <Card
      className={classes.questionPanel}
      id={"questionPanel" + props.id}
      elevation={4}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.bcaGreen}>
            {props.questionNumber}
          </Avatar>
        }
        title={props.body}
        classes={{ title: classes.questionText }}
      />
      <CardActionArea>
        <CardContent>
          <RadioGroup>
            {choiceRows}
          </RadioGroup>
        </CardContent>
      </CardActionArea>
      <Collapse in={props.submitted}>
        <Alert display="none" severity={props.answerState[props.questionNumber-1].answerCorrect ? "success" : "error"}>
          Your answer is {props.answerState[props.questionNumber-1].answerCorrect ? "correct" : "wrong"}.
        </Alert>
      </Collapse>
    </Card>
  );
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  answerState: PropTypes.array.isRequired, // TODO: Make this a bit more specific about being an array of objects and what keys are required
  onChoiceSelected: PropTypes.func.isRequired,
  toggleSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
};
