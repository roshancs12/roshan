import { apiClient } from './apiClient';
import type { AuthCredentials, AuthResponse, SignupPayload } from '../types/auth';

export const login = async (payload: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
  return data;
};
