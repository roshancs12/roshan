import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError ?? passwordError) {
      setError(emailError ?? passwordError ?? 'Validation error');
      return;
    }
    try {
      await login({ email, password });
      navigate('/');
    } catch {
      setError('Invalid credentials');
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
        <input className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a className="block text-right text-xs text-ai-300" href="#">Forgot password?</a>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button disabled={loading} className="w-full rounded-lg bg-ai-500 py-2 font-semibold text-white">Login</button>
      </form>
    </AuthPageLayout>
  );
};
