import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import { apiFetch } from '../utils/api';

const moodEmojis = { great: '😄', good: '🙂', okay: '😐', bad: '😟', terrible: '😢' };

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalMeds: 0, activeMeds: 0, logsThisWeek: 0, lastMood: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    let isMounted = true;

    async function fetchData() {
      try {
        const [medsRes, logsRes] = await Promise.all([
          apiFetch(`/medicines?userId=${user._id}&limit=1000`),
          apiFetch(`/logs?userId=${user._id}&limit=1000`)
        ]);

        if (!isMounted) return;

        const meds = medsRes.data || [];
        const logs = logsRes.data || [];

        const now = new Date();
        const activeMeds = meds.filter(m => !m.endDate || new Date(m.endDate) > now);
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weekLogs = logs.filter(l => new Date(l.date) >= weekAgo);
        const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date));

        setStats({
          totalMeds: meds.length,
          activeMeds: activeMeds.length,
          logsThisWeek: weekLogs.length,
          lastMood: sortedLogs[0]?.mood || null,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [user]);

  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-surface-dark p-8">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {firstName}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Here's your health overview for today.</p>
        </div>
      </header>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-dark-card p-6 rounded-custom border border-slate-200 dark:border-slate-700 animate-pulse">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-lg mb-4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-24 mb-2" />
                <div className="h-8 bg-slate-200 dark:bg-slate-600 rounded w-12" />
              </div>
            ))}
          </>
        ) : (
          <>
            <StatCard
              icon={<svg className="text-primary-dark w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>}
              label="Total Medicines"
              value={stats.totalMeds}
            />
            <StatCard
              icon={<svg className="text-primary-dark w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>}
              label="Active Today"
              value={stats.activeMeds}
              valueClass="text-primary-dark"
            />
            <StatCard
              icon={<svg className="text-accent w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="3" y2="15" /></svg>}
              label="Logs This Week"
              value={stats.logsThisWeek}
            />
            <StatCard
              icon={<svg className="text-primary-dark w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>}
              label="Last Mood"
              value={stats.lastMood ? moodEmojis[stats.lastMood] : '—'}
            />
          </>
        )}
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/medicines')}
            className="flex items-center gap-3 px-6 py-4 bg-primary hover:brightness-90 text-slate-900 font-bold rounded-custom shadow-md shadow-primary/20 transition-all active:scale-95"
          >
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            Add Medicine
          </button>
          <button
            onClick={() => navigate('/logs')}
            className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-custom border border-slate-200 dark:border-slate-600 shadow-sm transition-all active:scale-95"
          >
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Log Health
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900 dark:bg-slate-700 text-white hover:bg-black dark:hover:bg-slate-600 font-semibold rounded-custom shadow-md transition-all active:scale-95"
          >
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Ask Chatbot
          </button>
        </div>
      </section>
    </div>
  );
}
