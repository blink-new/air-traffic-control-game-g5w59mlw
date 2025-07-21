import React from 'react';
import { Aircraft } from '../types/game';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Plane, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface FlightStripProps {
  aircraft: Aircraft[];
  selectedAircraftId: string | null;
  onAircraftSelect: (aircraftId: string) => void;
}

export const FlightStrip: React.FC<FlightStripProps> = ({
  aircraft,
  selectedAircraftId,
  onAircraftSelect
}) => {
  const getStatusColor = (status: Aircraft['status']) => {
    switch (status) {
      case 'approach': return 'bg-orange-500';
      case 'departure': return 'bg-blue-500';
      case 'holding': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getAltitudeTrend = (aircraft: Aircraft) => {
    if (aircraft.targetAltitude > aircraft.altitude) {
      return <ArrowUp className="w-3 h-3 text-green-400" />;
    } else if (aircraft.targetAltitude < aircraft.altitude) {
      return <ArrowDown className="w-3 h-3 text-red-400" />;
    }
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  return (
    <div className="space-y-2 max-h-full overflow-y-auto">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Flight Strips</h3>
      {aircraft.map((plane) => (
        <Card
          key={plane.id}
          className={`flight-strip p-3 cursor-pointer transition-all duration-200 hover:bg-secondary/80 ${
            plane.id === selectedAircraftId ? 'ring-2 ring-accent' : ''
          }`}
          onClick={() => onAircraftSelect(plane.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              <span className="font-medium text-sm">{plane.callSign}</span>
            </div>
            <Badge className={`text-xs ${getStatusColor(plane.status)}`}>
              {plane.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">ALT:</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{plane.altitude}</span>
                {getAltitudeTrend(plane)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">HDG:</span>
              <div className="font-medium">{plane.heading}°</div>
            </div>
            <div>
              <span className="text-muted-foreground">SPD:</span>
              <div className="font-medium">{plane.speed}</div>
            </div>
          </div>

          {plane.targetAltitude !== plane.altitude && (
            <div className="text-xs text-accent mt-1">
              Target: {plane.targetAltitude}ft
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};