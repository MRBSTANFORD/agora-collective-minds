
import React, { useState, useCallback } from 'react';
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
import AgoraHeader from '@/components/AgoraHeader';
import AgoraFooter from '@/components/AgoraFooter';
import { defaultExperts, createDefaultConfig } from '@/config/defaultExperts';
import { AlternativeExpert } from '@/config/alternativeMinds';
import { getExpertImage } from '@/utils/expertUtils';

const Index = () => {
  const [challenge, setChallenge] = useState('');
  const [rounds, setRounds] = useState(5);
  const [activeTab, setActiveTab] = useState('home');
  const [discussionStarted, setDiscussionStarted] = useState(false);
  const [discussionMessages, setDiscussionMessages] = useState<any[]>([]);
  const [isDiscussionComplete, setIsDiscussionComplete] = useState(false);

  const [discussionConfig, setDiscussionConfig] = useState<DiscussionConfig>(
    createDefaultConfig(rounds)
  );

  // Expert profile data for display (synced with discussionConfig)
  const [expertProfiles, setExpertProfiles] = useState(() =>
    defaultExperts.map(e => ({
      id: e.id,
      name: e.name,
      era: getDefaultEra(e.id),
      domain: getDefaultDomain(e.id),
      description: getDefaultDescription(e.id),
      image: getExpertImage(e.id),
      traits: { ...e.cognitive },
      quote: getDefaultQuote(e.id),
    }))
  );

  const handleRoundsChange = (newRounds: number) => {
    setRounds(newRounds);
    setDiscussionConfig(prev => ({ ...prev, rounds: newRounds }));
  };

  const handleConfigChange = (newConfig: DiscussionConfig) => {
    setDiscussionConfig(newConfig);
    setRounds(newConfig.rounds);
  };

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

  const handleSwapExpert = useCallback((index: number, alt: AlternativeExpert) => {
    // Update the display profiles
    setExpertProfiles(prev => {
      const next = [...prev];
      next[index] = {
        id: alt.id,
        name: alt.name,
        era: alt.era,
        domain: alt.domain,
        description: alt.description,
        image: alt.imageUrl,
        traits: { ...alt.traits },
        quote: alt.quote,
      };
      return next;
    });

    // Update the discussion config (preserve API settings from old slot)
    setDiscussionConfig(prev => {
      const experts = [...prev.experts];
      const old = experts[index];
      experts[index] = {
        id: alt.id,
        name: alt.name,
        cognitive: { ...alt.traits },
        apiKey: old?.apiKey || '',
        provider: old?.provider || 'LLM7',
        model: old?.model || 'default',
      };
      return { ...prev, experts };
    });
  }, []);

  const canStart = challenge.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <AgoraHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        discussionStarted={discussionStarted}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="home" className="mt-0">
            <div className="space-y-16 md:space-y-20">
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
              <TestimonialsSection />
            </div>
          </TabsContent>

          <TabsContent value="experts" className="mt-0">
            <ExpertProfiles
              experts={expertProfiles}
              onSwapExpert={handleSwapExpert}
            />
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

// ---- Helper data for default expert display profiles ----
function getDefaultEra(id: string): string {
  const map: Record<string, string> = {
    leonardo: 'Renaissance (1452-1519)', curie: 'Modern (1867-1934)',
    socrates: 'Ancient Greece (470-399 BC)', hypatia: 'Late Antiquity (350-415 AD)',
    einstein: 'Modern (1879-1955)', confucius: 'Ancient China (551-479 BC)',
    lovelace: 'Victorian Era (1815-1852)', machiavelli: 'Renaissance (1469-1527)',
  };
  return map[id] || '';
}
function getDefaultDomain(id: string): string {
  const map: Record<string, string> = {
    leonardo: 'Art, Science, Engineering', curie: 'Physics, Chemistry',
    socrates: 'Philosophy', hypatia: 'Mathematics, Astronomy, Philosophy',
    einstein: 'Theoretical Physics', confucius: 'Ethics, Governance',
    lovelace: 'Computing, Mathematics', machiavelli: 'Political Philosophy',
  };
  return map[id] || '';
}
function getDefaultDescription(id: string): string {
  const map: Record<string, string> = {
    leonardo: 'The ultimate Renaissance polymath who bridged art and science.',
    curie: 'Pioneer of radioactivity research, first woman to win a Nobel Prize.',
    socrates: 'The father of Western philosophy, known for his method of questioning.',
    hypatia: 'A brilliant philosopher and astronomer who advanced mathematical knowledge.',
    einstein: 'Revolutionary physicist, known for his theory of relativity.',
    confucius: 'Influential philosopher who emphasized morality and social harmony.',
    lovelace: 'Considered the first computer programmer for her work on the Analytical Engine.',
    machiavelli: 'Diplomat and political theorist, author of "The Prince".',
  };
  return map[id] || '';
}
function getDefaultQuote(id: string): string {
  const map: Record<string, string> = {
    leonardo: 'Learning never exhausts the mind.',
    curie: 'In science, we must be interested in things, not in persons.',
    socrates: 'The only true wisdom is in knowing you know nothing.',
    hypatia: 'Reserve your right to think, for even to think wrongly is better than not to think at all.',
    einstein: 'Imagination is more important than knowledge.',
    confucius: 'It does not matter how slowly you go as long as you do not stop.',
    lovelace: 'That brain of mine is something more than merely mortal; as time will show.',
    machiavelli: 'It is much safer to be feared than loved.',
  };
  return map[id] || '';
}
