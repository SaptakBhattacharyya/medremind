import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const user = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="m8.5 8.5 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">MedRemind</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your medications with ease</p>
        </div>

        {/* Login Card */}
        <section className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 shadow-xl rounded-custom overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Welcome back</h2>

            {error && (
              <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-custom text-accent text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">Email Address</label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-custom px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 outline-none placeholder:text-slate-400"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                </div>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-custom px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 outline-none placeholder:text-slate-400"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-primary hover:brightness-90 text-slate-900 font-bold py-3 px-4 rounded-custom transition duration-200 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </div>
            </form>
          </div>

          <footer className="bg-slate-50 dark:bg-slate-800 p-6 text-center border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link className="text-primary font-semibold hover:underline" to="/signup">Sign up for free</Link>
            </p>
          </footer>
        </section>

        <p className="text-center text-slate-400 text-xs mt-8">© 2025 MedRemind Inc. All rights reserved.</p>
      </main>
    </div>
  );
}
