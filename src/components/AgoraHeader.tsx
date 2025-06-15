import React from 'react';
import { Button } from "@/components/ui/button";
import { Columns, Users, Flame, Scroll } from 'lucide-react';
interface AgoraHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  discussionStarted: boolean;
}
const AgoraHeader: React.FC<AgoraHeaderProps> = ({
  activeTab,
  setActiveTab,
  discussionStarted
}) => {
  const tabs = [{
    id: 'home',
    label: 'Agora',
    icon: Columns
  }, {
    id: 'experts',
    label: 'Pantheon',
    icon: Users
  }, {
    id: 'discussion',
    label: 'Symposium',
    icon: Flame,
    disabled: !discussionStarted
  }, {
    id: 'reports',
    label: 'Codex',
    icon: Scroll,
    disabled: !discussionStarted
  }];
  return <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center space-x-6 py-[10px]">
          <div className="relative">
            <img src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" alt="AGORA Logo" className="w-16 h-16 object-contain drop-shadow-lg" />
            <div className="absolute -inset-2 bg-gradient-to-r from-slate-200/30 to-amber-200/30 rounded-full blur-sm"></div>
          </div>
          <div>
            <h1 className="text-3xl font-thin tracking-wider" style={{
            color: '#1e293b'
          }}>AGORA</h1>
            <p className="text-sm font-light tracking-wide" style={{
            color: '#DAA520'
          }}>The Eternal Space for Collective Wisdom</p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-1"></div>
          </div>
        </div>
        <nav className="flex space-x-8">
          {tabs.map(tab => <Button key={tab.id} variant="ghost" onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 font-light tracking-wide transition-all duration-300 ${activeTab === tab.id ? 'text-slate-800 bg-slate-100 shadow-sm' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'}`} disabled={tab.disabled} style={activeTab === tab.id ? {
          borderBottom: '2px solid #DAA520'
        } : {}}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>)}
        </nav>
      </div>
    </header>;
};
export default AgoraHeader;