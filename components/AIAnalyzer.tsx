import React, { useState } from 'react';
import { Upload, Scan, CheckCircle, AlertTriangle } from 'lucide-react';

const AIAnalyzer: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<'idle' | 'success'>('idle');

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setResult('success');
    }, 2500);
  };

  const reset = () => {
    setResult('idle');
    setIsScanning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto relative group cursor-pointer" onClick={result === 'idle' ? handleSimulateScan : reset}>
      {/* Container */}
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-charcoal border-2 border-dashed border-gray-700 group-hover:border-gold transition-colors duration-300">
        
        {/* Placeholder Image (Kitchen Detail) */}
        <img 
          src="https://picsum.photos/800/600?grayscale" 
          alt="Stone Surface" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isScanning || result === 'success' ? 'opacity-40' : 'opacity-80'}`}
        />

        {/* Initial State */}
        {!isScanning && result === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform">
              <Upload className="text-gold w-8 h-8" />
            </div>
            <h4 className="text-white font-serif text-lg">AI Visual Diagnosis</h4>
            <p className="text-gray-400 text-xs text-center px-8 mt-2">
              Drag & Drop photo of damage or click to simulate analysis.
            </p>
          </div>
        )}

        {/* Scanning State */}
        {isScanning && (
          <div className="absolute inset-0">
            <div className="w-full h-1 bg-gold/80 shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-scan absolute top-0 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gold font-mono text-sm bg-black/80 px-4 py-2 rounded border border-gold/30">
                ANALYZING FRACTURE DEPTH...
              </div>
            </div>
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
        )}

        {/* Result State */}
        {result === 'success' && (
          <div className="absolute inset-0 bg-black/80 p-6 flex flex-col justify-between animate-fade-in">
            <div className="flex justify-between items-start">
               <div className="flex items-center gap-2">
                 <Scan className="text-gold w-5 h-5" />
                 <span className="text-xs font-mono text-gold">SC-8821 DETECTED</span>
               </div>
               <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded border border-green-800">Repairable</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Structural Integrity</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[92%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Surface Continuity</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[45%]"></div>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded border border-white/10 mt-2">
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="text-gold font-semibold">Diagnosis:</span> Grade II Chip with minor spider-webbing. Resin injection recommended.
                </p>
              </div>
            </div>

            <button className="w-full py-2 bg-gold hover:bg-white text-obsidian font-bold text-sm uppercase tracking-wider transition-colors mt-2">
              Get Quote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyzer;
