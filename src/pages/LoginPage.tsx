import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthPageLayout } from './AuthPageLayout';
import { validateEmail, validatePassword } from '../utils/validation';
import { useAuthStore } from '../store/authStore';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const formError = emailError || passwordError;
    if (formError) {
      setError(formError);
      return;
    }

    try {
      await login({ email: email.trim(), password });
      navigate('/', { replace: true });
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <AuthPageLayout
      title="Welcome back"
      subtitle="Continue your AI-enhanced memory journey"
      alternateText="No account?"
      alternateLinkLabel="Sign up"
      alternateLinkTo="/signup"
    >
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white"
          placeholder="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className="block text-right text-xs text-ai-300 hover:text-ai-100" to="/forgot-password">Forgot password?</Link>
        {error || authError ? <p className="text-sm text-red-400">{error || authError}</p> : null}
        <button disabled={loading} className="w-full rounded-lg bg-ai-500 py-2 font-semibold text-white disabled:opacity-70">{loading ? 'Signing in...' : 'Login'}</button>
      </form>
    </AuthPageLayout>
  );
};
