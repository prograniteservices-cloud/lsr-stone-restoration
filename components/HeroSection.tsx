import React, { useState } from 'react';

const HeroSection = () => {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState('');
  const serviceZips = ['29102', '29150', '29154', '29040', '29153'];

  const checkZip = () => {
    if (serviceZips.includes(zip)) {
      setStatus('✅ Artisan Available in your area!');
    } else {
      setStatus('❌ Outside current area. Join the waitlist?');
    }
  };

  return (
    <div className="py-20 text-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-6 tracking-tighter">The Art of Master-Crafted Preservation.</h1>
      <div className="flex justify-center gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Enter Zip Code" 
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="p-3 rounded bg-zinc-900 border border-zinc-700 text-white w-64"
        />
        <button onClick={checkZip} className="bg-amber-500 text-black px-6 py-3 font-bold rounded hover:bg-amber-400">
          Check Availability
        </button>
      </div>
      {status && <p className="text-amber-500 font-medium animate-pulse">{status}</p>}
      
      <div className="mt-20 p-8 border-t border-zinc-800">
        <h2 className="text-2xl font-semibold mb-4 text-zinc-400">AI Restoration Calculator</h2>
        <div className="bg-zinc-900 p-6 rounded-xl inline-block border border-zinc-800">
           <p className="text-sm text-zinc-500">Calculator Interface Restored: Ready for Logic...</p>
           <div className="mt-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded">
             System Online
           </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
