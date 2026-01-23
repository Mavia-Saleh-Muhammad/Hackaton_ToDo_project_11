/**
 * Signup form component tests (TDD approach).
 * Tests form submission, validation, and error handling.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignupPage } from '@/app/signup/page';
import { AuthProvider } from '@/context/AuthContext';

// Mock the API
jest.mock('@/lib/api', () => ({
  api: {
    post: jest.fn(),
  },
  setToken: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders signup form with email and password inputs', () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('displays validation error for invalid email', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for weak password', async () => {
    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid credentials', async () => {
    const mockPost = require('@/lib/api').api.post;
    mockPost.mockResolvedValue({
      user_id: 'test-user-id',
      email: 'test@example.com',
      token: 'test-jwt-token',
    });

    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/api/auth/signup', {
        email: 'test@example.com',
        password: 'SecurePass123',
      });
    });
  });

  it('displays error message on signup failure', async () => {
    const mockPost = require('@/lib/api').api.post;
    mockPost.mockRejectedValue({
      status: 400,
      message: 'Email already exists',
    });

    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const mockPost = require('@/lib/api').api.post;
    mockPost.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
