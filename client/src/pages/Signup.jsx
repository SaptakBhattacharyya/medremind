import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your full name.';
    if (!email.trim()) newErrors.email = 'Please enter a valid email address.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email address.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Minimum 8 characters long.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setErrors({ general: err.message || 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">MedRemind</h1>
          <p className="text-slate-500 dark:text-slate-400">Your health, our priority. Join us today.</p>
        </div>

        {/* Signup Card */}
        <div className="bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-slate-700 p-8 rounded-custom shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-center text-slate-800 dark:text-white">Create an Account</h2>

          {success && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-custom text-green-700 dark:text-green-400 text-sm font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="full-name">Full Name</label>
              <input
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-custom text-slate-900 dark:text-white focus:border-primary focus:ring-primary transition-colors px-4 py-2.5"
                id="full-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <p className="text-xs text-accent mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="signup-email">Email Address</label>
              <input
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-custom text-slate-900 dark:text-white focus:border-primary focus:ring-primary transition-colors px-4 py-2.5"
                id="signup-email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-xs text-accent mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="signup-password">Password</label>
              <input
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-custom text-slate-900 dark:text-white focus:border-primary focus:ring-primary transition-colors px-4 py-2.5"
                id="signup-password"
                type="password"
                placeholder="••••••••"
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="text-xs text-accent mt-1">{errors.password}</p>}
              {!errors.password && <p className="text-[10px] text-slate-400">Minimum 8 characters long.</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="confirm-password">Confirm Password</label>
              <input
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-custom text-slate-900 dark:text-white focus:border-primary focus:ring-primary transition-colors px-4 py-2.5"
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <p className="text-xs text-accent mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit */}
            <button
              className="w-full py-3 px-4 bg-primary hover:brightness-90 text-slate-900 font-semibold rounded-custom shadow-lg transform active:scale-[0.98] transition-all duration-150 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link className="text-primary font-bold hover:underline" to="/login">Log in</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 text-xs text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </main>
    </div>
  );
}
