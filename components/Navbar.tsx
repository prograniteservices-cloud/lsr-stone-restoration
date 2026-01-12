import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-black border-b border-zinc-900 sticky top-0 z-50">
      <div className="text-2xl font-black tracking-tighter text-white uppercase italic">
        PRO-GRANITE <span className="text-amber-500">SERVICES</span>
      </div>
      
      <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        <a href="#about" className="hover:text-white transition-colors">About Us</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>

      <div className="flex gap-4">
        <button className="bg-amber-500 text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
          Free Estimate
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
