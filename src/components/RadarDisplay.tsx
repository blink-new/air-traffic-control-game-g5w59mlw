import React from 'react';
import { Aircraft } from '../types/game';
import { Plane, Navigation } from 'lucide-react';

interface RadarDisplayProps {
  aircraft: Aircraft[];
  onAircraftSelect: (aircraftId: string) => void;
  selectedAircraftId: string | null;
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({
  aircraft,
  onAircraftSelect,
  selectedAircraftId
}) => {
  const getAircraftIcon = (type: Aircraft['type']) => {
    switch (type) {
      case 'commercial':
        return <Plane className="w-6 h-6" />;
      case 'cargo':
        return <Plane className="w-7 h-7" />;
      case 'private':
        return <Navigation className="w-5 h-5" />;
      default:
        return <Plane className="w-6 h-6" />;
    }
  };

  const getAircraftColor = (aircraft: Aircraft) => {
    if (aircraft.id === selectedAircraftId) {
      return 'text-accent';
    }
    
    switch (aircraft.status) {
      case 'approach':
        return 'text-orange-400';
      case 'departure':
        return 'text-blue-400';
      case 'holding':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <div className="relative w-full h-full radar-grid bg-slate-900 overflow-hidden">
      {/* Radar center rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 border border-blue-500/30 rounded-full"></div>
        <div className="absolute w-64 h-64 border border-blue-500/20 rounded-full"></div>
        <div className="absolute w-96 h-96 border border-blue-500/10 rounded-full"></div>
      </div>

      {/* Compass directions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm font-medium">N</div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm font-medium">S</div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm font-medium">W</div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm font-medium">E</div>

      {/* Aircraft */}
      {aircraft.map((plane) => (
        <div
          key={plane.id}
          className={`absolute cursor-pointer transition-all duration-300 ${
            plane.id === selectedAircraftId ? 'aircraft-selected' : 'aircraft-icon'
          }`}
          style={{
            left: `${plane.position.x}%`,
            top: `${plane.position.y}%`,
            transform: `translate(-50%, -50%) rotate(${plane.heading}deg)`,
          }}
          onClick={() => onAircraftSelect(plane.id)}
        >
          <div className={`${getAircraftColor(plane)} hover:scale-110 transition-transform`}>
            {getAircraftIcon(plane.type)}
          </div>
          
          {/* Aircraft info label */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
            <div className="font-medium">{plane.callSign}</div>
            <div className="text-gray-300">{plane.altitude}ft</div>
          </div>

          {/* Flight path indicator */}
          {plane.id === selectedAircraftId && (
            <div
              className="absolute w-16 h-0.5 bg-accent/60 origin-left"
              style={{
                transform: `rotate(${plane.targetHeading - plane.heading}deg)`,
                left: '50%',
                top: '50%',
              }}
            />
          )}
        </div>
      ))}

      {/* Radar sweep animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-green-400/60 to-transparent origin-bottom animate-spin"
             style={{ animationDuration: '4s' }} />
      </div>
    </div>
  );
};