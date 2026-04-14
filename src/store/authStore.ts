import { create } from 'zustand';
import { authService } from '../services/authService';
import type { AuthUser, LoginPayload, SignupPayload } from '../types/auth';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  authReady: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  bootstrap: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  authReady: false,

  async login(payload) {
    set({ loading: true });
    const response = await authService.login(payload);
    localStorage.setItem('memories-ai-token', response.token);
    set({ user: response.user, loading: false, authReady: true });
  },

  async signup(payload) {
    set({ loading: true });
    const response = await authService.signup(payload);
    localStorage.setItem('memories-ai-token', response.token);
    set({ user: response.user, loading: false, authReady: true });
  },

  logout() {
    localStorage.removeItem('memories-ai-token');
    set({ user: null, authReady: true });
  },

  async forgotPassword(email) {
    set({ loading: true });
    await authService.forgotPassword(email);
    set({ loading: false });
  },

  async bootstrap() {
    const token = localStorage.getItem('memories-ai-token');
    if (!token) {
      set({ authReady: true });
      return;
    }

    set({ loading: true });
    try {
      const user = await authService.me();
      set({ user, loading: false, authReady: true });
    } catch {
      localStorage.removeItem('memories-ai-token');
      set({ user: null, loading: false, authReady: true });
    }
  }
}));
