import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuthStore } from '../store/authStore';
import { isStrongPassword, isValidEmail } from '../utils/validators';

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(email)) return toast.error('Enter a valid email.');
    if (!isStrongPassword(password)) return toast.error('Password must be at least 8 characters.');

    try {
      await login({ email, password });
      navigate('/');
    } catch {
      toast.error('Login failed.');
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to your AI-powered memory journal.">
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded-lg border border-white/20 bg-slate-900/60 p-3 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded-lg border border-white/20 bg-slate-900/60 p-3 text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link to="/forgot-password" className="block text-right text-sm text-blue-200 hover:text-blue-100">Forgot password?</Link>
        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      <p className="mt-4 text-sm text-blue-100">No account? <Link to="/signup" className="font-semibold text-white">Create one</Link></p>
    </AuthShell>
  );
};
