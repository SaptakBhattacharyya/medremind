export default function MedicineCard({ medicine, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 p-5 rounded-custom hover:border-primary transition-colors relative group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400 bg-primary/20 px-2 py-1 rounded-md">
            {medicine.category || 'Other'}
          </span>
          <h3 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">{medicine.name}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(medicine)}
            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-full transition-all"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(medicine._id || medicine.id)}
            className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-full transition-all"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Dosage: <strong className="text-slate-900 dark:text-white">{medicine.dosage || 'N/A'}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Frequency: <strong className="text-slate-900 dark:text-white">{medicine.frequency || 'N/A'}</strong></span>
        </div>
        {medicine.notes && (
          <p className="text-xs text-slate-500 dark:text-slate-500 italic mt-2">{medicine.notes}</p>
        )}
      </div>
    </div>
  );
}
