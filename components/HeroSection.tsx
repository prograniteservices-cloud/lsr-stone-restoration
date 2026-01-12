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
    <div className="py-20 bg-black text-white">
      <div className="text-center mb-16">
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
      </div>
      
      {/* THIS IS THE TARGET FOR THE NAVBAR BUTTON */}
      <div id="calculator" className="mt-20 p-12 border-t border-zinc-800 bg-zinc-950 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white tracking-tighter">AI Restoration Calculator</h2>
        <div className="bg-zinc-900 p-8 rounded-2xl inline-block border border-zinc-800 shadow-2xl max-w-xl w-full">
           <div className="grid grid-cols-2 gap-4 mb-6 text-left">
             <div>
               <label className="text-xs uppercase text-zinc-500 font-bold">Stone Type</label>
               <select className="w-full bg-black border border-zinc-700 p-2 rounded mt-1">
                 <option>Granite</option>
                 <option>Marble</option>
                 <option>Quartz</option>
               </select>
             </div>
             <div>
               <label className="text-xs uppercase text-zinc-500 font-bold">Sq Footage</label>
               <input type="number" placeholder="e.g. 50" className="w-full bg-black border border-zinc-700 p-2 rounded mt-1" />
             </div>
           </div>
           <button className="w-full py-4 bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all">
             Calculate Estimate
           </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
