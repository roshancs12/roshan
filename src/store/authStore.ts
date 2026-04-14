import { create } from 'zustand';
import type { AuthCredentials, SignupPayload } from '../types/auth';
import type { UserProfile } from '../types/memory';
import { login as loginService, signup as signupService } from '../services/authService';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (payload: AuthCredentials) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
  isAuthenticated: Boolean(localStorage.getItem('auth_token')),
  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await loginService(payload);
      localStorage.setItem('auth_token', data.token);
      set({ token: data.token, user: data.user, isAuthenticated: true, loading: false });
    } catch {
      set({ error: 'Login failed. Please check your credentials.', loading: false });
      throw new Error('login_failed');
    }
  },
  signup: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await signupService(payload);
      localStorage.setItem('auth_token', data.token);
      set({ token: data.token, user: data.user, isAuthenticated: true, loading: false });
    } catch {
      set({ error: 'Signup failed. Please try again.', loading: false });
      throw new Error('signup_failed');
    }
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, user: null, isAuthenticated: false });
  }
}));
