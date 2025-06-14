
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Loader2 } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  image: string;
  domain: string;
  color: string;
  participation: number;
}

interface ExpertsPanelProps {
  experts: Expert[];
  currentSpeaker: string | null;
}

const ExpertsPanel: React.FC<ExpertsPanelProps> = ({ experts, currentSpeaker }) => {
  return (
    <Card className="lg:col-span-1 border-amber-100">
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Active Participants
        </CardTitle>
        <CardDescription>The assembled minds of history</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-3">
            {experts.map((expert) => (
              <div 
                key={expert.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 border ${
                  currentSpeaker === expert.id 
                    ? `${expert.color} shadow-md scale-105 animate-pulse` 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                  <AvatarImage src={expert.image} alt={expert.name} />
                  <AvatarFallback className="text-xs">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {expert.name}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {expert.domain}
                  </p>
                  {currentSpeaker === expert.id && (
                    <div className="flex items-center mt-1">
                      <Loader2 className="w-3 h-3 animate-spin text-green-600 mr-2" />
                      <span className="text-xs text-green-600 font-medium">Contemplating...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExpertsPanel;
