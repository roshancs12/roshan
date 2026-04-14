import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { useAuthStore } from '../store/authStore';
import { isValidEmail } from '../utils/validators';

export const ForgotPasswordPage = () => {
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const loading = useAuthStore((state) => state.loading);
  const [email, setEmail] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(email)) return toast.error('Invalid email format.');

    try {
      await forgotPassword(email);
      toast.success('Password reset link sent.');
    } catch {
      toast.error('Failed to send reset email.');
    }
  };

  return (
    <AuthShell title="Forgot password" subtitle="Receive a reset link via email.">
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded-lg border border-white/20 bg-slate-900/60 p-3 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</button>
      </form>
      <p className="mt-4 text-sm text-blue-100"><Link to="/login" className="font-semibold text-white">Back to login</Link></p>
    </AuthShell>
  );
};
