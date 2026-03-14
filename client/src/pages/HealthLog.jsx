import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import LogCard from '../components/LogCard';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import { apiFetch } from '../utils/api';

const moods = ['great', 'good', 'okay', 'bad', 'terrible'];

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  mood: 'okay',
  weight: '',
  bloodPressure: '',
  notes: '',
};

export default function HealthLog() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const limit = 8;

  const loadLogs = useCallback(async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const q = new URLSearchParams({
        userId: user._id,
        page,
        limit,
      });
      if (startDate) q.append('startDate', startDate);
      if (endDate) q.append('endDate', endDate);

      const res = await apiFetch(`/logs?${q.toString()}`);
      setLogs(res.data);
      setTotalPages(res.pages);
    } catch (err) {
      setToast({ message: 'Failed to load logs', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [user, startDate, endDate, page]);

  useEffect(() => { loadLogs(); }, [loadLogs]);
  useEffect(() => { setPage(1); }, [startDate, endDate]);

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setForm({
      date: log.date ? log.date.split('T')[0] : '',
      mood: log.mood || 'okay',
      weight: log.weight || '',
      bloodPressure: log.bloodPressure || '',
      notes: log.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this log?')) return;
    try {
      await apiFetch(`/logs/${id}`, { method: 'DELETE' });
      setToast({ message: 'Log deleted successfully', type: 'success' });
      if (logs.length === 1 && page > 1) setPage(page - 1);
      else loadLogs();
    } catch (err) {
      setToast({ message: 'Failed to delete log', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.date) errors.date = 'Date is required';
    if (!form.mood) errors.mood = 'Mood is required';
    if (form.weight && (isNaN(form.weight) || Number(form.weight) <= 0)) errors.weight = 'Weight must be positive';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        userId: user._id,
        weight: form.weight ? Number(form.weight) : null,
      };

      if (editingLog) {
        await apiFetch(`/logs/${editingLog._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setToast({ message: 'Log updated successfully', type: 'success' });
      } else {
        await apiFetch('/logs', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setToast({ message: 'Health log added successfully', type: 'success' });
      }

      setShowForm(false);
      setEditingLog(null);
      setForm(emptyForm);
      loadLogs();
    } catch (err) {
      setToast({ message: err.message || 'Failed to save log', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-surface-dark pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-slate-700 px-4 py-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            MedRemind <span className="text-primary-dark">Health Logs</span>
          </h1>
          <button
            onClick={() => { setEditingLog(null); setForm(emptyForm); setShowForm(true); }}
            className="bg-primary hover:brightness-90 text-slate-900 px-6 py-2.5 rounded-custom font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" fillRule="evenodd" /></svg>
            Add Health Log
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 md:px-8">
        {/* Filters */}
        <section className="bg-slate-50 dark:bg-dark-card p-6 rounded-custom border border-slate-200 dark:border-slate-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">From Date</label>
              <input
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-custom text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-2"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">To Date</label>
              <input
                className="w-full bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-custom text-slate-900 dark:text-white focus:ring-primary focus:border-primary px-4 py-2"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-accent font-medium py-2 rounded-custom transition-colors border border-accent/20"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Logs Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="text-lg">No health logs found.</p>
            <p className="text-sm mt-2">Start logging your health today!</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {logs.map(log => (
              <LogCard key={log.id} log={log} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </section>
        )}

        {!loading && logs.length > 0 && (
          <Pagination page={page} pages={totalPages} onPageChange={setPage} />
        )}
      </main>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-white dark:bg-dark-card rounded-custom shadow-xl max-w-lg w-full border border-slate-200 dark:border-slate-700">
              <div className="px-6 py-6">
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                  {editingLog ? 'Edit Health Log' : 'Add Health Log'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Date *</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                      {formErrors.date && <p className="text-xs text-accent mt-1">{formErrors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Mood *</label>
                      <select
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        value={form.mood}
                        onChange={(e) => setForm({ ...form, mood: e.target.value })}
                      >
                        {moods.map(m => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
                      </select>
                      {formErrors.mood && <p className="text-xs text-accent mt-1">{formErrors.mood}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Weight (kg)</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        type="number"
                        step="0.1"
                        placeholder="e.g. 70"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                      />
                      {formErrors.weight && <p className="text-xs text-accent mt-1">{formErrors.weight}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Blood Pressure</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        placeholder="e.g. 120/80"
                        value={form.bloodPressure}
                        onChange={(e) => setForm({ ...form, bloodPressure: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Notes</label>
                    <textarea
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                      rows="2"
                      placeholder="How are you feeling today?"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" className="text-sm font-medium text-slate-500 hover:text-accent px-4 py-2" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="bg-primary text-slate-900 px-6 py-2 rounded-custom text-sm font-bold shadow-sm disabled:opacity-60" disabled={saving}>
                      {saving ? 'Saving...' : editingLog ? 'Update Log' : 'Save Log'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
