import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPageLayout } from './AuthPageLayout';
import { useAuthStore } from '../store/authStore';
import { validateEmail, validatePassword } from '../utils/validation';

export const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (!name.trim() || emailError ?? passwordError) {
      setError(name.trim() ? emailError ?? passwordError ?? 'Validation error' : 'Name is required');
      return;
    }
    try {
      await signup({ name, email, password });
      navigate('/');
    } catch {
      setError('Could not create account');
    }
  };

  return (
    <AuthPageLayout
      title="Create account"
      subtitle="Start storing memories enriched by AI"
      alternateText="Already have an account?"
      alternateLinkLabel="Login"
      alternateLinkTo="/login"
    >
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg bg-slate-800 px-3 py-2 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button disabled={loading} className="w-full rounded-lg bg-ai-500 py-2 font-semibold text-white">Sign up</button>
      </form>
    </AuthPageLayout>
  );
};
