import { apiClient } from './apiClient';
import type { AuthResponse, LoginPayload, SignupPayload } from '../types/auth';

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  async signup(payload: SignupPayload) {
    const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
    return data;
  },
  async me() {
    const { data } = await apiClient.get<AuthResponse['user']>('/auth/me');
    return data;
  }
};
