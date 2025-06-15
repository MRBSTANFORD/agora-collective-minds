
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Columns, Users, Flame, Scroll, Shield, Info, ChevronDown, Brain, Zap, Star, Lightbulb, Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const coreConceptsItems = [
    {
      to: "/eight-immortal-minds",
      icon: Star,
      label: "Eight Immortal Minds",
      color: "text-amber-500"
    },
    {
      to: "/iterative-discourse", 
      icon: Zap,
      label: "Iterative Discourse",
      color: "text-blue-500"
    },
    {
      to: "/synthesis-of-wisdom",
      icon: Lightbulb, 
      label: "Synthesis of Wisdom",
      color: "text-green-500"
    },
    {
      to: "/transcendent-insights",
      icon: Brain,
      label: "Transcendent Insights", 
      color: "text-purple-500"
    }
  ];

  return (
    <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center space-x-3 md:space-x-6 py-[10px]">
            <div className="relative">
              <img 
                src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                alt="AGORA Logo" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-lg" 
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-200/30 to-amber-200/30 rounded-full blur-sm"></div>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-thin tracking-wider" style={{ color: '#1e293b' }}>
                AGORA
              </h1>
              <p className="text-xs md:text-sm font-light tracking-wide" style={{ color: '#DAA520' }}>
                The Eternal Space for Collective Wisdom
              </p>
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-1"></div>
            </div>
          </div>

          {/* Desktop Privacy Badge */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">100% Private</span>
            </div>
            <div className="text-xs text-slate-500">
              <div>No data collection</div>
              <div>Local storage only</div>
            </div>
          </div>

          {/* Mobile Privacy Badge */}
          <div className="flex lg:hidden items-center bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <Shield className="w-3 h-3 text-green-600 mr-1" />
            <span className="text-xs font-medium text-green-700">Private</span>
          </div>
        </div>

        <nav className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
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

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                      alt="AGORA Logo" 
                      className="w-10 h-10 object-contain" 
                    />
                    <span className="text-lg font-thin tracking-wider text-slate-900">AGORA</span>
                  </div>
                </div>

                {/* Mobile Main Navigation */}
                <div className="space-y-2 mb-8">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider px-3">Navigation</h3>
                  {tabs.map(tab => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start space-x-3 h-12 ${
                        activeTab === tab.id 
                          ? 'text-slate-800 bg-slate-100' 
                          : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                      disabled={tab.disabled}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </Button>
                  ))}
                </div>

                {/* Mobile Core Concepts */}
                <div className="space-y-2 mb-8">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider px-3">Core Concepts</h3>
                  {coreConceptsItems.map((item) => (
                    <Button key={item.to} asChild variant="ghost" className="w-full justify-start space-x-3 h-12">
                      <Link to={item.to} onClick={() => setMobileMenuOpen(false)}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span>{item.label}</span>
                      </Link>
                    </Button>
                  ))}
                </div>

                {/* Mobile Secondary Links */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider px-3">More</h3>
                  <Button asChild variant="ghost" className="w-full justify-start space-x-3 h-12">
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                      <Info className="w-5 h-5" />
                      <span>About</span>
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start space-x-3 h-12">
                    <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>
                      <span>FAQ</span>
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start space-x-3 h-12">
                    <a 
                      href="https://www.razaofinal.com/contact-us" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Contact</span>
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <Link to="/about" className="flex items-center space-x-1">
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
            </Button>

            {/* Core Concepts Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800 flex items-center space-x-1">
                  <Brain className="w-4 h-4" />
                  <span>Core Concepts</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                {coreConceptsItems.map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <Link to={item.to} className="flex items-center space-x-2 cursor-pointer">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
