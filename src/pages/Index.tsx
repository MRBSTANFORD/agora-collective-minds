import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Users, Brain, Lightbulb, BookOpen, Columns, Flame, Scroll } from 'lucide-react';
import ExpertProfiles from '@/components/ExpertProfiles';
import DiscussionInterface from '@/components/DiscussionInterface';
import ReportsModule from '@/components/ReportsModule';
import { DiscussionConfigPanel, DiscussionConfig } from "@/components/DiscussionConfigPanel";

const Index = () => {
  const [challenge, setChallenge] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [discussionStarted, setDiscussionStarted] = useState(false);

  // Symposium config state (see new panel)
  const [discussionConfig, setDiscussionConfig] = useState<DiscussionConfig | undefined>(undefined);

  const handleStartDiscussion = () => {
    if (challenge.trim() && discussionConfig) {
      setDiscussionStarted(true);
      setActiveTab('discussion');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header with Greek-inspired design */}
      <header className="border-b border-slate-200/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="mt-0">
            <div className="space-y-20">
              {/* Hero Section with Greek temple inspiration */}
              <section className="py-24 relative overflow-hidden">
                {/* Geometric Greek patterns */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
                  <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                  <div className="absolute left-1/6 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                  <div className="absolute right-1/6 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                  <div className="flex justify-center mb-12">
                    <div className="relative">
                      <img 
                        src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                        alt="AGORA Logo" 
                        className="w-32 h-32 object-contain drop-shadow-2xl"
                      />
                      <div className="absolute -inset-4 bg-gradient-to-r from-slate-200/20 via-amber-200/20 to-slate-200/20 rounded-full blur-lg"></div>
                    </div>
                  </div>
                  
                  <h2 className="text-7xl font-thin tracking-wider mb-8 leading-tight" style={{ color: '#1e293b' }}>
                    Where Timeless Wisdom
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-amber-600 to-slate-700">
                      Illuminates Tomorrow
                    </span>
                  </h2>
                  
                  <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
                  
                  <p className="text-2xl text-slate-600 mb-12 leading-relaxed font-light max-w-4xl mx-auto">
                    Convene with eight immortal minds in the sacred space of dialectic, 
                    where collective wisdom transforms complexity into clarity.
                  </p>
                  
                  <div className="flex justify-center space-x-6">
                    {[
                      { icon: Brain, label: 'Collective Intelligence', color: 'slate' },
                      { icon: Lightbulb, label: 'Timeless Insights', color: 'amber' },
                      { icon: BookOpen, label: 'Eternal Wisdom', color: 'slate' }
                    ].map((feature, index) => (
                      <Badge key={index} variant="secondary" className={`px-6 py-3 bg-${feature.color}-50 text-${feature.color}-700 border border-${feature.color}-200 font-light tracking-wide`}>
                        <feature.icon className="w-5 h-5 mr-3" />
                        {feature.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </section>

              {/* Challenge Input Section - Temple-inspired */}
              <section className="relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-12 relative overflow-hidden">
                  {/* Subtle Greek key pattern */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
                  
                  <div className="flex justify-end mb-2">
                    <DiscussionConfigPanel
                      initialConfig={discussionConfig}
                      onChange={setDiscussionConfig}
                    />
                  </div>
                  
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                      <div className="flex items-center justify-center mb-6">
                        <img 
                          src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                          alt="AGORA Logo" 
                          className="w-12 h-12 object-contain mr-4 opacity-80"
                        />
                        <h3 className="text-3xl font-thin tracking-wider text-slate-800">
                          Present Your Challenge
                        </h3>
                      </div>
                      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <label htmlFor="challenge-title" className="block text-sm font-medium text-slate-600 mb-3 tracking-wide uppercase">
                          Challenge Proposition
                        </label>
                        <Input
                          id="challenge-title"
                          placeholder="e.g., Sustainable Urban Development in the Digital Age"
                          className="w-full border-slate-200 focus:border-amber-400 focus:ring-amber-400/30 bg-white/80 font-light text-lg py-4"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="challenge-description" className="block text-sm font-medium text-slate-600 mb-3 tracking-wide uppercase">
                          Detailed Exposition
                        </label>
                        <Textarea
                          id="challenge-description"
                          value={challenge}
                          onChange={(e) => setChallenge(e.target.value)}
                          placeholder="Illuminate your challenge with precision. What complexities seek resolution? What constraints must be honored? What vision guides your inquiry?"
                          className="w-full h-40 border-slate-200 focus:border-amber-400 focus:ring-amber-400/30 bg-white/80 font-light text-base leading-relaxed"
                        />
                      </div>
                      
                      <div className="flex justify-center pt-4">
                        <Button
                          onClick={handleStartDiscussion}
                          className="px-12 py-4 text-lg font-light tracking-wider text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                          disabled={!challenge.trim() || !discussionConfig}
                        >
                          Convene the Symposium
                          <ArrowRight className="w-5 h-5 ml-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works - Greek columns layout */}
              <section className="py-20 relative">
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center mb-8">
                    <img 
                      src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                      alt="AGORA Logo" 
                      className="w-12 h-12 object-contain mr-4 opacity-80"
                    />
                    <h3 className="text-4xl font-thin tracking-wider text-slate-800">The Sacred Process</h3>
                  </div>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-12">
                  {[
                    {
                      step: "Ι",
                      title: "Invocation",
                      desc: "Present your challenge to the assembled minds, each bringing millennia of wisdom",
                      gradient: "from-slate-600 to-slate-800"
                    },
                    {
                      step: "ΙΙ",
                      title: "Dialectic",
                      desc: "Watch as eight perspectives converge in iterative rounds of philosophical discourse",
                      gradient: "from-amber-500 to-amber-600"
                    },
                    {
                      step: "ΙΙΙ",
                      title: "Synthesis",
                      desc: "Receive comprehensive insights that transcend individual thought through collective wisdom",
                      gradient: "from-slate-600 to-amber-600"
                    }
                  ].map((phase, index) => (
                    <Card key={index} className="relative bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                      {/* Greek column effect */}
                      <div className="absolute top-0 left-4 w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent opacity-30"></div>
                      <div className="absolute top-0 right-4 w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent opacity-30"></div>
                      
                      <CardHeader className="text-center pb-6">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                          <span className="text-3xl font-thin text-white tracking-wider">{phase.step}</span>
                        </div>
                        <CardTitle className="text-xl font-light tracking-wide text-slate-800">{phase.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-slate-600 leading-relaxed font-light">
                          {phase.desc}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-0">
            <ExpertProfiles />
          </TabsContent>

          <TabsContent value="discussion" className="mt-0">
            <DiscussionInterface challenge={challenge} discussionConfig={discussionConfig} />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <ReportsModule />
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
                  src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
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
              <h4 className="text-lg font-light tracking-wide mb-6 text-amber-300">The Assembly</h4>
              <ul className="space-y-3 text-slate-300 font-light">
                <li>Eight Immortal Minds</li>
                <li>Iterative Discourse</li>
                <li>Synthesis of Wisdom</li>
                <li>Transcendent Insights</li>
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
