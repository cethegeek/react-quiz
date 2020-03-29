import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders test your knowledge title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/test your knowledge/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders the submit button initially disabled', () => {
  const { getByText } = render(<App />);
  const button = getByText(/Submit/i);
  expect(button.closest('button')).toBeDisabled();
});

test('Renders two questions', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/MuiAvatar-circle/i);
  expect(linkElement).toBeInTheDocument();
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