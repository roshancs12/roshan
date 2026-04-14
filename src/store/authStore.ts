import { create } from 'zustand';
import { authService } from '../services/authService';
import type { LoginPayload, SignupPayload, User } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthLoading: boolean;
  authError: string | null;
  initialize: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}

const TOKEN_KEY = 'memories_ai_token';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthLoading: false,
  authError: null,

  async initialize() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    set({ isAuthLoading: true, authError: null });
    try {
      const user = await authService.me();
      set({ user, token, isAuthLoading: false });
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, user: null, isAuthLoading: false });
    }
  },

  async login(payload) {
    set({ isAuthLoading: true, authError: null });
    try {
      const data = await authService.login(payload);
      localStorage.setItem(TOKEN_KEY, data.token);
      set({ user: data.user, token: data.token, isAuthLoading: false });
    } catch {
      set({ authError: 'Unable to login. Please verify your credentials.', isAuthLoading: false });
      throw new Error('Login failed');
    }
  },

  async signup(payload) {
    set({ isAuthLoading: true, authError: null });
    try {
      const data = await authService.signup(payload);
      localStorage.setItem(TOKEN_KEY, data.token);
      set({ user: data.user, token: data.token, isAuthLoading: false });
    } catch {
      set({ authError: 'Unable to create your account. Try again.', isAuthLoading: false });
      throw new Error('Signup failed');
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, token: null, authError: null });
  }
}));
