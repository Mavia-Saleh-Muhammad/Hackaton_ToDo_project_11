/**
 * TypeScript types for authentication.
 * Matches backend API schemas.
 */

export interface User {
  user_id: string;
  email: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  user_id: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
