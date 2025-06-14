
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Zap, Users, Settings } from 'lucide-react';

const experts = [
  {
    id: 'leonardo',
    name: 'Leonardo da Vinci',
    era: 'Renaissance Polymath',
    domain: 'Art & Science',
    values: ['Curiosity', 'Harmony', 'Innovation'],
    style: 'Visionary, interdisciplinary, analogical',
    description: 'The ultimate Renaissance mind, blending art and science with poetic imagination and precise observation.',
    avatar: '🎨',
    color: 'from-orange-500 to-red-500',
    traits: {
      creativity: 95,
      skepticism: 40,
      optimism: 85
    }
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    era: 'Modern Science',
    domain: 'Physics & Chemistry',
    values: ['Integrity', 'Perseverance', 'Truth'],
    style: 'Empirical, methodical, persistent',
    description: 'Pioneer scientist who broke barriers with rigorous methodology and unwavering dedication to discovery.',
    avatar: '⚛️',
    color: 'from-blue-500 to-cyan-500',
    traits: {
      creativity: 70,
      skepticism: 85,
      optimism: 60
    }
  },
  {
    id: 'socrates',
    name: 'Socrates',
    era: 'Classical Philosophy',
    domain: 'Ethics & Logic',
    values: ['Wisdom', 'Truth-seeking', 'Humility'],
    style: 'Dialectical, questioning, ethical',
    description: 'Master of inquiry who reveals truth through persistent questioning and ethical reflection.',
    avatar: '🏛️',
    color: 'from-purple-500 to-indigo-500',
    traits: {
      creativity: 60,
      skepticism: 90,
      optimism: 55
    }
  },
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    era: 'Late Antiquity',
    domain: 'Mathematics & Philosophy',
    values: ['Rationality', 'Equality', 'Knowledge'],
    style: 'Logical, rational, inclusive',
    description: 'Brilliant mathematician and philosopher who championed reason and equality in ancient Alexandria.',
    avatar: '📐',
    color: 'from-emerald-500 to-teal-500',
    traits: {
      creativity: 75,
      skepticism: 70,
      optimism: 80
    }
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    era: 'Modern Physics',
    domain: 'Theoretical Physics',
    values: ['Imagination', 'Simplicity', 'Curiosity'],
    style: 'Conceptual, imaginative, norm-challenging',
    description: 'Revolutionary physicist who reimagined reality through thought experiments and elegant theories.',
    avatar: '🌌',
    color: 'from-violet-500 to-purple-500',
    traits: {
      creativity: 100,
      skepticism: 60,
      optimism: 75
    }
  },
  {
    id: 'confucius',
    name: 'Confucius',
    era: 'Ancient China',
    domain: 'Ethics & Governance',
    values: ['Harmony', 'Respect', 'Responsibility'],
    style: 'Practical wisdom, social harmony',
    description: 'Wise teacher whose ethical philosophy shaped civilizations through practical moral guidance.',
    avatar: '☯️',
    color: 'from-amber-500 to-orange-500',
    traits: {
      creativity: 65,
      skepticism: 45,
      optimism: 85
    }
  },
  {
    id: 'lovelace',
    name: 'Ada Lovelace',
    era: 'Early Computing',
    domain: 'Mathematics & Computing',
    values: ['Innovation', 'Foresight', 'Creativity'],
    style: 'Analytical, visionary, algorithmic',
    description: 'Visionary mathematician who foresaw the creative potential of computing beyond mere calculation.',
    avatar: '💻',
    color: 'from-pink-500 to-rose-500',
    traits: {
      creativity: 90,
      skepticism: 50,
      optimism: 90
    }
  },
  {
    id: 'machiavelli',
    name: 'Niccolò Machiavelli',
    era: 'Renaissance Politics',
    domain: 'Political Strategy',
    values: ['Pragmatism', 'Strategy', 'Realism'],
    style: 'Strategic, realistic, power-aware',
    description: 'Sharp political strategist who analyzed power dynamics with unflinching realism and practical wisdom.',
    avatar: '👑',
    color: 'from-red-500 to-pink-500',
    traits: {
      creativity: 80,
      skepticism: 95,
      optimism: 40
    }
  }
];

const ExpertProfiles = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertTraits, setExpertTraits] = useState(
    experts.reduce((acc, expert) => ({
      ...acc,
      [expert.id]: expert.traits
    }), {})
  );

  const updateTrait = (expertId, trait, value) => {
    setExpertTraits(prev => ({
      ...prev,
      [expertId]: {
        ...prev[expertId],
        [trait]: value[0]
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold text-indigo-900 mb-4">Meet Your AI Experts</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Eight brilliant minds from history, each bringing unique perspectives and expertise to your challenges.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {experts.map((expert) => (
          <Card key={expert.id} className="group hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300">
            <CardHeader className="text-center pb-4">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${expert.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {expert.avatar}
              </div>
              <CardTitle className="text-lg text-indigo-900">{expert.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {expert.era} • {expert.domain}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {expert.description}
              </p>
              
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-600">Core Values</Label>
                <div className="flex flex-wrap gap-1">
                  {expert.values.map((value, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-indigo-50 text-indigo-700">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-600">Thinking Style</Label>
                <p className="text-xs text-gray-600 italic">{expert.style}</p>
              </div>

              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-indigo-200 hover:bg-indigo-50"
                      onClick={() => setSelectedExpert(expert)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Customize
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span className="text-2xl">{expert.avatar}</span>
                        Customize {expert.name}
                      </DialogTitle>
                      <DialogDescription>
                        Adjust the personality traits to influence how this expert approaches discussions.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            Creativity
                          </Label>
                          <span className="text-sm text-gray-600">{expertTraits[expert.id]?.creativity}%</span>
                        </div>
                        <Slider
                          value={[expertTraits[expert.id]?.creativity || expert.traits.creativity]}
                          onValueChange={(value) => updateTrait(expert.id, 'creativity', value)}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-purple-500" />
                            Skepticism
                          </Label>
                          <span className="text-sm text-gray-600">{expertTraits[expert.id]?.skepticism}%</span>
                        </div>
                        <Slider
                          value={[expertTraits[expert.id]?.skepticism || expert.traits.skepticism]}
                          onValueChange={(value) => updateTrait(expert.id, 'skepticism', value)}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            Optimism
                          </Label>
                          <span className="text-sm text-gray-600">{expertTraits[expert.id]?.optimism}%</span>
                        </div>
                        <Slider
                          value={[expertTraits[expert.id]?.optimism || expert.traits.optimism]}
                          onValueChange={(value) => updateTrait(expert.id, 'optimism', value)}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8 mt-12">
        <h3 className="text-2xl font-bold text-indigo-900 mb-6 text-center">Expert Collaboration Process</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="font-semibold text-indigo-900 mb-2">Initial Perspectives</h4>
            <p className="text-sm text-gray-600">Each expert provides their unique viewpoint on your challenge</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-semibold text-indigo-900 mb-2">Cross-Pollination</h4>
            <p className="text-sm text-gray-600">Experts build upon and challenge each other's ideas</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-semibold text-indigo-900 mb-2">Synthesis</h4>
            <p className="text-sm text-gray-600">Ideas merge and evolve through iterative discussion rounds</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-indigo-900 mb-2">Consensus</h4>
            <p className="text-sm text-gray-600">Final insights emerge with actionable recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfiles;
