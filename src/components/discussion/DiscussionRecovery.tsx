
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Download, Trash2 } from 'lucide-react';

interface DiscussionRecoveryProps {
  savedState: {
    messages: any[];
    currentRound: number;
    challenge: string;
    timestamp: number;
  };
  onRestore: () => void;
  onDiscard: () => void;
}

const DiscussionRecovery: React.FC<DiscussionRecoveryProps> = ({
  savedState,
  onRestore,
  onDiscard
}) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than an hour ago';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="text-amber-800 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Previous Symposium Found
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-slate-700">
          <p><strong>Challenge:</strong> {savedState.challenge.slice(0, 100)}...</p>
          <p><strong>Progress:</strong> Round {savedState.currentRound} with {savedState.messages.length} messages</p>
          <p><strong>Saved:</strong> {formatTime(savedState.timestamp)}</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={onRestore}
            className="bg-amber-600 hover:bg-amber-700 flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Restore Session
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onDiscard}
            className="border-slate-300 hover:bg-slate-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Start Fresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionRecovery;
