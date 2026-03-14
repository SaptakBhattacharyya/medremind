import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I am MedRemind's AI assistant. Describe your symptoms and I will suggest appropriate medicines for you. 💊" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // Simulate bot response (will connect to /api/chat later)
    setTimeout(() => {
      const responses = {
        fever: "For fever, you can take:\n• Paracetamol 500mg (every 4-6 hours)\n• Ibuprofen 400mg (every 8 hours)\n\n⚠️ Stay hydrated and rest. Consult a doctor if fever persists beyond 3 days.",
        headache: "For headache, consider:\n• Paracetamol 500mg\n• Ibuprofen 400mg\n\n⚠️ If headaches are frequent, consult a doctor.",
        cold: "For cold symptoms:\n• Cetirizine 10mg (once daily)\n• Paracetamol 500mg for body ache\n\n⚠️ Get plenty of rest and fluids.",
        cough: "For cough:\n• Dextromethorphan 15mg (dry cough)\n• Guaifenesin 200mg (wet cough)\n\n⚠️ See a doctor if cough lasts more than 2 weeks.",
        gastric: "For gastric issues:\n• Pantoprazole 40mg (before breakfast)\n• Domperidone 10mg\n\n⚠️ Avoid spicy and oily foods.",
        default: "I can help with common symptoms like fever, headache, cold, cough, gastric issues, and more. Please describe your symptoms and I'll suggest appropriate medicines.\n\n⚠️ Always consult a doctor for serious conditions."
      };

      const lower = userMsg.toLowerCase();
      let reply = responses.default;
      for (const [key, val] of Object.entries(responses)) {
        if (key !== 'default' && lower.includes(key)) { reply = val; break; }
      }

      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-surface-dark">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-slate-700 py-4 px-6 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-primary rounded-custom flex items-center justify-center text-slate-900 shadow-lg">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">MedRemind</h1>
          <span className="text-xs text-primary-dark font-semibold">Personal Health Assistant</span>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 md:p-6 overflow-hidden">
        <section className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6" id="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.role === 'user' ? 'bg-primary text-slate-900' : 'bg-slate-100 dark:bg-slate-700 text-primary-dark border border-slate-200 dark:border-slate-600'
              }`}>
                {msg.role === 'user' ? initials : 'MB'}
              </div>
              <div className={`max-w-[80%] p-4 rounded-custom shadow-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-slate-900 rounded-tr-none shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-300 rounded-tl-none border border-slate-200 dark:border-slate-700'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-primary-dark border border-slate-200 dark:border-slate-600 shrink-0">MB</div>
              <div className="bg-white dark:bg-dark-card p-4 rounded-custom rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                  <span className="text-xs text-slate-400 ml-1">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </section>

        {/* Input */}
        <footer className="mt-4">
          <form className="flex gap-2" onSubmit={handleSend}>
            <input
              ref={inputRef}
              className="flex-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-1 focus:ring-primary text-slate-700 dark:text-white py-3.5 px-5 rounded-custom transition-all outline-none"
              placeholder="Type your message here..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-primary hover:brightness-90 text-slate-900 px-6 py-3.5 rounded-custom font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              type="submit"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-3">
            MedBot provides medication info. <span className="text-accent font-medium">Consult a doctor for medical advice.</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
