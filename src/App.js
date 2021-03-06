import React from 'react';
import Quiz from './Quiz.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './muiTheme.js';
import { ThemeProvider } from '@material-ui/core/styles';

// Here is an example of what the API would return when requesting a Quiz from the server:
const response = {
  'quizId': 1,
  'quizModule': 'Fruits and the UK!',
  'questions': [
    { 
      'questionId': 1,
      'body': 'Are bananas delicious?',
      'choices': [
        {
          'choiceId': 1,
          'body': 'Yes'
        },
        {
          'choiceId': 2,
          'body': 'No'
        }
      ]
    },
    { 
      'questionId': 2,
      'body': 'Select the correct statement:',
      'choices': [
        {
          'choiceId': 3,
          'body': 'The UK was part of the European Union.'
        },
        {
          'choiceId': 4,
          'body': 'The UK is not part of the European Union.'
        },
        {
          'choiceId': 5,
          'body': 'The UK is an empire.'
        },
        {
          'choiceId': 6,
          'body': '(a) and (b).'
        },
        {
          'choiceId': 7,
          'body': 'None of these options.'
        },
      ]
    },
  ],
  'answerKey': [
    {
      'questionId': 1,
      'choiceId': 1
    },
    {
      'questionId': 2,
      'choiceId': 6
    }
  ]
};

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <React.Fragment>
        <CssBaseline />
        <Quiz id={response.quizId}
          questions={response.questions}
          answerKey={response.answerKey} />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
