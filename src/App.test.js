import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders title', () => {
  render(<App />);
  const headerElement = screen.getByText(/Super Smash Bros. Character Guesser/i);
  expect(headerElement).toBeInTheDocument();
});
