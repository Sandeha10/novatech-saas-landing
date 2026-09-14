import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Star, 
  Menu, 
  X,
  Lock,
  Mail,
  User,
  LogOut,
  LayoutDashboard,
  TrendingUp,
  Users,
  CreditCard,
  Bell,
  Search,
  ExternalLink,
  Download,
  Check,
  Plus,
  Shield,
  Activity,
  HardDrive,
  Cpu,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Auth state with LocalStorage persistence
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('novatech_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState('');

  // Logout confirmation modal state
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const userName = authMode === 'signup' 
      ? (formData.name.trim() || 'Partner') 
      : (formData.email.split('@')[0] || 'User');

    const loggedUser = {
      name: userName,
      email: formData.email
    };

    localStorage.setItem('novatech_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
    setAuthModalOpen(false);
    setFormError('');
    setFormData({ name: '', email: '', password: '' });
    setCurrentView('dashboard');
    showToast(`Welcome back, ${userName}!`);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Alex Vance',
      email: 'alex.demo@novatech.io'
    };
    localStorage.setItem('novatech_user', JSON.stringify(demoUser));
    setUser(demoUser);
    setAuthModalOpen(false);
    setCurrentView('dashboard');
    showToast('Signed in via Instant Demo Session');
  };

  // Triggered when confirmed in the modal
  const confirmLogout = () => {
    localStorage.removeItem('novatech_user');
    setUser(null);
    setCurrentView('landing');
    setLogoutConfirmOpen(false);
    showToast('You have been signed out safely.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs font-medium">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-white">{toast.message}</span>
        </div>
      )}

      {/* View 1: Dashboard */}
      {currentView === 'dashboard' && user ? (
        <Dashboard 
          user={user} 
          onRequestLogout={() => setLogoutConfirmOpen(true)} 
          onGoHome={() => setCurrentView('landing')} 
          showToast={showToast}
        />
      ) : (
        /* View 2: Landing Page */
        <>
          <nav className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
                <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tight">NovaTech</span>
              </div>

              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <a href="#features" className="hover:text-white transition">Features</a>
                <a href="#pricing" className="hover:text-white transition">Pricing</a>
                <a href="#testimonials" className="hover:text-white transition">Reviews</a>
              </div>

              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setCurrentView('dashboard')}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Open Dashboard
                    </button>
                    <button 
                      onClick={() => setLogoutConfirmOpen(true)}
                      className="p-2 text-slate-400 hover:text-rose-400 transition"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
                      className="text-sm font-medium hover:text-white text-slate-300 transition"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>

              <button 
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden px-6 py-4 bg-slate-900 border-b border-slate-800 space-y-3">
                <a href="#features" className="block text-slate-300 hover:text-white">Features</a>
                <a href="#pricing" className="block text-slate-300 hover:text-white">Pricing</a>
                <a href="#testimonials" className="block text-slate-300 hover:text-white">Reviews</a>
                {user ? (
                  <button 
                    onClick={() => { setCurrentView('dashboard'); setIsMenuOpen(false); }}
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg"
                  >
                    Open Dashboard
                  </button>
                ) : (
                  <button 
                    onClick={() => { setAuthModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg"
                  >
                    Sign In / Get Started
                  </button>
                )}
              </div>
            )}
          </nav>

          <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <SparkleIcon /> Enterprise Infrastructure OS
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Supercharge your workflow with modern intelligence.
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Monitor operational services, track conversions, and scale cloud workloads with instant automated visibility.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDemoLogin}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 font-semibold rounded-xl transition flex items-center justify-center gap-2"
              >
                Explore Live Demo <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div 
              onClick={handleDemoLogin}
              className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 p-3 shadow-2xl backdrop-blur group cursor-pointer hover:border-indigo-500/60 transition"
              title="Click to launch interactive app"
            >
              <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-md bg-indigo-600 text-xs font-semibold text-white shadow-lg">
                Interactive Preview (Click to Launch)
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-6 sm:p-10 flex flex-col items-center justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-xs text-slate-400">Total Revenue</p>
                    <p className="text-2xl font-bold mt-1 text-white">$48,250.00</p>
                    <p className="text-xs text-emerald-400 mt-2">↑ +14.2% this month</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-xs text-slate-400">Active Nodes</p>
                    <p className="text-2xl font-bold mt-1 text-white">1,280</p>
                    <p className="text-xs text-indigo-400 mt-2">99.98% uptime</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-xs text-slate-400">Average Latency</p>
                    <p className="text-2xl font-bold mt-1 text-white">18ms</p>
                    <p className="text-xs text-emerald-400 mt-2">Optimal edge routes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white">Built for speed & scalability</h2>
              <p className="mt-3 text-slate-400">Everything needed to monitor, scale, and optimize your cloud applications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sub-millisecond Speed</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Engineered with edge caching protocols delivering ultra-fast response latency across global nodes.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Automated Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Integrated TLS encryption, DDoS shields, and role-based privilege checks right out of the box.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Observability</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Real-time telemetry and operational metrics aggregated directly to interactive management tables.
                </p>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white">Simple, transparent pricing</h2>
              <p className="mt-3 text-slate-400">Choose the tier that aligns with your engineering roadmap.</p>
              
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className={`text-sm ${!isAnnual ? 'text-white font-semibold' : 'text-slate-400'}`}>Monthly</span>
                <button 
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="w-14 h-8 bg-slate-800 rounded-full p-1 border border-slate-700 relative transition"
                >
                  <div className={`w-6 h-6 bg-indigo-600 rounded-full transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className={`text-sm ${isAnnual ? 'text-white font-semibold' : 'text-slate-400'}`}>
                  Annually <span className="text-emerald-400 text-xs font-bold">(Save 20%)</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Starter</h3>
                  <p className="text-slate-400 text-sm mt-1">For independent creators</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${isAnnual ? '15' : '19'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 5 Cloud instances</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Basic metrics monitoring</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Community support</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
                >
                  Get Started
                </button>
              </div>

              <div className="p-8 rounded-2xl bg-indigo-950/20 border-2 border-indigo-500 relative flex flex-col justify-between shadow-xl shadow-indigo-500/10">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded-full">
                  RECOMMENDED
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">Professional</h3>
                  <p className="text-slate-400 text-sm mt-1">For growing teams & startups</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${isAnnual ? '39' : '49'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited projects</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Real-time telemetry feed</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority 24/7 routing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Webhook trigger support</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg font-medium transition"
                >
                  Start Free Trial
                </button>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Enterprise</h3>
                  <p className="text-slate-400 text-sm mt-1">Custom infrastructure scale</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${isAnnual ? '79' : '99'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated edge node fleet</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom SLA 99.99%</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Enterprise audit logs</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white">Trusted by founders worldwide</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "NovaTech streamlined our microservices telemetry effortlessly.", author: "Alex Reed", role: "CTO, CloudScale" },
                { quote: "The interface responsiveness and clean architectural structure are exceptional.", author: "Sarah Jenkins", role: "Product Lead" },
                { quote: "Fast, dependable, and built with modern engineering standards.", author: "Michael Chen", role: "Principal Architect" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-300 text-sm">"{item.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <p className="font-semibold text-white text-sm">{item.author}</p>
                    <p className="text-slate-500 text-xs">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t border-slate-800/80 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4">
            <p>© Designed & Developed by Sandeha Weerasingha</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400">Documentation</a>
              <a href="#" className="hover:text-slate-400">API Status</a>
              <a href="#" className="hover:text-slate-400">Security</a>
            </div>
          </footer>
        </>
      )}

      {/* 1. AUTH MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {authMode === 'signin' ? 'Welcome back to NovaTech' : 'Create your account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'signin' ? 'Enter credentials to access telemetry dashboard' : 'Get started with an enterprise sandbox trial'}
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center">
                {formError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input 
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm transition shadow-lg shadow-indigo-600/20"
              >
                {authMode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Recruiter or Reviewer?</span>
              <button 
                type="button" 
                onClick={handleDemoLogin}
                className="text-indigo-400 hover:underline font-semibold"
              >
                Instant 1-Click Demo Login →
              </button>
            </div>

            <div className="mt-3 text-center text-xs text-slate-500">
              {authMode === 'signin' ? (
                <>Don't have an account? <span onClick={() => setAuthMode('signup')} className="text-indigo-400 cursor-pointer hover:underline">Sign up</span></>
              ) : (
                <>Already have an account? <span onClick={() => setAuthMode('signin')} className="text-indigo-400 cursor-pointer hover:underline">Sign in</span></>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. LOGOUT CONFIRMATION MODAL */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Sign Out Confirmation</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to end your active session? You will need to sign in again to access the operations cluster.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setLogoutConfirmOpen(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-rose-600/30"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ---------------- Dashboard Component ----------------
function Dashboard({ user, onRequestLogout, onGoHome, showToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const clusterEvents = [
    { id: '#EV-9021', service: 'Database Migration', status: 'Completed', timestamp: 'Just now' },
    { id: '#EV-9020', service: 'Webhook Sync Endpoint', status: 'Success', timestamp: '12 mins ago' },
    { id: '#EV-9019', service: 'TLS Certificate Rotation', status: 'Verified', timestamp: '1 hour ago' },
    { id: '#EV-9018', service: 'Edge Node Auto-Scale', status: 'Active', timestamp: '3 hours ago' },
    { id: '#EV-9017', service: 'Redis Cache Warmup', status: 'Completed', timestamp: '5 hours ago' }
  ];

  const filteredEvents = clusterEvents.filter((ev) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      ev.id.toLowerCase().includes(query) ||
      ev.service.toLowerCase().includes(query) ||
      ev.status.toLowerCase().includes(query) ||
      ev.timestamp.toLowerCase().includes(query)
    );
  });

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Event ID,Service Name,Status,Timestamp\n";

    filteredEvents.forEach((row) => {
      csvContent += `${row.id},${row.service},${row.status},${row.timestamp}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `novatech_cluster_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded CSV with ${filteredEvents.length} events!`);
  };

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: user.name, email: user.email, role: 'Owner / Admin', twoFactor: true, status: 'Active' },
    { id: 2, name: 'Marcus Brody', email: 'm.brody@cloudscale.io', role: 'DevOps Lead', twoFactor: true, status: 'Active' },
    { id: 3, name: 'Elena Rostova', email: 'elena@novatech.io', role: 'Backend Engineer', twoFactor: false, status: 'Active' },
    { id: 4, name: 'Jordan Smith', email: 'jordan@securityaudit.org', role: 'Security Auditor', twoFactor: true, status: 'Active' }
  ]);

  const filteredTeam = teamMembers.filter((m) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query) ||
      m.status.toLowerCase().includes(query)
    );
  });

  const [editingMember, setEditingMember] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ name: '', email: '', role: 'Frontend Developer' });

  const handleSaveMember = (e) => {
    e.preventDefault();
    setTeamMembers(teamMembers.map(m => m.id === editingMember.id ? editingMember : m));
    showToast(`Updated permissions for ${editingMember.name}`);
    setEditingMember(null);
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteData.name || !inviteData.email) return;
    
    const newMember = {
      id: Date.now(),
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      twoFactor: false,
      status: 'Active'
    };

    setTeamMembers([...teamMembers, newMember]);
    showToast(`Invitation sent to ${inviteData.email}`);
    setInviteData({ name: '', email: '', role: 'Frontend Developer' });
    setInviteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-6 cursor-pointer" onClick={onGoHome}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">NovaTech OS</span>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <TrendingUp className="w-4 h-4" /> Live Analytics
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Users className="w-4 h-4" /> Team & Access
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'billing' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <CreditCard className="w-4 h-4" /> Billing & Usage
            </button>
          </nav>
        </div>

        {/* User Card with Safe Logout Trigger */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onRequestLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md hover:bg-slate-800 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-950/50 backdrop-blur sticky top-0 z-30">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter services, IDs, members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-8 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onGoHome}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition"
            >
              ← Back to Landing
            </button>
            <button 
              onClick={() => showToast('All system clusters operational.')}
              className="relative p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5" />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Welcome back, <span className="text-indigo-400">{user.name}</span>! 👋
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Real-time status and metrics for connected enterprise clusters.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => showToast('Edge cache purged globally across 32 points!')} 
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 rounded-lg transition"
                  >
                    Purge Edge Cache
                  </button>
                  <button 
                    onClick={handleExportCSV} 
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Total Run Rate</p>
                  <p className="text-2xl font-bold text-white mt-1">$48,250.00</p>
                  <span className="inline-block mt-2 text-xs text-emerald-400 font-semibold">↑ +14.2% this month</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Active Nodes</p>
                  <p className="text-2xl font-bold text-white mt-1">1,280</p>
                  <span className="inline-block mt-2 text-xs text-indigo-400 font-semibold">Healthy Clusters</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Global Ping</p>
                  <p className="text-2xl font-bold text-white mt-1">18ms</p>
                  <span className="inline-block mt-2 text-xs text-emerald-400 font-semibold">Optimal</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Current Plan</p>
                  <p className="text-2xl font-bold text-white mt-1">Enterprise</p>
                  <span className="inline-block mt-2 text-xs text-slate-400 font-semibold">99.99% SLA Active</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">Live Cluster Activity Stream</h3>
                    {searchQuery && (
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                        Filtering by: "{searchQuery}"
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">● Streaming</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr><th className="p-3">Event ID</th><th className="p-3">Service</th><th className="p-3">Status</th><th className="p-3">Timestamp</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((ev) => (
                        <tr key={ev.id} className="hover:bg-slate-850/50 transition">
                          <td className="p-3 font-mono text-indigo-400">{ev.id}</td>
                          <td className="p-3 font-medium text-white">{ev.service}</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">{ev.status}</span></td>
                          <td className="p-3 text-slate-500">{ev.timestamp}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-6 text-center text-slate-500 text-xs">
                          No cluster events matching "<span className="text-slate-300">{searchQuery}</span>"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Compute & Telemetry Metrics</h1>
                <p className="text-xs text-slate-400 mt-1">Real-time load balancing and resource consumption data across worldwide instances.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300 flex items-center gap-2"><Cpu className="w-4 h-4 text-indigo-400" /> CPU Allocation</span>
                    <span className="text-sm font-bold text-white">42%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
                  </div>
                  <p className="text-[11px] text-slate-500">48 cores utilized out of 112 dedicated vCPUs</p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300 flex items-center gap-2"><HardDrive className="w-4 h-4 text-emerald-400" /> RAM Consumption</span>
                    <span className="text-sm font-bold text-white">68%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-[11px] text-slate-500">174.08 GB active in cached memory buffers</p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300 flex items-center gap-2"><Activity className="w-4 h-4 text-amber-400" /> Edge Bandwidth</span>
                    <span className="text-sm font-bold text-white">2.4 TB</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '24%' }}></div>
                  </div>
                  <p className="text-[11px] text-slate-500">24% of 10 TB high-speed monthly tier consumed</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEAM & ACCESS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Team & Access Control</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage privileged access tokens and organization members.</p>
                </div>
                <button 
                  onClick={() => setInviteModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" /> Invite Team Member
                </button>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Member</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Security</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredTeam.length > 0 ? (
                      filteredTeam.map((member) => (
                        <tr key={member.id} className="hover:bg-slate-850/50 transition">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-400">
                                {member.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-white">{member.name}</p>
                                <p className="text-slate-500 text-[11px]">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200">
                              {member.role}
                            </span>
                          </td>
                          <td className="p-4">
                            {member.twoFactor ? (
                              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                                <Shield className="w-3.5 h-3.5" /> 2FA Enabled
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[11px]">Pending Setup</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                              {member.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => setEditingMember(member)}
                              className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs px-2 py-1 rounded hover:bg-slate-800 transition"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-6 text-center text-slate-500 text-xs">
                          No team members matching "<span className="text-slate-300">{searchQuery}</span>"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Billing & Subscription</h1>
                <p className="text-xs text-slate-400 mt-1">Manage infrastructure payment tiers and review verified invoices.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <p className="text-xs text-slate-400">Current Assigned Plan</p>
                      <h3 className="text-xl font-bold text-white mt-0.5">Enterprise Dedicated Cluster</h3>
                    </div>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold w-fit">
                      Auto-renews Oct 2026
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Monthly Usage Cycle</span>
                      <span className="text-white font-semibold">$99.00 / $250.00 Limit</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => showToast('Redirecting to payment gateway integration...')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition">Update Payment Method</button>
                    <button onClick={() => showToast('Plan modification panel unlocked.')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition">Change Plan Tier</button>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Payment Method</h3>
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-slate-900 text-indigo-400"><CreditCard className="w-5 h-5" /></div>
                      <div>
                        <p className="text-xs font-semibold text-white">Mastercard ending in 4092</p>
                        <p className="text-[10px] text-slate-500">Expires 11/28</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-semibold">Default</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Invoices are processed automatically on the 1st of every month.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* EDIT MEMBER MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setEditingMember(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Edit Member Role</h3>
            <p className="text-xs text-slate-400 mb-4">Modify access level and privileges for {editingMember.name}.</p>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input 
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Assigned Role</label>
                <select 
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Owner / Admin">Owner / Admin</option>
                  <option value="DevOps Lead">DevOps Lead</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Security Auditor">Security Auditor</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Account Status</label>
                <select 
                  value={editingMember.status}
                  onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Pending Invite">Pending Invite</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition shadow-lg shadow-indigo-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVITE MEMBER MODAL */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setInviteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Invite Team Member</h3>
            <p className="text-xs text-slate-400 mb-4">Send a secure organization access invitation link.</p>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. David Miller"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Corporate Email</label>
                <input 
                  type="email"
                  placeholder="david@company.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Role & Privilege</label>
                <select 
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="DevOps Lead">DevOps Lead</option>
                  <option value="Security Auditor">Security Auditor</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition shadow-lg shadow-indigo-600/20"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function SparkleIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-indigo-400 inline" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
    </svg>
  );
}