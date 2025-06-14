
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';
import { DiscussionMessage } from '@/services/aiOrchestrator';

interface Expert {
  id: string;
  name: string;
  image: string;
}

interface MessageItemProps {
  message: DiscussionMessage;
  expert: Expert | undefined;
  getRelativeTime: (timestamp: Date) => string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, expert, getRelativeTime }) => {
  return (
    <div className="flex space-x-4 animate-fade-in">
      <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
        <AvatarImage src={expert?.image} alt={expert?.name} />
        <AvatarFallback className="text-sm">{expert?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3 mb-2">
          <p className="text-sm font-medium text-slate-900">{expert?.name}</p>
          <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
            Round {message.round}
          </Badge>
          <span className="text-xs text-slate-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {getRelativeTime(message.timestamp)}
          </span>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-slate-700 leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
