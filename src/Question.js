import React from "react";
import PropTypes from "prop-types";
import AnswerChoice from "./AnswerChoice.js";
import {
  makeStyles,
  Typography,
  Box,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardActions,
  Avatar,
  RadioGroup,
  Divider
} from "@material-ui/core";

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
  }
}));

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
{/* {      <CardActions>
        <Box display="">
          <Typography
            id={"questionPanelError" + props.id}
            variant="caption"
            color="error">
            Your answer is incorrect!
          </Typography>
        </Box>
        <Box display={props.answers.get(props.id) ? "" : "none"}>
          <Typography
            id={"questionPanelError" + props.id}
            variant="caption"
            color="primary">
            Your answer is correct!
          </Typography>
        </Box>
      </CardActions> } */}
    </Card>
  );
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired
};
