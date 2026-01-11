import React, { useState, useEffect } from 'react';
import { Menu, X, Hammer, Star, ChevronDown, Check, ArrowRight, Search } from 'lucide-react';
import HeroAnimation from './components/HeroAnimation';
import AIAnalyzer from './components/AIAnalyzer';
import SavingsCalculator from './components/SavingsCalculator';
import { ClientDashboard, ContractorDashboard } from './components/Dashboards';
import ElevenLabsWidget from './components/ElevenLabsWidget';
import { FAQS } from './constants';
import { UserRole } from './types';

// Simple Auth & Router State for Demo
type View = 'landing' | 'login' | 'signup';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isScrolled, setIsScrolled] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [zipResult, setZipResult] = useState<'idle' | 'found' | 'waitlist'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleZipSearch = () => {
    if (zipCode.length < 5) return;
    // Mock Logic
    if (['90210', '10001', '33109'].includes(zipCode)) {
      setZipResult('found');
    } else {
      setZipResult('waitlist');
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setView('landing'); // Re-renders main view but with different dashboard content
    window.scrollTo(0,0);
  };

  // --- Render Conditional Logic ---

  if (userRole === 'client') {
    return (
      <>
        <ClientDashboard onLogout={() => setUserRole('guest')} />
        <ElevenLabsWidget />
      </>
    );
  }

  if (userRole === 'contractor') {
    return (
      <>
        <ContractorDashboard onLogout={() => setUserRole('guest')} />
        <ElevenLabsWidget />
      </>
    );
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-charcoal border border-white/10 p-8 rounded-2xl relative">
          <button onClick={() => setView('landing')} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X /></button>
          <h2 className="text-3xl font-serif text-white mb-8 text-center">Portal Access</h2>
          
          <div className="space-y-4">
             <button onClick={() => handleLogin('client')} className="w-full py-4 border border-white/20 hover:border-gold hover:bg-white/5 rounded-xl flex items-center justify-between px-6 transition-all group">
               <div className="text-left">
                 <span className="block text-white font-medium text-lg">Client Login</span>
                 <span className="text-gray-500 text-sm">Track your restoration</span>
               </div>
               <ArrowRight className="text-gray-500 group-hover:text-gold" />
             </button>
             
             <button onClick={() => handleLogin('contractor')} className="w-full py-4 border border-white/20 hover:border-gold hover:bg-white/5 rounded-xl flex items-center justify-between px-6 transition-all group">
               <div className="text-left">
                 <span className="block text-white font-medium text-lg">Artisan Login</span>
                 <span className="text-gray-500 text-sm">Access National Network</span>
               </div>
               <ArrowRight className="text-gray-500 group-hover:text-gold" />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Landing Page ---

  return (
    <div className="bg-obsidian min-h-screen font-sans text-gray-200 overflow-x-hidden selection:bg-gold selection:text-black">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-obsidian/80 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold tracking-tighter text-white">
            LSR<span className="text-gold">.</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#analyzer" className="hover:text-gold transition-colors">Visual AI</a>
            <a href="#calculator" className="hover:text-gold transition-colors">ROI Calculator</a>
            <a href="#network" className="hover:text-gold transition-colors">Artisans</a>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setView('login')} className="hidden md:block px-5 py-2 text-sm text-gold border border-gold/30 rounded-full hover:bg-gold hover:text-black transition-all">
              Portal Access
            </button>
            <Menu className="md:hidden w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/1920/1080?grayscale" alt="Luxury Kitchen" className="w-full h-full object-cover opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent"></div>
        </div>

        <HeroAnimation />

        <div className="relative z-10 text-center max-w-4xl px-4 mt-20">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            The Art of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">Master-Crafted</span> <br/>
            Preservation.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            A network of elite artisans utilizing AI-driven diagnostics to restore, not replace, the world's finest architectural stone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter Zip Code" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-gold outline-none w-64 backdrop-blur-sm"
                />
                <button onClick={handleZipSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-white">
                  <Search className="w-5 h-5" />
                </button>
             </div>
             <button className="px-8 py-3 bg-gold text-obsidian font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2">
               Check Availability
             </button>
          </div>
          
          {zipResult === 'found' && (
             <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded text-green-400 text-sm animate-fade-in inline-block">
               <Check className="w-4 h-4 inline mr-2"/> 3 Master Artisans Available in {zipCode}
             </div>
          )}
          
          {zipResult === 'waitlist' && (
             <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-800 rounded text-yellow-500 text-sm animate-fade-in inline-block">
               Priority Waitlist Activated for {zipCode}
             </div>
          )}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
          <ChevronDown />
        </div>
      </section>

      {/* AI Analyzer Section */}
      <section id="analyzer" className="py-24 px-6 bg-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
             <h2 className="text-4xl font-serif text-white mb-6">Precision Diagnosis. <br/><span className="text-gold italic">Instant Feasibility.</span></h2>
             <p className="text-gray-400 mb-8 text-lg leading-relaxed">
               Our proprietary AI analyzes fracture depth, particulate composition, and structural integrity to determine if a restoration will meet our "social invisibility" standard.
             </p>
             <ul className="space-y-4 mb-8">
               {[
                 'Scanning laser depth analysis',
                 'Granite, Marble, & Quartzite compatibility',
                 'Instant "Repair vs Replace" score'
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-300">
                   <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                     <Check className="w-3 h-3 text-gold" />
                   </div>
                   {item}
                 </li>
               ))}
             </ul>
           </div>
           
           <AIAnalyzer />
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 px-6 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">Capital Expenditure Logic</h2>
          <p className="text-gray-400">Why property managers prefer restoration.</p>
        </div>
        <SavingsCalculator />
      </section>

      {/* Social Proof & FAQs */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-white text-center mb-12">Common Inquiries</h2>
          
          <div className="grid gap-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
                <h3 className="text-gold font-serif text-xl mb-2">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-10 text-center">
            <h3 className="text-white font-serif text-2xl mb-8">Trusted by Property Management At</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
              {/* Mock Logos */}
              <div className="text-2xl font-bold font-serif tracking-widest">MARRIOTT</div>
              <div className="text-2xl font-bold font-serif tracking-widest">FOUR SEASONS</div>
              <div className="text-2xl font-bold font-serif tracking-widest">HILTON</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-serif text-2xl font-bold">LSR.</div>
          <div className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Luxury Stone Restoration. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white">Artisan Apply</a>
          </div>
        </div>
      </footer>

      {/* AI Agent */}
      <ElevenLabsWidget />
    </div>
  );
};

export default App;
