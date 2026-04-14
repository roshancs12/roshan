export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isStrongPassword = (password: string): boolean => password.trim().length >= 8;
