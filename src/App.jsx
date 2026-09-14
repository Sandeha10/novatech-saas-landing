import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Star, 
  Menu, 
  X 
} from 'lucide-react';

export default function App() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
            <button className="text-sm font-medium hover:text-white text-slate-300 transition">Sign In</button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition">
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-slate-900 border-b border-slate-800 space-y-3">
            <a href="#features" className="block text-slate-300 hover:text-white">Features</a>
            <a href="#pricing" className="block text-slate-300 hover:text-white">Pricing</a>
            <a href="#testimonials" className="block text-slate-300 hover:text-white">Reviews</a>
            <button className="w-full mt-2 py-2 bg-indigo-600 text-white font-semibold rounded-lg">Get Started</button>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <SparkleIcon /> Next-Gen Platform
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Supercharge your workflow with modern intelligence.
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
          Manage operations, analyze metrics in real-time, and scale your digital applications seamlessly on one platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 font-semibold rounded-xl transition">
            Book Live Demo
          </button>
        </div>

        {/* App Mockup Card Preview */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 p-3 shadow-2xl backdrop-blur">
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
          <p className="mt-3 text-slate-400">Everything needed to optimize and scale your cloud operations effortlessly.</p>
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

      {/* 4. Pricing Section with Toggle */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">Simple, transparent pricing</h2>
          <p className="mt-3 text-slate-400">Choose the plan that best fits your business goals.</p>
          
          {/* Toggle Button */}
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
          {/* Starter Plan */}
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
            <button className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition">
              Get Started
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
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
            <button className="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
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
            <button className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section id="testimonials" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">Trusted by founders worldwide</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "Migrating our dashboard here cut our deployment friction drastically.", author: "Alex Reed", role: "CTO, CloudScale" },
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
      <footer className="border-t border-slate-850 py-10 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4">
        <p>© 2026 NovaTech Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Security</a>
        </div>
      </footer>
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