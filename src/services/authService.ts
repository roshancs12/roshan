import { apiClient } from './apiClient';
import type { AuthResponse, LoginPayload, SignupPayload } from '../types/auth';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  async signup(payload: SignupPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
    return data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async me(): Promise<AuthResponse['user']> {
    const { data } = await apiClient.get<{ user: AuthResponse['user'] }>('/auth/me');
    return data.user;
  }
};
