
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Users as UsersIcon } from "lucide-react";

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  messages: { speaker: string; content: string }[];
  experts: { id: string; name: string }[];
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ open, onOpenChange, messages, experts }) => {
  // Compute stats
  const numMessages = messages.length;
  const participants = [...new Set(messages.map(m => m.speaker))];
  const words = messages.reduce((acc, m) => acc + m.content.split(/\s+/).length, 0);
  const mostActive = (() => {
    if (!messages.length) return null;
    const counts: Record<string, number> = {};
    messages.forEach(m => { counts[m.speaker] = (counts[m.speaker] || 0) + 1 });
    const max = Math.max(...Object.values(counts));
    const winners = Object.entries(counts).filter(([_, v]) => v === max);
    return winners.map(([id]) => experts.find(e => e.id === id)?.name || id).join(", ");
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discussion Analytics</DialogTitle>
          <DialogDescription>Quick stats about this intellectual symposium</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-64">
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-slate-500" />
              <span className="font-medium">{numMessages}</span>
              <span className="text-sm text-slate-600">Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-slate-500" />
              <span className="font-medium">{participants.length}</span>
              <span className="text-sm text-slate-600">Participants</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{words}</span>
              <span className="text-sm text-slate-600">Total Words</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{mostActive || "—"}</span>
              <span className="text-sm text-slate-600">Most Active</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AnalyticsModal;
