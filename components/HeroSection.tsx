import React, { useState } from 'react';

const HeroSection = () => {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState('');
  const [sqFt, setSqFt] = useState('');
  const [stone, setStone] = useState('Granite');
  const [estimate, setEstimate] = useState(null);

  const serviceZips = ['29102', '29150', '29154', '29040', '29153'];

  const handleCheckZip = (e) => {
    e.preventDefault(); 
    if (serviceZips.includes(zip)) {
      setStatus('✅ Artisan Available in your area!');
    } else {
      setStatus('❌ Outside current area.');
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const price = stone === 'Marble' ? 25 : stone === 'Quartz' ? 12 : 15;
    const total = parseInt(sqFt) * price;
    setEstimate(isNaN(total) ? 0 : total);
  };

  return (
    <div className="py-20 bg-black text-white px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
          Master-Crafted <br/><span className="text-amber-500">Preservation</span>
        </h1>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-10">
          <input 
            type="text" 
            placeholder="Zip Code" 
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="p-4 bg-zinc-900 border border-zinc-800 text-white w-full md:w-64 outline-none rounded"
          />
          <button 
            type="button"
            onClick={handleCheckZip} 
            className="bg-amber-500 text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-white transition-all">
            Check
          </button>
        </div>
        {status && <p className="text-amber-500 font-bold mt-4 uppercase text-sm">{status}</p>}
      </div>

      <div id="calculator" className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
        <h2 className="text-2xl font-black mb-6 text-white tracking-tighter uppercase text-center">Project Estimator</h2>
        <div className="grid grid-cols-2 gap-4 mb-6 text-left">
          <div>
            <label className="text-[10px] text-zinc-500 uppercase font-bold">Material</label>
            <select 
              value={stone} 
              onChange={(e) => setStone(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded text-white text-sm">
              <option value="Granite">Granite</option>
              <option value="Marble">Marble</option>
              <option value="Quartz">Quartz</option>
            </select>
          </div>
          <div>
             <label className="text-[10px] text-zinc-500 uppercase font-bold">Square Feet</label>
             <input 
              type="number" 
              placeholder="0" 
              value={sqFt}
              onChange={(e) => setSqFt(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded text-white text-sm" 
            />
          </div>
        </div>
        <button 
          type="button"
          onClick={handleCalculate}
          className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs">
          Get Estimate
        </button>

        {estimate !== null && (
          <div className="mt-6 text-center border-t border-zinc-800 pt-6">
            <p className="text-4xl font-black text-amber-500 mt-1">$ {estimate.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
