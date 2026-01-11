import React from 'react';
import { MOCK_CLIENT_PROJECT, MOCK_LEADS } from '../constants';
import { MapPin, Calendar, CheckCircle2, Circle, Clock, ArrowRight, DollarSign } from 'lucide-react';

interface ClientDashboardProps {
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onLogout }) => {
  const currentStepIndex = MOCK_CLIENT_PROJECT.updates.findIndex(u => !u.completed);

  return (
    <div className="min-h-screen bg-obsidian pt-24 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl font-serif text-white">Project Tracker</h2>
            <p className="text-gray-400 mt-1">ID: <span className="font-mono text-gold">{MOCK_CLIENT_PROJECT.id}</span></p>
          </div>
          <button onClick={onLogout} className="text-sm text-gray-500 hover:text-white transition-colors">Sign Out</button>
        </div>

        {/* Status Card */}
        <div className="bg-charcoal border border-white/5 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <Clock />
            </div>
            <div>
              <h3 className="text-xl text-white font-medium">Restoration in Progress</h3>
              <p className="text-gray-400 text-sm">Estimated Completion: 4:00 PM Today</p>
            </div>
          </div>

          <div className="space-y-0">
             {MOCK_CLIENT_PROJECT.updates.map((update, index) => {
               const isCompleted = index < currentStepIndex || (index === currentStepIndex && update.completed);
               const isCurrent = index === currentStepIndex;
               
               return (
                 <div key={index} className="flex gap-4 relative">
                   {/* Vertical Line */}
                   {index !== MOCK_CLIENT_PROJECT.updates.length - 1 && (
                     <div className={`absolute left-[15px] top-8 bottom-[-8px] w-[2px] ${isCompleted ? 'bg-gold' : 'bg-gray-800'}`}></div>
                   )}
                   
                   <div className="relative z-10 flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-gold bg-charcoal" />
                      ) : isCurrent ? (
                        <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center bg-charcoal animate-pulse">
                          <div className="w-3 h-3 bg-gold rounded-full"></div>
                        </div>
                      ) : (
                        <Circle className="w-8 h-8 text-gray-700 bg-charcoal" />
                      )}
                   </div>
                   
                   <div className={`pb-8 ${isCurrent ? 'opacity-100' : isCompleted ? 'opacity-70' : 'opacity-40'}`}>
                     <h4 className="text-white font-medium text-lg">{update.label}</h4>
                     <span className="text-xs font-mono text-gray-500">{update.timestamp}</span>
                   </div>
                 </div>
               );
             })}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <img src="https://picsum.photos/50/50?random=1" className="w-10 h-10 rounded-full border border-gray-600" alt="Artisan" />
               <div>
                 <p className="text-sm text-white">Master Artisan</p>
                 <p className="text-xs text-gold">{MOCK_CLIENT_PROJECT.artisanName}</p>
               </div>
            </div>
            <button className="px-4 py-2 border border-white/20 rounded hover:bg-white/5 text-sm text-white transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContractorDashboardProps {
  onLogout: () => void;
}

export const ContractorDashboard: React.FC<ContractorDashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-obsidian pt-24 px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif text-white">Artisan Portal</h2>
            <p className="text-gray-400 mt-1">Available Leads in <span className="font-mono text-gold">Los Angeles</span></p>
          </div>
          <button onClick={onLogout} className="text-sm text-gray-500 hover:text-white transition-colors">Sign Out</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_LEADS.map((lead) => (
            <div key={lead.id} className="bg-charcoal border border-white/5 rounded-xl p-6 hover:border-gold/50 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded border border-gold/20 uppercase">
                  {lead.status}
                </span>
                <span className="text-gray-500 font-mono text-xs">{lead.distance} away</span>
              </div>
              
              <h3 className="text-white font-medium text-lg mb-2">{lead.serviceType}</h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">{lead.description}</p>
              
              <div className="flex items-center gap-2 mb-6 text-gray-300">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm">{lead.zipCode}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-gold/30">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-white font-bold">{lead.estimatedValue}</span>
                </div>
                <button className="flex items-center gap-2 text-sm text-white bg-white/10 hover:bg-gold hover:text-obsidian px-3 py-2 rounded transition-colors">
                  Accept Lead <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {/* Waitlist Upsell Card */}
          <div className="border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 mb-4 text-sm">Expand your service area to see more leads.</p>
            <button className="text-gold text-sm underline hover:text-white">Adjust Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};
