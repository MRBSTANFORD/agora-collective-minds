
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Expert {
  id: string;
  name: string;
  image: string;
}

interface TypingIndicatorProps {
  expert: Expert | undefined;
  typingMessage: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ expert, typingMessage }) => {
  if (!expert) return null;

  return (
    <div className="flex space-x-4 animate-fade-in">
      <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
        <AvatarImage src={expert.image} alt={expert.name} />
        <AvatarFallback className="text-sm">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3 mb-2">
          <p className="text-sm font-medium text-slate-900">{expert.name}</p>
          <Badge className="text-xs bg-green-100 text-green-700 animate-pulse">
            Thinking...
          </Badge>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          {typingMessage ? (
            <p className="text-sm text-slate-700 leading-relaxed">
              {typingMessage}
              <span className="animate-pulse">|</span>
            </p>
          ) : (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
