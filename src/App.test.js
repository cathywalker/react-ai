import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ChatComponent using data-testid', () => {
  render(<App />);
  const chatComponent = screen.getByTestId('chat-component');
  expect(chatComponent).toBeInTheDocument();
});