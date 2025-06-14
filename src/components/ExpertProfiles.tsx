
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Leonardo_self.jpg/400px-Leonardo_self.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/400px-Marie_Curie_c._1920s.jpg',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Socrates_Louvre.jpg/400px-Socrates_Louvre.jpg',
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
    imageUrl: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/400px-Albert_Einstein_Head.jpg',
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
    imageUrl: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/400px-Ada_Lovelace_portrait.jpg',
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
    imageUrl: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Hero Section with Greek-inspired geometry */}
      <div className="relative py-20 overflow-hidden">
        {/* Greek architectural elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-slate-800 transform -skew-x-12"></div>
          <div className="absolute top-0 right-1/4 w-1 h-full bg-slate-800 transform skew-x-12"></div>
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <img 
                src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                alt="AGORA Logo" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-200 to-amber-200 rounded-full blur-sm opacity-30"></div>
            </div>
          </div>
          <h1 className="text-6xl font-thin tracking-wider mb-4" style={{ color: '#1e293b' }}>
            The Pantheon
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Eight immortal minds, each a pillar of wisdom, standing ready to illuminate your path
          </p>
        </div>
      </div>

      {/* Expert Grid - Greek temple-inspired layout */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <div key={expert.id} className="group relative">
              {/* Greek column effect */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent"></div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-t from-slate-300 to-transparent"></div>
              
              <Card className="relative h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group-hover:bg-white">
                {/* Subtle geometric pattern overlay */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                  <div className="w-full h-full bg-gradient-to-br from-amber-500 to-transparent transform rotate-45"></div>
                </div>
                
                <CardHeader className="text-center pb-4 relative">
                  {/* Portrait with sophisticated framing */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-lg group-hover:border-amber-300 transition-colors duration-300">
                      <img 
                        src={expert.imageUrl} 
                        alt={expert.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face`;
                        }}
                      />
                    </div>
                    {/* Elegant ring */}
                    <div className="absolute -inset-1 rounded-full border border-slate-200 group-hover:border-amber-300 transition-colors duration-300"></div>
                  </div>
                  
                  <CardTitle className="text-lg font-light tracking-wide text-slate-800 mb-1">
                    {expert.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-500 font-light">
                    {expert.era}
                  </CardDescription>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {expert.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Expertise</Label>
                      <p className="text-sm text-slate-700 font-light">{expert.domain}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Philosophy</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {expert.values.map((value, valueIndex) => (
                          <Badge key={valueIndex} variant="secondary" className="text-xs bg-slate-50 text-slate-600 border border-slate-200 font-light">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-light tracking-wide"
                          onClick={() => setSelectedExpert(expert)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Attune Mind
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-slate-200">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 font-light">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300">
                              <img 
                                src={expert.imageUrl} 
                                alt={expert.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            Attune {expert.name}
                          </DialogTitle>
                          <DialogDescription className="font-light">
                            Adjust the cognitive resonance to influence how this sage approaches your challenge.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="flex items-center gap-2 font-light">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Creativity
                              </Label>
                              <span className="text-sm text-slate-500">{expertTraits[expert.id]?.creativity}%</span>
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
                              <Label className="flex items-center gap-2 font-light">
                                <Brain className="w-4 h-4 text-slate-600" />
                                Skepticism
                              </Label>
                              <span className="text-sm text-slate-500">{expertTraits[expert.id]?.skepticism}%</span>
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
                              <Label className="flex items-center gap-2 font-light">
                                <Heart className="w-4 h-4 text-rose-500" />
                                Optimism
                              </Label>
                              <span className="text-sm text-slate-500">{expertTraits[expert.id]?.optimism}%</span>
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
            </div>
          ))}
        </div>
      </div>

      {/* Symposium Process - Greek agora inspired */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 py-20 relative overflow-hidden">
        {/* Greek geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #1e293b 20px, #1e293b 21px)`
               }}>
          </div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
                alt="AGORA Logo" 
                className="w-12 h-12 object-contain mr-4 opacity-80"
              />
              <h2 className="text-4xl font-thin tracking-wider text-slate-800">The Symposium</h2>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 font-light">
              Where wisdom converges in the eternal dance of dialectic
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Assembly", desc: "The council gathers, each mind bringing its unique lens to illuminate your challenge" },
              { icon: Brain, title: "Dialectic", desc: "Ideas clash and merge in the crucible of philosophical discourse" },
              { icon: Zap, title: "Synthesis", desc: "Through iterative refinement, disparate thoughts crystallize into unified insight" },
              { icon: Heart, title: "Wisdom", desc: "The collective arrives at understanding that transcends individual perspective" }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-amber-50 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <step.icon className="w-8 h-8 text-slate-600" />
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg font-light text-slate-800 mb-3 tracking-wide">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfiles;
