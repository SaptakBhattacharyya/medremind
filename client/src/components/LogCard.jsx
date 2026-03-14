const moodEmojis = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  bad: '😟',
  terrible: '😢',
};

export default function LogCard({ log, onEdit, onDelete }) {
  const dateStr = log.date
    ? new Date(log.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'No date';

  return (
    <div className="bg-white dark:bg-dark-card p-5 rounded-custom border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{dateStr}</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{log.mood || 'No mood'}</h3>
          </div>
          <span className="text-3xl" title={log.mood}>{moodEmojis[log.mood] || '😐'}</span>
        </div>
        <div className="space-y-2 mb-4">
          {log.weight && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Weight</span>
              <span className="text-slate-900 dark:text-white font-medium">{log.weight} kg</span>
            </div>
          )}
          {log.bloodPressure && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">BP</span>
              <span className="text-slate-900 dark:text-white font-medium">{log.bloodPressure}</span>
            </div>
          )}
        </div>
        {log.notes && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-600">
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic">"{log.notes}"</p>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-600">
        <button
          onClick={() => onEdit(log)}
          className="flex-1 text-xs font-medium py-1.5 text-primary hover:bg-primary/10 rounded-custom transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(log._id || log.id)}
          className="flex-1 text-xs font-medium py-1.5 text-accent hover:bg-accent/10 rounded-custom transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
