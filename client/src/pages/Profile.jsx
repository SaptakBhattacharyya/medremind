import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : 'U';

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-surface-dark min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md bg-white dark:bg-dark-card shadow-xl rounded-custom overflow-hidden border border-slate-200 dark:border-slate-700">
        <header className="p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 bg-primary flex items-center justify-center rounded-full text-slate-900 text-3xl font-bold shadow-lg ring-4 ring-primary/20">
            {initials}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{user?.name || 'User'}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email || ''}</p>
            <p className="text-slate-400 text-xs">Member since {memberSince}</p>
          </div>
        </header>

        <section className="px-8 pb-4 space-y-6">
          <div className="h-px bg-slate-100 dark:bg-slate-700 w-full" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-custom">
                <svg className="h-5 w-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </section>

        <footer className="p-8 pt-4">
          <button onClick={handleLogout} className="w-full py-3 px-4 bg-red-50 dark:bg-accent/10 text-accent font-semibold rounded-custom border border-red-100 dark:border-accent/20 hover:bg-red-100 dark:hover:bg-accent/20 transition-all active:scale-[0.98]">
            Logout
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest">MedRemind v1.0.4</p>
        </footer>
      </main>
    </div>
  );
}
