import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import MedicineCard from '../components/MedicineCard';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import { apiFetch } from '../utils/api';

const categories = ['All', 'Antibiotic', 'Painkiller', 'Vitamin', 'Antacid', 'Other'];
const sortOptions = [
  { label: 'Newest First', value: 'createdAt:-1' },
  { label: 'Oldest First', value: 'createdAt:1' },
  { label: 'Name A→Z', value: 'name:1' },
  { label: 'Name Z→A', value: 'name:-1' },
];

const emptyForm = { name: '', dosage: '', frequency: '', category: 'Other', startDate: '', endDate: '', notes: '' };

export default function Medicines() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('createdAt:-1');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const limit = 6;

  const loadMedicines = useCallback(async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const q = new URLSearchParams({
        userId: user._id,
        page,
        limit,
        sort,
      });
      if (search) q.append('search', search);
      if (category !== 'All') q.append('category', category);

      const res = await apiFetch(`/medicines?${q.toString()}`);
      setMedicines(res.data);
      setTotalPages(res.pages);
    } catch (err) {
      setToast({ message: 'Failed to load medicines', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [user, search, category, sort, page]);

  useEffect(() => { loadMedicines(); }, [loadMedicines]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, category, sort]);

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setForm({
      name: medicine.name || '',
      dosage: medicine.dosage || '',
      frequency: medicine.frequency || '',
      category: medicine.category || 'Other',
      startDate: medicine.startDate ? medicine.startDate.split('T')[0] : '',
      endDate: medicine.endDate ? medicine.endDate.split('T')[0] : '',
      notes: medicine.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this medicine?')) return;
    try {
      await apiFetch(`/medicines/${id}`, { method: 'DELETE' });
      setToast({ message: 'Medicine deleted successfully', type: 'success' });
      if (medicines.length === 1 && page > 1) setPage(page - 1);
      else loadMedicines();
    } catch (err) {
      setToast({ message: 'Failed to delete medicine', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
      errors.endDate = 'End date must be after start date';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      const payload = { ...form, userId: user._id };
      if (!payload.startDate) delete payload.startDate;
      if (!payload.endDate) delete payload.endDate;

      if (editingMedicine) {
        await apiFetch(`/medicines/${editingMedicine._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setToast({ message: 'Medicine updated successfully', type: 'success' });
      } else {
        await apiFetch('/medicines', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setToast({ message: 'Medicine added successfully', type: 'success' });
      }

      setShowForm(false);
      setEditingMedicine(null);
      setForm(emptyForm);
      loadMedicines();
    } catch (err) {
      setToast({ message: err.message || 'Failed to save medicine', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-surface-dark">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Nav Bar */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Manage Medicines</h1>
            <button
              onClick={() => { setEditingMedicine(null); setForm(emptyForm); setShowForm(true); }}
              className="bg-primary hover:brightness-90 text-slate-900 px-4 py-2 rounded-custom text-sm font-bold transition-colors"
            >
              + Add New Medicine
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 dark:bg-dark-card p-4 rounded-custom border border-slate-200 dark:border-slate-700 mb-8">
          <div className="md:col-span-6 relative">
            <input
              className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-custom text-sm py-2.5 pl-10 text-slate-900 dark:text-white"
              placeholder="Search medicines..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <div className="md:col-span-3">
            <select
              className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-custom text-sm py-2.5 text-slate-900 dark:text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
          </div>
          <div className="md:col-span-3">
            <select
              className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary rounded-custom text-sm py-2.5 text-slate-900 dark:text-white"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Medicine Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="text-lg">No medicines found.</p>
            <p className="text-sm mt-2">Add your first medicine to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map(med => (
              <MedicineCard key={med.id} medicine={med} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && medicines.length > 0 && (
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
                  {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Medicine Name *</label>
                    <input
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {formErrors.name && <p className="text-xs text-accent mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Dosage</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        placeholder="e.g. 500mg"
                        type="text"
                        value={form.dosage}
                        onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Frequency</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        placeholder="e.g. Twice daily"
                        type="text"
                        value={form.frequency}
                        onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Category</label>
                    <select
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Start Date</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">End Date</label>
                      <input
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      />
                      {formErrors.endDate && <p className="text-xs text-accent mt-1">{formErrors.endDate}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Notes</label>
                    <textarea
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary rounded-custom text-slate-900 dark:text-white px-4 py-2"
                      rows="2"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      className="text-sm font-medium text-slate-500 hover:text-accent transition-colors px-4 py-2"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-slate-900 px-6 py-2 rounded-custom text-sm font-bold shadow-sm disabled:opacity-60"
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : editingMedicine ? 'Update Medicine' : 'Save Medicine'}
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
