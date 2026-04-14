import { Link } from 'react-router-dom';
import { AuthPageLayout } from './AuthPageLayout';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { validateEmail } from '../utils/validation';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setMessage('If this email exists, a reset link has been sent.');
  };

  return (
    <AuthPageLayout
      title="Reset password"
      subtitle="We will email a reset link to your account"
      alternateText="Remembered your password?"
      alternateLinkLabel="Back to login"
      alternateLinkTo="/login"
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
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
        <button className="w-full rounded-lg bg-ai-500 py-2 font-semibold text-white">Send reset link</button>
      </form>
      <p className="mt-3 text-xs text-slate-400">
        This frontend is ready for backend integration at <code>/auth/forgot-password</code> if your API supports it.
      </p>
      <Link to="/login" className="mt-2 inline-block text-xs text-ai-300">Go to login</Link>
    </AuthPageLayout>
  );
};
