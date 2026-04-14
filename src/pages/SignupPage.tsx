import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuthStore } from '../store/authStore';
import { isStrongPassword, isValidEmail } from '../utils/validators';

export const SignupPage = () => {
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return toast.error('Name is required.');
    if (!isValidEmail(email)) return toast.error('Invalid email.');
    if (!isStrongPassword(password)) return toast.error('Use at least 8 characters.');

    try {
      await signup({ name, email, password });
      navigate('/');
    } catch {
      toast.error('Signup failed.');
    }
  };

  return (
    <AuthShell title="Create account" subtitle="Start building an AI-understood memory timeline.">
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded-lg border border-white/20 bg-slate-900/60 p-3 text-white" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-lg border border-white/20 bg-slate-900/60 p-3 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded-lg border border-white/20 bg-slate-900/60 p-3 text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
      <p className="mt-4 text-sm text-blue-100">Already have an account? <Link to="/login" className="font-semibold text-white">Login</Link></p>
    </AuthShell>
  );
};
