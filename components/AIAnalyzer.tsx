import React, { useState, useEffect } from 'react';
import { Upload, Scan, Activity, ArrowRight } from 'lucide-react';

const AIAnalyzer: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('Initializing Sensor Array...');
  const [result, setResult] = useState<'idle' | 'success'>('idle');

  const scanStages = [
    { threshold: 10, message: 'Mapping Surface Topology...' },
    { threshold: 30, message: 'Detecting Micro-fractures...' },
    { threshold: 60, message: 'Analyzing Mineral Composition...' },
    { threshold: 85, message: 'Calculating Structural Integrity...' },
    { threshold: 95, message: 'Finalizing Feasibility Score...' },
  ];

  const handleSimulateScan = () => {
    if (isScanning || result === 'success') return;
    setIsScanning(true);
    setProgress(0);
    setResult('idle');
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResult('idle');
    setIsScanning(false);
    setProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setResult('success');
            return 100;
          }
          // Find current message based on progress
          const stage = scanStages.find(s => prev < s.threshold && prev + 2 >= s.threshold);
          if (stage) setScanMessage(stage.message);
          return prev + 1;
        });
      }, 40); // Scan duration approx 4s
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="w-full max-w-md mx-auto relative group cursor-pointer select-none" onClick={result === 'idle' ? handleSimulateScan : undefined}>
      {/* Container - Glassmorphic look with architectural borders */}
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-charcoal border border-white/10 group-hover:border-gold/50 transition-all duration-500 shadow-2xl">
        
        {/* Placeholder Image (Kitchen Detail) */}
        <img 
          src="https://picsum.photos/800/600?grayscale" 
          alt="Stone Surface" 
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out 
            ${isScanning ? 'scale-105 opacity-40 blur-sm' : result === 'success' ? 'opacity-20 scale-100 blur-xl' : 'opacity-70 group-hover:opacity-50'}`}
        />

        {/* Initial State */}
        {!isScanning && result === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in z-20">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-charcoal to-black flex items-center justify-center border border-white/10 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 relative z-10">
                <Upload className="text-gray-400 group-hover:text-gold w-8 h-8 transition-colors duration-300" />
              </div>
            </div>
            
            <h4 className="text-white font-serif text-2xl tracking-wide mb-2 group-hover:text-gold transition-colors">AI Visual Diagnosis</h4>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-gray-600 group-hover:bg-gold/50 transition-colors"></div>
              <p className="text-gray-500 text-[10px] font-mono tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                Click to Initialize
              </p>
              <div className="h-[1px] w-8 bg-gray-600 group-hover:bg-gold/50 transition-colors"></div>
            </div>
          </div>
        )}

        {/* Scanning State */}
        {isScanning && (
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 bg-black/40">
             {/* Technical Overlay */}
             <div className="absolute inset-0 pointer-events-none">
                 {/* Moving Scan Line */}
                 <div className="w-full h-[2px] bg-gold shadow-[0_0_25px_rgba(212,175,55,1)] animate-scan absolute top-0 left-0 z-10 opacity-80"></div>
                 {/* Technical Grid Pattern */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
             </div>

             {/* Top Status Bar */}
             <div className="flex justify-between items-center text-[10px] font-mono text-gold/80 border-b border-gold/10 pb-2">
                <span className="flex items-center gap-2">
                    <Activity className="w-3 h-3 animate-pulse" /> 
                    <span className="tracking-widest">LIVE_ANALYSIS</span>
                </span>
                <span className="tracking-widest">ID: SRV-882</span>
             </div>

             {/* Center Dynamic Message */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-4">
                 <div className="bg-black/60 backdrop-blur-md border border-gold/20 py-3 px-6 rounded-sm inline-block shadow-lg">
                    <p className="text-gold font-mono text-xs tracking-wider animate-pulse uppercase">
                        {scanMessage}
                    </p>
                 </div>
             </div>

             {/* Bottom Progress UI */}
             <div className="w-full relative z-20">
                 <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-2 uppercase tracking-wider">
                    <span>Progress</span>
                    <span className="text-gold">{Math.round(progress)}%</span>
                 </div>
                 {/* Progress Bar Container */}
                 <div className="h-1 w-full bg-gray-800/50 rounded-full overflow-hidden border border-white/5">
                     <div 
                        className="h-full bg-gradient-to-r from-gold-dim to-gold shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all duration-75 ease-out" 
                        style={{ width: `${progress}%` }}
                     ></div>
                 </div>
             </div>
          </div>
        )}

        {/* Success / Result State */}
        {result === 'success' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-black/60 backdrop-blur-md">
            {/* Reset/Close Button */}
            <div className="absolute top-4 right-4">
                <button 
                    onClick={reset}
                    className="p-2 text-gray-500 hover:text-white transition-colors hover:rotate-90 duration-300"
                >
                    <Scan className="w-5 h-5" />
                </button>
            </div>

            {/* Score Hero */}
            <div className="mb-8 relative transform transition-all duration-700 hover:scale-105">
                 <div className="absolute -inset-8 bg-gold/10 blur-3xl rounded-full animate-pulse-slow"></div>
                 <h2 className="text-7xl font-serif text-gold font-medium relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                     94
                     <span className="text-2xl text-white/30 ml-1 font-sans font-light">/100</span>
                 </h2>
                 <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-2 mb-2"></div>
                 <p className="text-white/80 text-[10px] font-mono uppercase tracking-[0.3em]">Restoration Feasibility</p>
            </div>

            {/* Data Points */}
            <div className="w-full grid grid-cols-2 gap-3 mb-8">
                <div className="bg-white/5 border border-white/10 p-3 rounded hover:border-gold/30 transition-colors">
                    <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Structural Integrity</div>
                    <div className="text-white font-serif text-lg tracking-wide">Excellent</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded hover:border-gold/30 transition-colors">
                    <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">Visual Match</div>
                    <div className="text-white font-serif text-lg tracking-wide">~98.5%</div>
                </div>
            </div>

            {/* CTA */}
            <button className="group w-full py-3 bg-gold hover:bg-white text-obsidian font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
               Request Priority Quote
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalyzer;