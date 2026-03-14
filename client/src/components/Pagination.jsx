export default function Pagination({ page, pages, onPageChange }) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Page <span className="text-slate-900 dark:text-white font-medium">{page}</span> of{' '}
        <span className="text-slate-900 dark:text-white font-medium">{pages}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-custom text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-700 hover:border-primary hover:text-primary"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-custom text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-700 hover:border-primary hover:text-primary"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
