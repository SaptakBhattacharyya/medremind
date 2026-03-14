export default function StatCard({ icon, label, value, valueClass = 'text-slate-900 dark:text-white' }) {
  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-custom border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</h3>
      <p className={`text-3xl font-bold mt-1 ${valueClass}`}>{value}</p>
    </div>
  );
}
