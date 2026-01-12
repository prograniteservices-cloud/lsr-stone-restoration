import React, { useState, useEffect } from 'react';
import { Menu, X, Check, ArrowRight, Search, Phone, Mail, MapPin, Users, HeartHandshake, ChevronDown } from 'lucide-react';
import HeroAnimation from './components/HeroAnimation';
import AIAnalyzer from './components/AIAnalyzer';
import SavingsCalculator from './components/SavingsCalculator';
import { ClientDashboard, ContractorDashboard } from './components/Dashboards';
import ElevenLabsWidget from './components/ElevenLabsWidget';
import { FAQS, COMPANY_INFO } from './constants';
import { UserRole } from './types';

// Extended routing for new pages
type View = 'landing' | 'login' | 'signup' | 'about' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    if (['XXXXX', '90210', '10001'].includes(zipCode)) {
      setZipResult('found');
    } else {
      setZipResult('waitlist');
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setView('landing'); // Re-renders main view but with different dashboard content
    if (newView === "landing") window.scrollTo(0,0);
  };

  const navigateTo = (newView: View) => {
    setView(newView);
    setIsMobileMenuOpen(false);
    if (newView === "landing") window.scrollTo(0,0);
  };

  // --- Render Conditional Logic for Dashboards ---

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

  // --- Sub-View Components (Login, About, Contact) ---

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

  const renderHeader = () => (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen || view !== 'landing' ? 'py-4 bg-obsidian/95 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => navigateTo('landing')} className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-white z-50 flex items-center gap-2">
            Pro-Granite<span className="hidden md:inline"> Services</span><span className="text-gold">.</span>
          </button>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button onClick={() => navigateTo('about')} className={`hover:text-gold transition-colors ${view === 'about' ? 'text-gold' : 'text-gray-300'}`}>About Us</button>
            <button onClick={() => navigateTo('landing')} className="hover:text-gold transition-colors text-gray-300">Visual AI</button>
            <button onClick={() => navigateTo('landing')} className="hover:text-gold transition-colors text-gray-300">Calculator</button>
            <button onClick={() => navigateTo('contact')} className={`hover:text-gold transition-colors ${view === 'contact' ? 'text-gold' : 'text-gray-300'}`}>Contact</button>
          </nav>

          <div className="flex items-center gap-3 z-50">
            {/* 2 Call to Actions */}
            <button onClick={() => navigateTo('contact')} className="hidden md:block px-5 py-2 text-sm text-obsidian bg-gold font-bold rounded-full hover:bg-white transition-all">
              Free Estimate
            </button>
            <button onClick={() => setView('login')} className="hidden md:block px-5 py-2 text-sm text-gold border border-gold/30 rounded-full hover:bg-gold hover:text-black transition-all">
              Portal Access
            </button>

            <button 
              className="lg:hidden text-gray-200 hover:text-gold transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 w-full h-screen bg-obsidian/98 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in z-40">
            <nav className="flex flex-col gap-6 items-center text-center">
              <button onClick={() => navigateTo('about')} className="text-3xl font-serif text-white hover:text-gold transition-colors">About Us</button>
              <button onClick={() => navigateTo('landing')} className="text-3xl font-serif text-white hover:text-gold transition-colors">Visual AI</button>
              <button onClick={() => navigateTo('landing')} className="text-3xl font-serif text-white hover:text-gold transition-colors">Calculator</button>
              <button onClick={() => navigateTo('contact')} className="text-3xl font-serif text-white hover:text-gold transition-colors">Contact Us</button>
              
              <div className="w-16 h-[1px] bg-white/10 my-4"></div>
              
              <button 
                onClick={() => { setIsMobileMenuOpen(false); navigateTo('contact'); }} 
                className="px-8 py-3 text-lg text-obsidian bg-gold font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Free Estimate
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setView('login'); }} 
                className="px-8 py-3 text-lg text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all"
              >
                Portal Access
              </button>
            </nav>
          </div>
        )}
      </header>
  );

  const renderFooter = () => (
    <footer className="bg-black py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <div className="text-white font-serif text-2xl font-bold mb-4">Pro-Granite<span className="text-gold">.</span></div>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
             Master-crafted stone restoration and preservation. <br/>
             Honoring the legacy of the artisan.
          </p>
          <div className="text-gray-600 text-xs">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. <br/>All Rights Reserved.
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
          <h4 className="text-white font-serif text-lg mb-2">Contact</h4>
          <div className="flex items-start gap-3">
             <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
             <span>{COMPANY_INFO.address}</span>
          </div>
          <div className="flex items-center gap-3">
             <Phone className="w-4 h-4 text-gold flex-shrink-0" />
             <span>{COMPANY_INFO.phone}</span>
          </div>
          <div className="flex items-center gap-3">
             <Mail className="w-4 h-4 text-gold flex-shrink-0" />
             <span>{COMPANY_INFO.email}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
          <h4 className="text-white font-serif text-lg mb-2">Navigation</h4>
          <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About Our Legacy</button>
          <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Request Service</button>
          <button onClick={() => setView('login')} className="hover:text-white transition-colors">Artisan Network Apply</button>
        </div>
      </div>
    </footer>
  );

  if (view === 'about') {
    return (
      <div className="bg-obsidian min-h-screen font-sans text-gray-200">
        {renderHeader()}
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-block px-3 py-1 mb-6 border border-gold/30 rounded-full text-gold text-xs font-bold uppercase tracking-widest bg-gold/5">
                Our Legacy
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">
                Stone is in <br/> <span className="text-gold italic">Our Blood.</span>
              </h1>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                We know that choosing a restoration partner is a big step. It requires trust, precision, and a deep respect for the material. 
              </p>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                I bring over <span className="text-white font-bold">{COMPANY_INFO.experience.own} years</span> of personal experience to every project. But my education started long before that. I learned the art of stone from my father, a master craftsman with <span className="text-white font-bold">{COMPANY_INFO.experience.father} years</span> of experience. 
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Combined, that's 65 years of hands-on knowledge passed down through generations. We aren't just contractors; we are friends to the stone and partners to our clients. We make the complex process of restoration feel simple, transparent, and unintimidating.
              </p>
              
              <div className="mt-10 flex gap-8">
                <div className="flex flex-col">
                   <span className="text-4xl font-serif text-white font-bold">{COMPANY_INFO.experience.father + COMPANY_INFO.experience.own}+</span>
                   <span className="text-xs text-gold uppercase tracking-widest mt-1">Years Combined Exp.</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-4xl font-serif text-white font-bold">100%</span>
                   <span className="text-xs text-gold uppercase tracking-widest mt-1">Family Owned</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 transform rotate-3 rounded-2xl"></div>
              <div className="relative bg-charcoal p-2 rounded-2xl border border-white/10 shadow-2xl">
                 <img src="https://picsum.photos/800/1000?grayscale" alt="Craftsman working" className="w-full h-auto rounded-xl grayscale opacity-80 hover:opacity-100 transition-opacity duration-500" />
                 <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded border-l-4 border-gold">
                   <p className="text-white font-serif italic">"We treat every slab of marble and granite as if it were in our own home."</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
             <h2 className="text-3xl font-serif text-white mb-6">Ready to restore your investment?</h2>
             <p className="text-gray-400 max-w-2xl mx-auto mb-8">
               Don't let chips, cracks, or dullness diminish the value of your property. 
               Leverage our family's expertise for a fraction of the replacement cost.
             </p>
             <button onClick={() => navigateTo('contact')} className="px-8 py-3 bg-gold text-obsidian font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Talk to an Expert
             </button>
          </div>
        </div>
        {renderFooter()}
        <ElevenLabsWidget />
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="bg-obsidian min-h-screen font-sans text-gray-200">
        {renderHeader()}
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Get in Touch</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Whether you are a property manager needing a portfolio quote or a homeowner with a single chip, we are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Contact Info Cards */}
             <div className="lg:col-span-1 space-y-6">
                <div className="bg-charcoal border border-white/10 p-6 rounded-xl hover:border-gold/30 transition-colors">
                   <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                      <Phone className="text-gold w-6 h-6" />
                   </div>
                   <h3 className="text-white font-medium text-lg mb-1">Phone</h3>
                   <p className="text-gray-400 text-sm mb-2">Mon-Fri from 8am to 6pm.</p>
                   <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-gold transition-colors font-mono">{COMPANY_INFO.phone}</a>
                </div>

                <div className="bg-charcoal border border-white/10 p-6 rounded-xl hover:border-gold/30 transition-colors">
                   <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                      <Mail className="text-gold w-6 h-6" />
                   </div>
                   <h3 className="text-white font-medium text-lg mb-1">Email</h3>
                   <p className="text-gray-400 text-sm mb-2">Send us photos of your damage.</p>
                   <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-gold transition-colors font-mono break-all">{COMPANY_INFO.email}</a>
                </div>

                <div className="bg-charcoal border border-white/10 p-6 rounded-xl hover:border-gold/30 transition-colors">
                   <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="text-gold w-6 h-6" />
                   </div>
                   <h3 className="text-white font-medium text-lg mb-1">Headquarters</h3>
                   <p className="text-gray-400 text-sm mb-2">Pro-Granite Services L.L.C.</p>
                   <p className="text-white font-mono text-sm w-3/4">{COMPANY_INFO.address}</p>
                </div>
             </div>

             {/* Form */}
             <div className="lg:col-span-2 bg-charcoal border border-white/5 p-8 rounded-2xl">
                <h3 className="text-3xl font-serif font-bold tracking-[0.25em] text-white mb-6">Send us a Message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm text-gray-400 uppercase tracking-wider">First Name</label>
                         <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm text-gray-400 uppercase tracking-wider">Last Name</label>
                         <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors" placeholder="Doe" />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">Email</label>
                      <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors" placeholder="jane@example.com" />
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">Service Needed</label>
                      <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors">
                         <option>General Inquiry</option>
                         <option>Countertop Repair</option>
                         <option>Floor Polishing</option>
                         <option>Commercial Maintenance</option>
                         <option>Artisan Application</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm text-gray-400 uppercase tracking-wider">Message</label>
                      <textarea rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-gold outline-none transition-colors" placeholder="Tell us about your stone..."></textarea>
                   </div>

                   <button className="w-full py-4 bg-gold text-obsidian font-bold rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      Send Request
                   </button>
                </form>
             </div>
          </div>
        </div>
        {renderFooter()}
        <ElevenLabsWidget />
      </div>
    );
  }

  // --- Landing Page ---

  return (
    <div className="bg-obsidian min-h-screen font-sans text-gray-200 overflow-x-hidden selection:bg-gold selection:text-black">
      
      {renderHeader()}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover animate-pulse-slow scale-110 opacity-30 z-0"><source src="/granite-bg.mp4" type="video/mp4" /></video>
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
            Pro-Granite Services connects you with elite artisans utilizing AI-driven diagnostics to restore, not replace, the world's finest architectural stone.
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
             <button onClick={() => setView('contact')} className="px-8 py-3 bg-gold text-obsidian font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2">
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
      <section id="network" className="py-24 px-6 bg-charcoal">
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

      {renderFooter()}

      {/* AI Agent */}
      <ElevenLabsWidget />
    </div>
  );
};

export default App;
