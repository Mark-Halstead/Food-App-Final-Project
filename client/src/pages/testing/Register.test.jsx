import React from "react";
import { render, fireEvent, screen, } from '@testing-library/react';
import { test } from '@jest/globals';
import Register from '../Register';
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";

test('renders Register component', () => {
    render(<Register />);
    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    const roleInput = screen.getByLabelText('Role:');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(roleInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
});

test('submits registration form', () => {
    const navigate = jest.fn();
    const { getByLabelText, getByRole } = render(<Register />, { wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter> });
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.change(getByLabelText('Role:'), { target: { value: 'testrole' } });
    fireEvent.click(getByRole('button', { name: 'Register' }));

    expect(navigate).toHaveBeenCalledWith('/login');
    expect(screen.getByText('Successfully registered')).toBeInTheDocument();
});

test('validates form input', () => {
    const { getByLabelText, getByRole } = render(<Register />);
    fireEvent.change(getByLabelText('Username:'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Role:'), { target: { value: '' } });
    fireEvent.click(getByRole('button', { name: 'Register' }));
    expect(screen.getByText('Please enter a username.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a password')).toBeInTheDocument();
    expect(screen.getByText('Please select a role')).toBeInTheDocument();
});