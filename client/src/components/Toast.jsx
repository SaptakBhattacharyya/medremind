import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success'
    ? 'bg-primary text-slate-900'
    : type === 'error'
    ? 'bg-accent text-white'
    : 'bg-slate-800 text-white';

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-custom shadow-lg font-medium text-sm transition-all duration-300 ${bgColor} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      {message}
    </div>
  );
}
