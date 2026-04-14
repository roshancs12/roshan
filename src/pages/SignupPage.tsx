import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { isStrongPassword, isValidEmail } from '../utils/validation';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isAuthLoading, authError } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = name.trim().length > 1 && isValidEmail(email) && isStrongPassword(password);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    await signup({ name, email, password });
    navigate('/dashboard');
  };

  return (
    <div className="auth-bg">
      <form onSubmit={handleSubmit} className="glass-panel auth-card">
        <h1 className="text-3xl font-bold text-blue-200">Create account</h1>
        <p className="text-sm text-slate-300">Start building AI-enriched memories.</p>
        <input className="field" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field" type="password" placeholder="Password (8+ chars)" value={password} onChange={(e) => setPassword(e.target.value)} />
        {authError && <p className="text-sm text-rose-300">{authError}</p>}
        <button disabled={!isValid || isAuthLoading} className="btn-primary w-full justify-center">{isAuthLoading ? 'Creating...' : 'Sign up'}</button>
        <div className="text-sm text-slate-300">Already have an account? <Link to="/login">Login</Link></div>
      </form>
    </div>
  );
};
