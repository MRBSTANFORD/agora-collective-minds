
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Columns, Users, Flame, Scroll, Shield, Info, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  const pillarPages = [
    {
      title: 'The Eight Immortal Minds',
      href: '/eight-immortal-minds',
      description: 'Meet the historical figures who guide our discussions'
    },
    {
      title: 'Iterative Discourse',
      href: '/iterative-discourse',
      description: 'Understanding the structured dialogue process'
    },
    {
      title: 'Synthesis of Wisdom',
      href: '/synthesis-of-wisdom',
      description: 'How collective insights are distilled into wisdom'
    },
    {
      title: 'Transcendent Insights',
      href: '/transcendent-insights',
      description: 'The emergence of breakthrough understanding'
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-600 hover:text-slate-800 bg-transparent">
                    Core Concepts
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {pillarPages.map((page) => (
                        <NavigationMenuLink key={page.href} asChild>
                          <Link
                            to={page.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{page.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {page.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
