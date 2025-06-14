
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DiscussionControlsProps {
  isRunning: boolean;
  isGenerating: boolean;
  orchestrator: any;
  challenge: string;
  discussionSpeed: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const DiscussionControls: React.FC<DiscussionControlsProps> = ({
  isRunning,
  isGenerating,
  orchestrator,
  challenge,
  discussionSpeed,
  onStart,
  onPause,
  onReset,
  onSpeedChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        {!isRunning ? (
          <Button 
            onClick={onStart} 
            className="bg-slate-700 hover:bg-slate-800 text-white"
            disabled={!orchestrator || !challenge?.trim() || isGenerating}
          >
            <Play className="w-4 h-4 mr-2" />
            Begin Symposium
          </Button>
        ) : (
          <Button onClick={onPause} variant="outline" className="border-slate-300">
            <Pause className="w-4 h-4 mr-2" />
            Pause Discussion
          </Button>
        )}
        <Button onClick={onReset} variant="outline" className="border-slate-300">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-slate-600">Speed:</span>
        <div className="flex space-x-1">
          {[0.5, 1, 2].map(speed => (
            <Button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              variant={discussionSpeed === speed ? "default" : "outline"}
              size="sm"
              className="px-3 py-1 text-xs"
            >
              {speed}x
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionControls;
