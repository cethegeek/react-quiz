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
  Divider
} from "@material-ui/core";
//import Alert from '@material-ui/lab/Alert';

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

  const rows = [];
  props.choices.forEach((choice, idx, array) => {
    const key = `${props.id}_${choice.choiceId}`;
    rows.push(
      <AnswerChoice
        key={key}
        questionId={props.id}
        choiceId={choice.choiceId}
        index={idx + 1}
        body={choice.body}
        answers={props.answers}
        setAnswers={props.setAnswers}
        answerKey={props.answerKey}
      />
    );
    if (idx !== array.length - 1) {
      rows.push(<Divider key={"div"+key} light />);
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
          <RadioGroup>{rows}</RadioGroup>
        </CardContent>
      </CardActionArea>
      <div id={"results" + props.id} style={{display: props.answers.get(props.id) ? 'block' : 'none' }}>
        asd
      </div> 
    </Card>
  );
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  answers: PropTypes.instanceOf(Map).isRequired,
  setAnswers: PropTypes.func.isRequired,
  answerKey: PropTypes.object.isRequired,
};
