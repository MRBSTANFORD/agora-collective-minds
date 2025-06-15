import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Users, Brain, Lightbulb, BookOpen, Columns, Flame, Scroll, Settings, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExpertProfiles from '@/components/ExpertProfiles';
import DiscussionInterface from '@/components/DiscussionInterface';
import ReportsModule from '@/components/ReportsModule';
import { DiscussionConfig } from "@/components/DiscussionConfigPanel";
import HeroSection from '@/components/HeroSection';
import ChallengeInputSection from '@/components/ChallengeInputSection';
import HowItWorksSection from '@/components/HowItWorksSection';

const Index = () => {
  const [challenge, setChallenge] = useState('');
  const [rounds, setRounds] = useState(5);
  const [activeTab, setActiveTab] = useState('home');
  const [discussionStarted, setDiscussionStarted] = useState(false);
  const [discussionMessages, setDiscussionMessages] = useState<any[]>([]);
  const [isDiscussionComplete, setIsDiscussionComplete] = useState(false);

  // Default experts configuration
  const defaultExperts = [
    {
      id: 'leonardo',
      name: 'Leonardo da Vinci',
      cognitive: { creativity: 95, skepticism: 40, optimism: 85 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'curie',
      name: 'Marie Curie',
      cognitive: { creativity: 70, skepticism: 85, optimism: 60 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'socrates',
      name: 'Socrates',
      cognitive: { creativity: 60, skepticism: 90, optimism: 55 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'hypatia',
      name: 'Hypatia of Alexandria',
      cognitive: { creativity: 75, skepticism: 70, optimism: 80 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'einstein',
      name: 'Albert Einstein',
      cognitive: { creativity: 100, skepticism: 60, optimism: 75 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'confucius',
      name: 'Confucius',
      cognitive: { creativity: 65, skepticism: 45, optimism: 85 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'lovelace',
      name: 'Ada Lovelace',
      cognitive: { creativity: 90, skepticism: 50, optimism: 90 },
      apiKey: "",
      provider: "HuggingFace",
    },
    {
      id: 'machiavelli',
      name: 'Niccolò Machiavelli',
      cognitive: { creativity: 80, skepticism: 95, optimism: 40 },
      apiKey: "",
      provider: "HuggingFace",
    }
  ];

  // Initialize with default configuration
  const [discussionConfig, setDiscussionConfig] = useState<DiscussionConfig>({
    rounds: rounds,
    experts: defaultExperts
  });

  // Update config when rounds change
  const handleRoundsChange = (newRounds: number) => {
    setRounds(newRounds);
    setDiscussionConfig(prev => ({
      ...prev,
      rounds: newRounds
    }));
  };

  // Update config from advanced settings
  const handleConfigChange = (newConfig: DiscussionConfig) => {
    setDiscussionConfig(newConfig);
    setRounds(newConfig.rounds);
  };

  // Add handler to receive discussion updates
  const handleDiscussionUpdate = (messages: any[], complete: boolean) => {
    setDiscussionMessages(messages);
    setIsDiscussionComplete(complete);
  };

  const handleStartDiscussion = () => {
    if (challenge.trim()) {
      setDiscussionStarted(true);
      setActiveTab('discussion');
    }
  };

  const canStart = challenge.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header with Greek-inspired design */}
      <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          {/* Header with Greek-inspired design */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img 
                src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                alt="AGORA Logo" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-200/30 to-amber-200/30 rounded-full blur-sm"></div>
            </div>
            <div>
              <h1 className="text-3xl font-thin tracking-wider" style={{ color: '#1e293b' }}>AGORA</h1>
              <p className="text-sm font-light tracking-wide" style={{ color: '#DAA520' }}>The Eternal Space for Collective Wisdom</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-1"></div>
            </div>
          </div>
          <nav className="flex space-x-8">
            {[
              { id: 'home', label: 'Agora', icon: Columns },
              { id: 'experts', label: 'Pantheon', icon: Users },
              { id: 'discussion', label: 'Symposium', icon: Flame, disabled: !discussionStarted },
              { id: 'reports', label: 'Codex', icon: Scroll, disabled: !discussionStarted }
            ].map(tab => (
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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="mt-0">
            <div className="space-y-20">
              <HeroSection />
              
              <ChallengeInputSection 
                challenge={challenge}
                setChallenge={setChallenge}
                rounds={rounds}
                onRoundsChange={handleRoundsChange}
                discussionConfig={discussionConfig}
                onConfigChange={handleConfigChange}
                onStartDiscussion={handleStartDiscussion}
                canStart={canStart}
              />

              <HowItWorksSection />
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-0">
            <ExpertProfiles />
          </TabsContent>

          <TabsContent value="discussion" className="mt-0">
            <DiscussionInterface 
              challenge={challenge} 
              discussionConfig={discussionConfig}
              onDiscussionUpdate={handleDiscussionUpdate}
            />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <ReportsModule 
              discussionMessages={discussionMessages}
              challenge={challenge}
              isDiscussionComplete={isDiscussionComplete}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer - Greek temple inspired */}
      <footer className="mt-20 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16 relative overflow-hidden">
        {/* Greek geometric pattern */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, #DAA520 60px, #DAA520 61px)`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" 
                  alt="AGORA Logo" 
                  className="w-12 h-12 object-contain mr-4"
                />
                <div>
                  <h4 className="text-2xl font-thin tracking-wider">AGORA</h4>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-1"></div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed font-light">
                The eternal marketplace of ideas where wisdom transcends time, 
                connecting ancient insight with modern innovation.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">User Resources</h4>
              <ul className="space-y-3 text-slate-300 font-light">
                <li>
                  <Link to="/user-guide" className="hover:text-amber-300 transition-colors">
                    AGORA User Guide
                  </Link>
                </li>
                <li>
                  <Link to="/eight-immortal-minds" className="hover:text-amber-300 transition-colors">
                    Eight Immortal Minds
                  </Link>
                </li>
                <li>
                  <Link to="/iterative-discourse" className="hover:text-amber-300 transition-colors">
                    Iterative Discourse
                  </Link>
                </li>
                <li>
                  <Link to="/synthesis-of-wisdom" className="hover:text-amber-300 transition-colors">
                    Synthesis of Wisdom
                  </Link>
                </li>
                <li>
                  <Link to="/transcendent-insights" className="hover:text-amber-300 transition-colors">
                    Transcendent Insights
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">Our Purpose</h4>
              <p className="text-slate-300 leading-relaxed font-light">
                To bridge the eternal and the immediate, where timeless wisdom 
                illuminates the path through contemporary complexity.
              </p>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4"></div>
            <p className="text-slate-400 font-light tracking-wide">
              © 2025 AGORA. Where wisdom endures through the ages.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
