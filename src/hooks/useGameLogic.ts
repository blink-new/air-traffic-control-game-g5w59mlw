import { useState, useEffect, useCallback } from 'react';
import { Aircraft, Command, GameState } from '../types/game';

const AIRCRAFT_TYPES: Aircraft['type'][] = ['commercial', 'cargo', 'private'];
const CALL_SIGNS = [
  'UAL123', 'DAL456', 'AAL789', 'SWA101', 'JBU202', 'VIR303',
  'BAW404', 'LUF505', 'AFR606', 'KLM707', 'ANA808', 'JAL909'
];

const generateRandomAircraft = (id: string): Aircraft => {
  const callSign = CALL_SIGNS[Math.floor(Math.random() * CALL_SIGNS.length)];
  const type = AIRCRAFT_TYPES[Math.floor(Math.random() * AIRCRAFT_TYPES.length)];
  
  // Start aircraft from edges of the radar
  const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  let x, y, heading;
  
  switch (edge) {
    case 0: // top
      x = Math.random() * 100;
      y = 5;
      heading = 180 + (Math.random() - 0.5) * 60; // roughly south
      break;
    case 1: // right
      x = 95;
      y = Math.random() * 100;
      heading = 270 + (Math.random() - 0.5) * 60; // roughly west
      break;
    case 2: // bottom
      x = Math.random() * 100;
      y = 95;
      heading = 0 + (Math.random() - 0.5) * 60; // roughly north
      break;
    default: // left
      x = 5;
      y = Math.random() * 100;
      heading = 90 + (Math.random() - 0.5) * 60; // roughly east
  }

  const altitude = 20000 + Math.floor(Math.random() * 15000); // 20k-35k feet
  const speed = 300 + Math.floor(Math.random() * 200); // 300-500 knots

  return {
    id,
    callSign,
    type,
    position: { x, y },
    altitude,
    heading: Math.round(heading) % 360,
    speed,
    targetAltitude: altitude,
    targetHeading: heading,
    targetSpeed: speed,
    status: 'enroute',
    isSelected: false
  };
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    aircraft: [],
    score: 0,
    collisions: 0,
    isPlaying: false,
    gameTime: 0,
    selectedAircraftId: null
  });

  // Initialize game with some aircraft
  const initializeGame = useCallback(() => {
    const initialAircraft = Array.from({ length: 3 }, (_, i) => 
      generateRandomAircraft(`aircraft-${i}`)
    );
    
    setGameState({
      aircraft: initialAircraft,
      score: 0,
      collisions: 0,
      isPlaying: false,
      gameTime: 0,
      selectedAircraftId: null
    });
  }, []);

  // Update aircraft positions and handle AI
  const updateAircraft = useCallback(() => {
    setGameState(prev => {
      const updatedAircraft = prev.aircraft.map(aircraft => {
        const { position, targetHeading, targetAltitude, targetSpeed } = aircraft;
        let { heading, altitude, speed } = aircraft;
        
        // Gradually adjust to target values
        if (Math.abs(targetHeading - heading) > 2) {
          const diff = ((targetHeading - heading + 540) % 360) - 180;
          heading += Math.sign(diff) * Math.min(Math.abs(diff), 2);
          heading = (heading + 360) % 360;
        }
        
        if (Math.abs(targetAltitude - altitude) > 100) {
          altitude += Math.sign(targetAltitude - altitude) * 100;
        }
        
        if (Math.abs(targetSpeed - speed) > 5) {
          speed += Math.sign(targetSpeed - speed) * 5;
        }

        // Update position based on heading and speed
        const speedFactor = speed / 10000; // Scale for visual movement
        const radians = (heading * Math.PI) / 180;
        const newX = position.x + Math.sin(radians) * speedFactor;
        const newY = position.y - Math.cos(radians) * speedFactor;

        // Keep aircraft within bounds or remove if too far out
        if (newX < -10 || newX > 110 || newY < -10 || newY > 110) {
          return null; // Mark for removal
        }

        return {
          ...aircraft,
          position: { x: newX, y: newY },
          heading: Math.round(heading),
          altitude: Math.round(altitude),
          speed: Math.round(speed)
        };
      }).filter(Boolean) as Aircraft[];

      // Add new aircraft occasionally
      if (updatedAircraft.length < 6 && Math.random() < 0.02) {
        const newAircraft = generateRandomAircraft(`aircraft-${Date.now()}`);
        updatedAircraft.push(newAircraft);
      }

      // Check for collisions
      let newCollisions = prev.collisions;
      for (let i = 0; i < updatedAircraft.length; i++) {
        for (let j = i + 1; j < updatedAircraft.length; j++) {
          const a1 = updatedAircraft[i];
          const a2 = updatedAircraft[j];
          
          const distance = Math.sqrt(
            Math.pow(a1.position.x - a2.position.x, 2) + 
            Math.pow(a1.position.y - a2.position.y, 2)
          );
          
          const altitudeDiff = Math.abs(a1.altitude - a2.altitude);
          
          // Collision if too close horizontally and vertically
          if (distance < 3 && altitudeDiff < 1000) {
            newCollisions++;
          }
        }
      }

      return {
        ...prev,
        aircraft: updatedAircraft,
        collisions: newCollisions,
        score: prev.score + updatedAircraft.length // Score based on aircraft managed
      };
    });
  }, []);

  // Game timer
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        gameTime: prev.gameTime + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isPlaying]);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying) return;

    const gameLoop = setInterval(updateAircraft, 200); // Update every 200ms
    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying, updateAircraft]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const selectAircraft = useCallback((aircraftId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedAircraftId: prev.selectedAircraftId === aircraftId ? null : aircraftId
    }));
  }, []);

  const issueCommand = useCallback((command: Command) => {
    setGameState(prev => ({
      ...prev,
      aircraft: prev.aircraft.map(aircraft => {
        if (aircraft.id !== command.aircraftId) return aircraft;

        let commandText = '';
        const updates: Partial<Aircraft> = {};

        switch (command.type) {
          case 'altitude':
            updates.targetAltitude = command.value;
            commandText = `Climb/descend to ${command.value} feet`;
            break;
          case 'heading':
            updates.targetHeading = command.value;
            commandText = `Turn to heading ${command.value} degrees`;
            break;
          case 'speed':
            updates.targetSpeed = command.value;
            commandText = `Adjust speed to ${command.value} knots`;
            break;
        }

        return {
          ...aircraft,
          ...updates,
          lastCommand: commandText,
          commandTime: command.timestamp
        };
      })
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  }, []);

  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  const selectedAircraft = gameState.aircraft.find(
    aircraft => aircraft.id === gameState.selectedAircraftId
  ) || null;

  return {
    gameState,
    selectedAircraft,
    selectAircraft,
    issueCommand,
    togglePlayPause,
    resetGame
  };
};