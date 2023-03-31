import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Register from './index';
import jest from 'jest';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Register component', () => {
  it('should render username, password, and role input fields', () => {
    render(<Register />);
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Role:')).toBeInTheDocument();
  });

  it('should submit the form when the register button is clicked', async () => {
    const mockedNavigate = jest.fn();
    useNavigate.mockReturnValueOnce(mockedNavigate);
    axios.post.mockResolvedValueOnce({ data: 'success' });
    render(<Register />);
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByLabelText('Role:'), { target: { value: 'testrole' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('https://plate-perfect.onrender.com/users/signup', {
      username: 'testuser',
      password: 'testpassword',
      role: 'testrole',
    });
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
    expect(screen.getByText(/thanks for registering/)).toBeInTheDocument();
  });

  it('should display an error message if registration fails', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: 'error' } });
    render(<Register />);
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByLabelText('Role:'), { target: { value: 'testrole' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
