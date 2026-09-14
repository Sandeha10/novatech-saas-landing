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
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Auth states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [user, setUser] = useState(null); // { name, email }

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormError('Please fill in all required fields.');
      return;
    }

    // Authenticate user (Demo state simulation)
    const loggedUser = {
      name: authMode === 'signup' ? formData.name || 'Sandeha' : 'Sandeha Weerasingha',
      email: formData.email
    };

    setUser(loggedUser);
    setAuthModalOpen(false);
    setFormError('');
    setFormData({ name: '', email: '', password: '' });
    setCurrentView('dashboard');
  };

  const handleDemoLogin = () => {
    setUser({
      name: 'Demo User',
      email: 'demo@novatech.io'
    });
    setAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* View 1: Dashboard View */}
      {currentView === 'dashboard' && user ? (
        <Dashboard user={user} onLogout={handleLogout} onGoHome={() => setCurrentView('landing')} />
      ) : (
        /* View 2: Landing Page View */
        <>
          {/* 1. Navbar */}
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
                      <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                    </button>
                    <button 
                      onClick={handleLogout}
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

            {/* Mobile Dropdown */}
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

          {/* 2. Hero Section */}
          <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <SparkleIcon /> Next-Gen Cloud Operations
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Supercharge your workflow with modern intelligence.
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Manage infrastructure, monitor business metrics in real-time, and scale digital applications seamlessly on one platform.
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

            {/* Interactive Preview Mockup */}
            <div 
              onClick={handleDemoLogin}
              className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 p-3 shadow-2xl backdrop-blur group cursor-pointer hover:border-indigo-500/60 transition"
              title="Click to launch interactive app"
            >
              <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-md bg-indigo-600/90 text-xs font-semibold text-white shadow">
                Interactive Preview (Click to Launch)
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-6 sm:p-10 flex flex-col items-center justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-xs text-slate-400">Total Revenue</p>
                    <p className="text-2xl font-bold mt-1 text-white">$48,250.00</p>
                    <p className="text-xs text-emerald-400 mt-2">↑ +14.2% from last month</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-xs text-slate-400">Active Deployments</p>
                    <p className="text-2xl font-bold mt-1 text-white">1,280</p>
                    <p className="text-xs text-indigo-400 mt-2">99.98% uptime SLA</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <p className="text-xs text-slate-400">Conversion Rate</p>
                    <p className="text-2xl font-bold mt-1 text-white">4.8%</p>
                    <p className="text-xs text-emerald-400 mt-2">↑ +2.1% performance</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Features Section */}
          <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white">Built for performance & speed</h2>
              <p className="mt-3 text-slate-400">Everything needed to optimize and scale your operations effortlessly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ultra Fast Response</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Engineered with optimized infrastructure delivering sub-millisecond edge latency worldwide.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Bank-Grade Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enterprise encryption protocols with end-to-end access validation for sensitive records.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Deep Analytics</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Interactive metrics and visual reporting dashboards providing instant business intelligence.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Pricing Section */}
          <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white">Simple, transparent pricing</h2>
              <p className="mt-3 text-slate-400">Choose the plan that best fits your business goals.</p>
              
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
                  <p className="text-slate-400 text-sm mt-1">For freelancers & solo creators</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${isAnnual ? '15' : '19'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Up to 5 projects</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Basic metrics dashboard</li>
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
                  POPULAR
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">Professional</h3>
                  <p className="text-slate-400 text-sm mt-1">For growing businesses & teams</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${isAnnual ? '39' : '49'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited projects</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Real-time tracking charts</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority 24/7 support</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom domain integration</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition"
                >
                  Start Free Trial
                </button>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Enterprise</h3>
                  <p className="text-slate-400 text-sm mt-1">Dedicated setup & custom limits</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${isAnnual ? '79' : '99'}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated account manager</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom API integration</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 99.99% Guaranteed SLA</li>
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

          {/* 5. Reviews */}
          <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white">Trusted by founders worldwide</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "NovaTech streamlined our cloud deployment friction drastically.", author: "Alex Reed", role: "CTO, CloudScale" },
                { quote: "The interface responsiveness and clean structure are exceptional.", author: "Sarah Jenkins", role: "Product Designer" },
                { quote: "Fast, dependable, and built with modern architectural standards.", author: "Michael Chen", role: "Lead Engineer" }
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

          {/* 6. Footer */}
          <footer className="border-t border-slate-800/80 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4">
            <p>© 2026 NovaTech Platform. Developed with modern React & Tailwind CSS.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400">Documentation</a>
              <a href="#" className="hover:text-slate-400">API Status</a>
              <a href="#" className="hover:text-slate-400">Security</a>
            </div>
          </footer>
        </>
      )}

      {/* Auth Modal (Sign In / Sign Up) */}
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
                {authMode === 'signin' ? 'Sign in to access your platform dashboard' : 'Get started with a 14-day full free trial'}
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
                      placeholder="Sandeha Weerasingha"
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
                    placeholder="user@novatech.io"
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

            {/* Quick Demo Fill Button */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Recruiter or Client?</span>
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
    </div>
  );
}

// ---------------- Dashboard Component ----------------
function Dashboard({ user, onLogout, onGoHome }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <TrendingUp className="w-4 h-4" /> Live Analytics
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Users className="w-4 h-4" /> Team & Clients
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'billing' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <CreditCard className="w-4 h-4" /> Billing & Usage
            </button>
          </nav>
        </div>

        {/* User Card at bottom */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md hover:bg-slate-800 transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-950/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources, metrics..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onGoHome}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition"
            >
              ← Back to Landing
            </button>
            <div className="relative p-2 text-slate-400 hover:text-white cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-white">System Operations Overview</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time status of connected microservices and customer transactions.</p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">$48,250.00</p>
              <span className="inline-block mt-2 text-xs text-emerald-400 font-semibold">↑ +14.2%</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Active Instances</p>
              <p className="text-2xl font-bold text-white mt-1">1,280</p>
              <span className="inline-block mt-2 text-xs text-indigo-400 font-semibold">Operational</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Server Latency</p>
              <p className="text-2xl font-bold text-white mt-1">18ms</p>
              <span className="inline-block mt-2 text-xs text-emerald-400 font-semibold">Optimal</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-400">Monthly Run Rate</p>
              <p className="text-2xl font-bold text-white mt-1">$8,420</p>
              <span className="inline-block mt-2 text-xs text-slate-400 font-semibold">Pro Tier</span>
            </div>
          </div>

          {/* Table: Recent Activities */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Recent System Events</h3>
              <span className="text-[11px] text-slate-400">Live feed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Event ID</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3 font-mono text-slate-400">#EV-9021</td>
                    <td className="p-3 font-medium text-white">Database Migration</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">Completed</span></td>
                    <td className="p-3 text-slate-500">2 mins ago</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-slate-400">#EV-9020</td>
                    <td className="p-3 font-medium text-white">Stripe Webhook Sync</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">Success</span></td>
                    <td className="p-3 text-slate-500">14 mins ago</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-slate-400">#EV-9019</td>
                    <td className="p-3 font-medium text-white">SSL Certificate Renewal</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-semibold">Active</span></td>
                    <td className="p-3 text-slate-500">1 hour ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
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