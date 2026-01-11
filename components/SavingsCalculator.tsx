import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const SavingsCalculator: React.FC = () => {
  const [squareFootage, setSquareFootage] = useState(100);
  
  // Constants for calculation
  const REPLACEMENT_COST_PER_SQFT = 150; // High end stone
  const RESTORATION_COST_PER_SQFT = 25; // Polishing/Repair

  const replacementCost = useMemo(() => squareFootage * REPLACEMENT_COST_PER_SQFT, [squareFootage]);
  const restorationCost = useMemo(() => squareFootage * RESTORATION_COST_PER_SQFT, [squareFootage]);
  const savings = replacementCost - restorationCost;
  const roi = Math.round((savings / restorationCost) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        <div className="flex-1 w-full space-y-6">
          <h3 className="text-2xl font-serif text-white">Comparative Savings Calculator</h3>
          <p className="text-gray-400 text-sm">Estimate the ROI of restoration versus full tear-out and replacement.</p>
          
          <div className="space-y-2">
            <label className="text-gold text-sm font-semibold uppercase tracking-wider">Surface Area (Sq. Ft)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="20" 
                max="1000" 
                value={squareFootage} 
                onChange={(e) => setSquareFootage(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <span className="text-white font-mono w-16 text-right">{squareFootage}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-red-900/20 border border-red-900/50">
              <span className="block text-xs text-red-300 uppercase">Replacement Cost</span>
              <span className="text-xl font-bold text-white">${replacementCost.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-lg bg-green-900/20 border border-green-900/50">
              <span className="block text-xs text-green-300 uppercase">LSR Repair Cost</span>
              <span className="text-xl font-bold text-white">${restorationCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div className="relative w-64 h-64 rounded-full border-4 border-gold/20 flex flex-col items-center justify-center bg-black/40">
            <div className="absolute inset-0 border-4 border-gold rounded-full border-t-transparent animate-spin duration-[10000ms]"></div>
            <TrendingUp className="w-10 h-10 text-gold mb-2" />
            <span className="text-4xl font-serif text-white font-bold">{roi}%</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">ROI</span>
            <div className="mt-4 px-4 py-1 bg-gold text-obsidian text-xs font-bold rounded-full">
              Save ${savings.toLocaleString()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SavingsCalculator;
