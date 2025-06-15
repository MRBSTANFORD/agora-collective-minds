
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ExpertProfiles from '@/components/ExpertProfiles';
import DiscussionInterface from '@/components/DiscussionInterface';
import ReportsModule from '@/components/ReportsModule';
import { DiscussionConfig } from "@/components/DiscussionConfigPanel";
import HeroSection from '@/components/HeroSection';
import ChallengeInputSection from '@/components/ChallengeInputSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import InteractiveDemo from '@/components/InteractiveDemo';
import FeaturesComparison from '@/components/FeaturesComparison';
import ApiCostCalculator from '@/components/ApiCostCalculator';
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';
import { defaultExperts, createDefaultConfig } from '@/config/defaultExperts';

const Index = () => {
  const [challenge, setChallenge] = useState('');
  const [rounds, setRounds] = useState(5);
  const [activeTab, setActiveTab] = useState('home');
  const [discussionStarted, setDiscussionStarted] = useState(false);
  const [discussionMessages, setDiscussionMessages] = useState<any[]>([]);
  const [isDiscussionComplete, setIsDiscussionComplete] = useState(false);

  // Initialize with default configuration
  const [discussionConfig, setDiscussionConfig] = useState<DiscussionConfig>(
    createDefaultConfig(rounds)
  );

  // Update config when rounds change
  const handleRoundsChange = (newRounds: number) => {
    console.log('📊 Updating rounds:', newRounds);
    setRounds(newRounds);
    setDiscussionConfig(prev => ({
      ...prev,
      rounds: newRounds
    }));
  };

  // Properly handle configuration changes from DiscussionConfigPanel
  const handleConfigChange = (newConfig: DiscussionConfig) => {
    console.log('🔧 Updating discussion config:', {
      rounds: newConfig.rounds,
      expertsCount: newConfig.experts.length,
      expertsWithKeys: newConfig.experts.filter(e => e.apiKey && e.apiKey.trim() !== '').length
    });
    
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
      console.log('🚀 Starting discussion with current config:', {
        challenge: challenge.slice(0, 50) + '...',
        rounds: discussionConfig.rounds,
        experts: discussionConfig.experts.map(e => ({
          id: e.id,
          name: e.name,
          provider: e.provider,
          hasApiKey: !!(e.apiKey && e.apiKey.trim())
        }))
      });
      setDiscussionStarted(true);
      setActiveTab('discussion');
    }
  };

  const canStart = challenge.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        discussionStarted={discussionStarted}
      />

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
              
              <InteractiveDemo />
              
              <FeaturesComparison />
              
              <ApiCostCalculator />
              
              <TestimonialsSection />
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

      <AgoraFooter />
    </div>
  );
};

export default Index;
