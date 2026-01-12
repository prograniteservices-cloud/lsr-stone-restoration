import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-black border-b border-zinc-900 sticky top-0 z-50">
      <div className="text-xl font-bold tracking-tighter text-white">PRO-GRANITE <span className="text-amber-500">SERVICES</span></div>
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#calculator" className="hover:text-amber-500 transition-colors font-bold">Calculator</a>
        <a href="#artisan" className="hover:text-white transition-colors">Artisans</a>
      </div>
      <button className="bg-white text-black px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all">
        Free Estimate
      </button>
    </nav>
  );
};

export default Navbar;
