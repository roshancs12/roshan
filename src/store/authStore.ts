import { create } from 'zustand';
import axios from 'axios';
import type { AuthCredentials, SignupPayload } from '../types/auth';
import type { UserProfile } from '../types/memory';
import { login as loginService, signup as signupService } from '../services/authService';

const readStoredUser = (): UserProfile | null => {
  const value = localStorage.getItem('auth_user');
  if (!value) return null;
  try {
    return JSON.parse(value) as UserProfile;
  } catch {
    localStorage.removeItem('auth_user');
    return null;
  }
};

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
  user: readStoredUser(),
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
  isAuthenticated: Boolean(localStorage.getItem('auth_token')),
  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await loginService(payload);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined) ?? 'Login failed. Please check your credentials.'
        : 'Login failed. Please check your credentials.';
      set({ error: message, loading: false });
      throw new Error('login_failed');
    }
  },
  signup: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await signupService(payload);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined) ?? 'Signup failed. Please try again.'
        : 'Signup failed. Please try again.';
      set({ error: message, loading: false });
      throw new Error('signup_failed');
    }
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    set({ token: null, user: null, isAuthenticated: false });
  }
}));
