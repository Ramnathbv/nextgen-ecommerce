import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

const renderWithProvider = (ui) =>
  render(<AuthProvider>{ui}</AuthProvider>);

describe('Login Field Validation', () => {
  test('shows error for invalid username in Sign In', () => {
    renderWithProvider(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'user123' },
    });
    expect(screen.getByText(/Username must contain only letters/i)).toBeInTheDocument();
  });

  test('shows error for invalid email in Sign Up', () => {
    renderWithProvider(<Login />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'invalidemail' },
    });
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows error for invalid password in Sign Up', () => {
    renderWithProvider(<Login />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    fireEvent.change(screen.getByPlaceholderText(/Choose a password/i), {
      target: { value: 'short' },
    });
    expect(
      screen.getByText(/Password must be 12–16 characters and include uppercase, lowercase, digit, and symbol/i)
    ).toBeInTheDocument();
  });

  test('shows error when passwords do not match in Sign Up', () => {
    renderWithProvider(<Login />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    fireEvent.change(screen.getByPlaceholderText(/Choose a password/i), {
      target: { value: 'ValidPassword123!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), {
      target: { value: 'DifferentPassword123!' },
    });
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});