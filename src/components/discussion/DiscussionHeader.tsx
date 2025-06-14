
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, AlertCircle } from 'lucide-react';

interface DiscussionHeaderProps {
  challenge: string;
  expertsCount: number;
  maxRounds: number;
  currentRound: number;
  progress: number;
  roundProgress: number[];
  isRunning: boolean;
  isGenerating: boolean;
  hasError: boolean;
  orchestrator: any;
}

const DiscussionHeader: React.FC<DiscussionHeaderProps> = ({
  challenge,
  expertsCount,
  maxRounds,
  currentRound,
  progress,
  roundProgress,
  isRunning,
  isGenerating,
  hasError,
  orchestrator,
}) => {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-amber-50/30 border-amber-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
              alt="AGORA Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <CardTitle className="text-2xl font-thin tracking-wide text-slate-800">
                Active Symposium
              </CardTitle>
              <CardDescription className="text-slate-600">
                {expertsCount} immortal minds • {maxRounds} rounds of discourse
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Round {currentRound} of {maxRounds}
            </Badge>
            {(isRunning || isGenerating) && (
              <Badge className="bg-green-100 text-green-700 animate-pulse border-green-200">
                <MessageCircle className="w-3 h-3 mr-1" />
                Discussion Active
              </Badge>
            )}
            {hasError && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertCircle className="w-3 h-3 mr-1" />
                Issues Detected
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white/80 rounded-lg p-4 border border-amber-100">
          <h3 className="font-medium text-slate-800 mb-2">Challenge Under Discussion:</h3>
          <p className="text-slate-700 leading-relaxed">{challenge || "No challenge specified yet"}</p>
        </div>

        {!orchestrator && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Discussion Not Ready</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              Please configure experts and enter a challenge to begin the symposium.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Symposium Progress</span>
              <span className="text-sm text-slate-500">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-slate-200" />
            
            <div className="flex gap-2 mt-3">
              {Array.from({ length: maxRounds }, (_, i) => (
                <div key={i} className="flex-1">
                  <div className="text-xs text-slate-500 mb-1">R{i + 1}</div>
                  <Progress 
                    value={roundProgress[i] || 0} 
                    className="h-2 bg-slate-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionHeader;
