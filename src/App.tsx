import React from 'react';
import { RadarDisplay } from './components/RadarDisplay';
import { ControlPanel } from './components/ControlPanel';
import { FlightStrip } from './components/FlightStrip';
import { GameHeader } from './components/GameHeader';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    gameState,
    selectedAircraft,
    selectAircraft,
    issueCommand,
    togglePlayPause,
    resetGame
  } = useGameLogic();

  return (
    <div className="h-screen w-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="h-16 p-2">
        <GameHeader
          isPlaying={gameState.isPlaying}
          score={gameState.score}
          collisions={gameState.collisions}
          gameTime={gameState.gameTime}
          onPlayPause={togglePlayPause}
          onReset={resetGame}
        />
      </div>

      {/* Main Game Area */}
      <div className="h-[calc(100vh-4rem)] flex gap-2 p-2">
        {/* Left Panel - Flight Strips */}
        <div className="w-80 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <FlightStrip
            aircraft={gameState.aircraft}
            selectedAircraftId={gameState.selectedAircraftId}
            onAircraftSelect={selectAircraft}
          />
        </div>

        {/* Center - Radar Display */}
        <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <RadarDisplay
            aircraft={gameState.aircraft}
            onAircraftSelect={selectAircraft}
            selectedAircraftId={gameState.selectedAircraftId}
          />
        </div>

        {/* Right Panel - Control Panel */}
        <div className="w-80">
          <ControlPanel
            selectedAircraft={selectedAircraft}
            onCommand={issueCommand}
          />
        </div>
      </div>

      {/* Instructions overlay when game is paused */}
      {!gameState.isPlaying && gameState.gameTime === 0 && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-600 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-accent">Welcome to Air Traffic Control</h2>
            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <p>• Click on aircraft to select them</p>
              <p>• Use the control panel to issue commands</p>
              <p>• Manage altitude, heading, and speed</p>
              <p>• Avoid collisions to maintain safety</p>
              <p>• Score points by managing more aircraft</p>
            </div>
            <button
              onClick={togglePlayPause}
              className="bg-accent hover:bg-accent/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;