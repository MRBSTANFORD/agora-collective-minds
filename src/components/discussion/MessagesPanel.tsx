
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, BookmarkPlus, Share2, BarChart3 } from 'lucide-react';
import { DiscussionMessage } from '@/services/aiOrchestrator';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import { useToast } from '@/hooks/use-toast';

import { useBookmarks } from '@/hooks/useBookmarks';
import AnalyticsModal from './AnalyticsModal';

interface Expert {
  id: string;
  name: string;
  image: string;
}

interface MessagesPanelProps {
  messages: DiscussionMessage[];
  currentSpeaker: string | null;
  typingMessage: string;
  experts: Expert[];
  getExpertInfo: (expertId: string) => Expert | undefined;
  getRelativeTime: (timestamp: Date) => string;
}

const MessagesPanel: React.FC<MessagesPanelProps> = ({
  messages,
  currentSpeaker,
  typingMessage,
  experts,
  getExpertInfo,
  getRelativeTime,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Bookmark logic
  const { isBookmarked, addBookmark } = useBookmarks();
  const [showAnalytics, setShowAnalytics] = useState(false);

  // For identity, let's use a hash of all messages and current experts as a key
  const discussionId = React.useMemo(() => {
    const raw = JSON.stringify({
      messages: messages.map(m => [m.speaker, m.content, m.round, m.timestamp].join('_')),
      experts: experts.map(e => e.id)
    });
    let hash = 0;
    for (let i = 0; i < raw.length; i++) hash = ((hash << 5) - hash) + raw.charCodeAt(i);
    return `discussion_${hash}`;
  }, [messages, experts]);

  const handleBookmark = () => {
    if (messages.length === 0) {
      toast({
        title: "Cannot Bookmark Empty Discussion",
        description: "There must be at least one message to bookmark.",
        variant: "destructive",
      });
      return;
    }
    addBookmark({
      id: discussionId,
      timestamp: new Date().toISOString(),
      title: `Discussion (${experts.length} minds, ${messages.length} messages)`,
      messages,
      experts,
    });
    toast({
      title: "Bookmarked!",
      description: "Discussion saved locally. Access it from your browser next time.",
      duration: 2500
    });
  };

  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname + `?share=${encodeURIComponent(discussionId)}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Shareable Link Copied",
        description: "You can now share the discussion URL",
        duration: 2000
      });
    } catch {
      toast({
        title: "Failed to Copy Link",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleAnalytics = () => {
    setShowAnalytics(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  return (
    <Card className="lg:col-span-3 border-amber-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-800">Symposium Discourse</CardTitle>
            <CardDescription>Real-time dialogue among the immortal minds</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-slate-600" onClick={handleBookmark}>
              <BookmarkPlus className="w-4 h-4 mr-1" />
              {isBookmarked(discussionId) ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600" onClick={handleAnalytics}>
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Button>
            <AnalyticsModal
              open={showAnalytics}
              onOpenChange={setShowAnalytics}
              messages={messages}
              experts={experts}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-6">
          {messages.length === 0 && !currentSpeaker ? (
            <div className="flex items-center justify-center h-full text-slate-500">
              <div className="text-center py-16">
                <MessageCircle className="w-16 h-16 mx-auto mb-6 text-slate-300" />
                <p className="text-lg font-light">Begin the symposium to witness</p>
                <p className="text-lg font-light">the convergence of timeless wisdom</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-6">
              {messages.map((message, index) => (
                <MessageItem
                  key={index}
                  message={message}
                  expert={getExpertInfo(message.speaker)}
                  getRelativeTime={getRelativeTime}
                />
              ))}
              {currentSpeaker && (
                <TypingIndicator
                  expert={getExpertInfo(currentSpeaker)}
                  typingMessage={typingMessage}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MessagesPanel;
