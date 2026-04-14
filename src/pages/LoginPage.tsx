import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { isStrongPassword, isValidEmail } from '../utils/validation';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthLoading, authError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = isValidEmail(email) && isStrongPassword(password);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    await login({ email, password });
    navigate('/dashboard');
  };

  return (
    <div className="auth-bg">
      <form onSubmit={handleSubmit} className="glass-panel auth-card">
        <h1 className="text-3xl font-bold text-blue-200">Welcome back</h1>
        <p className="text-sm text-slate-300">Log in to continue semantic memory exploration.</p>
        <input className="field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {authError && <p className="text-sm text-rose-300">{authError}</p>}
        <button disabled={!isValid || isAuthLoading} className="btn-primary w-full justify-center">{isAuthLoading ? 'Logging in...' : 'Login'}</button>
        <div className="flex justify-between text-sm text-slate-300">
          <Link to="/signup">Create account</Link>
          <button type="button">Forgot password?</button>
        </div>
      </form>
    </div>
  );
};
