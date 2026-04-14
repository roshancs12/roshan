import { apiClient } from './apiClient';
import type { AuthCredentials, AuthResponse, SignupPayload } from '../types/auth';

const loginEndpoint = import.meta.env.VITE_AUTH_LOGIN_ENDPOINT ?? '/auth/login';
const signupEndpoint = import.meta.env.VITE_AUTH_SIGNUP_ENDPOINT ?? '/auth/signup';

export const login = async (payload: AuthCredentials): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(loginEndpoint, payload);
  return data;
};

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(signupEndpoint, payload);
  return data;
};
