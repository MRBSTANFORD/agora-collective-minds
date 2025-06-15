import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Columns, Users, Flame, Scroll, Shield, Info, ChevronDown, BookOpen } from 'lucide-react';

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
  const tabs = [
    {
      id: 'home',
      label: 'Agora',
      icon: Columns
    },
    {
      id: 'experts',
      label: 'Pantheon',
      icon: Users
    },
    {
      id: 'discussion',
      label: 'Symposium',
      icon: Flame,
      disabled: !discussionStarted
    },
    {
      id: 'reports',
      label: 'Codex',
      icon: Scroll,
      disabled: !discussionStarted
    }
  ];

  return (
    <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6 py-[10px]">
            <div className="relative">
              <img 
                src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                alt="AGORA Logo" 
                className="w-16 h-16 object-contain drop-shadow-lg" 
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-200/30 to-amber-200/30 rounded-full blur-sm"></div>
            </div>
            <div>
              <h1 className="text-3xl font-thin tracking-wider" style={{ color: '#1e293b' }}>
                AGORA
              </h1>
              <p className="text-sm font-light tracking-wide" style={{ color: '#DAA520' }}>
                The Eternal Space for Collective Wisdom
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-1"></div>
            </div>
          </div>

          {/* Privacy Badge */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">100% Private</span>
            </div>
            <div className="text-xs text-slate-500">
              <div>No data collection</div>
              <div>Local storage only</div>
            </div>
          </div>
        </div>

        <nav className="flex items-center justify-between">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 font-light tracking-wide transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-slate-800 bg-slate-100 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
                disabled={tab.disabled}
                style={activeTab === tab.id ? { borderBottom: '2px solid #DAA520' } : {}}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="flex items-center space-x-4">
            {/* Core Concepts Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>Core Concepts</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/eight-immortal-minds" className="w-full cursor-pointer">
                    The Eight Immortal Minds
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/iterative-discourse" className="w-full cursor-pointer">
                    Iterative Discourse
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/synthesis-of-wisdom" className="w-full cursor-pointer">
                    Synthesis of Wisdom
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/transcendent-insights" className="w-full cursor-pointer">
                    Transcendent Insights
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <Link to="/about" className="flex items-center space-x-1">
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <Link to="/faq">FAQ</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a 
                href="https://www.razaofinal.com/contact-us" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-800"
              >
                Contact
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AgoraHeader;
