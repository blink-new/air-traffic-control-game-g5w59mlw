import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw, Trophy, AlertTriangle, Clock } from 'lucide-react';

interface GameHeaderProps {
  isPlaying: boolean;
  score: number;
  collisions: number;
  gameTime: number;
  onPlayPause: () => void;
  onReset: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  isPlaying,
  score,
  collisions,
  gameTime,
  onPlayPause,
  onReset
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="control-panel p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full"></div>
            </div>
            Air Traffic Control
          </h1>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Score: {score}
            </Badge>
            
            <Badge 
              variant={collisions > 0 ? "destructive" : "outline"} 
              className="flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              Collisions: {collisions}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(gameTime)}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onPlayPause}
            variant={isPlaying ? "secondary" : "default"}
            size="sm"
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play
              </>
            )}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};