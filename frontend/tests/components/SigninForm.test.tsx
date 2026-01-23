/**
 * Signin form component tests (TDD approach).
 * Tests form submission, token storage, and redirect logic.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SigninPage } from '@/app/signin/page';
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

describe('SigninForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders signin form with email and password inputs', () => {
    render(
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
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
        <SigninPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/api/auth/signin', {
        email: 'test@example.com',
        password: 'SecurePass123',
      });
    });
  });

  it('stores token in localStorage on successful signin', async () => {
    const mockPost = require('@/lib/api').api.post;
    const mockSetToken = require('@/lib/api').setToken;

    mockPost.mockResolvedValue({
      user_id: 'test-user-id',
      email: 'test@example.com',
      token: 'test-jwt-token',
    });

    render(
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('test-jwt-token');
    });
  });

  it('redirects to dashboard on successful signin', async () => {
    const mockPost = require('@/lib/api').api.post;
    const mockRouter = require('next/navigation').useRouter();

    mockPost.mockResolvedValue({
      user_id: 'test-user-id',
      email: 'test@example.com',
      token: 'test-jwt-token',
    });

    render(
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter().push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays error message on signin failure (invalid credentials)', async () => {
    const mockPost = require('@/lib/api').api.post;
    mockPost.mockRejectedValue({
      status: 401,
      message: 'Invalid credentials',
    });

    render(
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPass123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const mockPost = require('@/lib/api').api.post;
    mockPost.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('has link to signup page for new users', () => {
    render(
      <AuthProvider>
        <SigninPage />
      </AuthProvider>
    );

    const signupLink = screen.getByText(/don't have an account/i);
    expect(signupLink).toBeInTheDocument();
  });
});
