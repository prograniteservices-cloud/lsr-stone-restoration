import React from 'react';

const ContractorDashboard = () => {
  const leads = [
    { id: 1, zip: "29102", service: "Marble Polishing", value: ",200", distance: "5 miles" },
    { id: 2, zip: "29150", service: "Granite Repair", value: "50", distance: "18 miles" },
    { id: 3, zip: "29040", service: "Stone Sealing", value: ",100", distance: "24 miles" }
  ];

  return (
    <div className="p-8 bg-zinc-900 text-white rounded-xl border border-zinc-800 shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold tracking-tighter text-amber-500">Artisan Lead Portal</h2>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-zinc-800 hover:bg-red-900 transition-colors rounded text-sm">
          Sign Out
        </button>
      </div>
      
      <div className="space-y-4">
        {leads.map(lead => (
          <div key={lead.id} className="p-4 bg-zinc-800 rounded-lg border border-zinc-700 flex justify-between items-center hover:border-amber-500/50 transition-all">
            <div>
              <p className="text-sm text-zinc-400">Zip Code: <span className="text-white font-mono">{lead.zip}</span></p>
              <p className="text-lg font-semibold">{lead.service}</p>
            </div>
            <div className="text-right">
              <p className="text-amber-500 font-bold">{lead.value}</p>
              <p className="text-xs text-zinc-500">{lead.distance} away</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractorDashboard;
