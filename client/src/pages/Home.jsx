import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="antialiased overflow-x-hidden bg-white dark:bg-surface-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-custom flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="m8.5 8.5 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">MedRemind</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" to="/login">Log In</Link>
            <Link className="bg-primary px-6 py-2 rounded-custom text-sm font-semibold text-slate-900 shadow-lg shadow-primary/20 hover:brightness-90 transition-all" to="/signup">Sign Up</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-white dark:bg-surface-dark">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gradient">
              Never Miss a Dose, <br className="hidden md:block" /> Always Track Your Health
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The all-in-one companion for medication adherence, daily health logging, and personalized AI-driven insights. Take control of your wellbeing today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary rounded-custom text-lg font-bold text-slate-900 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform">
                Get Started Free
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-custom text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                View Demo
              </Link>
            </div>

            {/* App Preview */}
            <div className="mt-16 relative mx-auto max-w-4xl">
              <div className="aspect-video bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-custom border border-slate-200 dark:border-slate-600 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">💊</div>
                  <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">MedRemind Dashboard</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Your health overview at a glance</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-surface-dark via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Advanced Tools for Your Health</h2>
              <p className="text-slate-500 dark:text-slate-400">Everything you need to manage medications and monitor vitals in one place.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Smart Reminders */}
              <div className="p-8 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-custom hover:border-primary transition-colors group">
                <div className="w-14 h-14 bg-primary/10 rounded-custom flex items-center justify-center mb-6 text-slate-900 group-hover:bg-primary transition-all">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Smart Reminders</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Customizable alerts for every dose. We handle complex schedules so you don't have to worry about missing a thing.
                </p>
              </div>

              {/* Comprehensive Logs */}
              <div className="p-8 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-custom hover:border-primary transition-colors group">
                <div className="w-14 h-14 bg-primary/10 rounded-custom flex items-center justify-center mb-6 text-slate-900 group-hover:bg-primary transition-all">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Comprehensive Logs</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Track symptoms, mood, blood pressure, and more. Visualize your health journey with easy-to-read charts.
                </p>
              </div>

              {/* AI Health Assistant */}
              <div className="p-8 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-custom hover:border-accent transition-colors group">
                <div className="w-14 h-14 bg-accent/10 rounded-custom flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">AI Health Assistant</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Get personalized insights based on your logs. Identify patterns and share professional reports with your doctor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-custom flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">MedRemind</span>
          </div>
          <div className="text-slate-400 text-sm">© 2025 MedRemind. All rights reserved.</div>
          <div className="flex gap-6 text-slate-500">
            <a className="hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms</a>
            <a className="hover:text-primary transition-colors" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
