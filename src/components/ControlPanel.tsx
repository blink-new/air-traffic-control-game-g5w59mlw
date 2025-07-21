import React, { useState } from 'react';
import { Aircraft, Command } from '../types/game';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Plane, ArrowUp, RotateCw, Gauge } from 'lucide-react';

interface ControlPanelProps {
  selectedAircraft: Aircraft | null;
  onCommand: (command: Command) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedAircraft,
  onCommand
}) => {
  const [altitudeInput, setAltitudeInput] = useState('');
  const [headingInput, setHeadingInput] = useState('');
  const [speedInput, setSpeedInput] = useState('');

  const handleAltitudeCommand = () => {
    if (!selectedAircraft || !altitudeInput) return;
    const altitude = parseInt(altitudeInput);
    if (altitude >= 1000 && altitude <= 40000) {
      onCommand({
        type: 'altitude',
        value: altitude,
        aircraftId: selectedAircraft.id,
        timestamp: Date.now()
      });
      setAltitudeInput('');
    }
  };

  const handleHeadingCommand = () => {
    if (!selectedAircraft || !headingInput) return;
    const heading = parseInt(headingInput);
    if (heading >= 0 && heading <= 360) {
      onCommand({
        type: 'heading',
        value: heading,
        aircraftId: selectedAircraft.id,
        timestamp: Date.now()
      });
      setHeadingInput('');
    }
  };

  const handleSpeedCommand = () => {
    if (!selectedAircraft || !speedInput) return;
    const speed = parseInt(speedInput);
    if (speed >= 100 && speed <= 600) {
      onCommand({
        type: 'speed',
        value: speed,
        aircraftId: selectedAircraft.id,
        timestamp: Date.now()
      });
      setSpeedInput('');
    }
  };

  const getStatusColor = (status: Aircraft['status']) => {
    switch (status) {
      case 'approach': return 'bg-orange-500';
      case 'departure': return 'bg-blue-500';
      case 'holding': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  if (!selectedAircraft) {
    return (
      <Card className="control-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Select an aircraft to issue commands
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="control-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          {selectedAircraft.callSign}
        </CardTitle>
        <Badge className={`w-fit ${getStatusColor(selectedAircraft.status)}`}>
          {selectedAircraft.status.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Altitude:</span>
            <div className="font-medium">{selectedAircraft.altitude} ft</div>
          </div>
          <div>
            <span className="text-muted-foreground">Heading:</span>
            <div className="font-medium">{selectedAircraft.heading}°</div>
          </div>
          <div>
            <span className="text-muted-foreground">Speed:</span>
            <div className="font-medium">{selectedAircraft.speed} kts</div>
          </div>
          <div>
            <span className="text-muted-foreground">Type:</span>
            <div className="font-medium capitalize">{selectedAircraft.type}</div>
          </div>
        </div>

        {/* Altitude Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <ArrowUp className="w-4 h-4" />
            Altitude (1000-40000 ft)
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="e.g. 25000"
              value={altitudeInput}
              onChange={(e) => setAltitudeInput(e.target.value)}
              min="1000"
              max="40000"
              step="1000"
            />
            <Button onClick={handleAltitudeCommand} size="sm">
              Set
            </Button>
          </div>
        </div>

        {/* Heading Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            Heading (0-360°)
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="e.g. 270"
              value={headingInput}
              onChange={(e) => setHeadingInput(e.target.value)}
              min="0"
              max="360"
            />
            <Button onClick={handleHeadingCommand} size="sm">
              Set
            </Button>
          </div>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            Speed (100-600 kts)
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="e.g. 350"
              value={speedInput}
              onChange={(e) => setSpeedInput(e.target.value)}
              min="100"
              max="600"
            />
            <Button onClick={handleSpeedCommand} size="sm">
              Set
            </Button>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Commands</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCommand({
                type: 'altitude',
                value: selectedAircraft.altitude + 2000,
                aircraftId: selectedAircraft.id,
                timestamp: Date.now()
              })}
            >
              Climb 2000ft
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCommand({
                type: 'altitude',
                value: selectedAircraft.altitude - 2000,
                aircraftId: selectedAircraft.id,
                timestamp: Date.now()
              })}
            >
              Descend 2000ft
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCommand({
                type: 'heading',
                value: (selectedAircraft.heading + 90) % 360,
                aircraftId: selectedAircraft.id,
                timestamp: Date.now()
              })}
            >
              Turn Right 90°
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCommand({
                type: 'heading',
                value: (selectedAircraft.heading - 90 + 360) % 360,
                aircraftId: selectedAircraft.id,
                timestamp: Date.now()
              })}
            >
              Turn Left 90°
            </Button>
          </div>
        </div>

        {/* Last Command */}
        {selectedAircraft.lastCommand && (
          <div className="text-xs text-muted-foreground border-t pt-2">
            Last command: {selectedAircraft.lastCommand}
          </div>
        )}
      </CardContent>
    </Card>
  );
};