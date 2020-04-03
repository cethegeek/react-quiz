import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';
import App from './App';

test('Renders quiz heading', () => {
  const dom = render(<App />);
  const getById = queryByAttribute.bind(null, 'id');
  const element = getById(dom.container, 'quizHeading');
  expect(element).toBeInTheDocument();
});

test('Renders the submit button initially disabled', () => {
  const { getByText } = render(<App />);
  const button = getByText(/Submit/i);
  expect(button.closest('button')).toBeDisabled();
});

test('Renders all the questions in the quiz', () => {
  const dom = render(<App />);
  const questionPanels = dom.getAllByTestId('questionPanel')
  console.log(questionPanels.length);
  expect(questionPanels.length).toBe(2);
});

test('Renders enabled submit button when all questions have selected answers', () => {
  // TODO
});

test('Renders the completed alert when submitted', () => {
  // TODO
});

test('Renders the question correct/wrong alert per question when submitted', () => {
  // TODO
});