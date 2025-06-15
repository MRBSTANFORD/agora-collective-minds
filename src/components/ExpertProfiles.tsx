
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Star, Users, Target, Zap, Heart, Microscope, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExpertProfiles = () => {
  const experts = [
    {
      id: 'aristotle',
      name: 'Aristotle',
      title: 'The Philosophical Foundation',
      era: '384-322 BCE',
      image: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png',
      description: 'The master of systematic thinking who laid the groundwork for logic, ethics, and practical wisdom.',
      expertise: ['Logic & Reasoning', 'Ethics & Virtue', 'Political Science', 'Systematic Analysis'],
      approach: 'Brings methodical analysis and ethical frameworks to every discussion',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'leonardo',
      name: 'Leonardo da Vinci',
      title: 'The Renaissance Synthesizer',
      era: '1452-1519',
      image: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
      description: 'The ultimate interdisciplinary mind who seamlessly bridged art, science, and engineering.',
      expertise: ['Innovation & Creativity', 'Systems Thinking', 'Design Philosophy', 'Cross-disciplinary Integration'],
      approach: 'Connects disparate fields to create breakthrough solutions',
      icon: Star,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'hypatia',
      name: 'Hypatia of Alexandria',
      title: 'The Rational Illuminator',
      era: '350-415 CE',
      image: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
      description: 'The brilliant mathematician and astronomer who championed reason and scientific inquiry.',
      expertise: ['Mathematics & Logic', 'Astronomical Sciences', 'Rational Analysis', 'Educational Leadership'],
      approach: 'Applies rigorous mathematical thinking and evidence-based reasoning',
      icon: Microscope,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'confucius',
      name: 'Confucius',
      title: 'The Social Harmonizer',
      era: '551-479 BCE',
      image: '/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png',
      description: 'The sage who understood the delicate balance between individual growth and collective harmony.',
      expertise: ['Social Ethics', 'Leadership Philosophy', 'Moral Development', 'Harmonious Relationships'],
      approach: 'Seeks solutions that honor both personal integrity and social good',
      icon: Users,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'sun_tzu',
      name: 'Sun Tzu',
      title: 'The Strategic Realist',
      era: '544-496 BCE',
      image: '/placeholder.svg',
      description: 'The master strategist who sees beyond surface appearances to underlying power dynamics.',
      expertise: ['Strategic Thinking', 'Competitive Analysis', 'Risk Assessment', 'Tactical Planning'],
      approach: 'Analyzes power structures and competitive landscapes with ruthless clarity',
      icon: Target,
      color: 'from-red-500 to-rose-600'
    },
    {
      id: 'tesla',
      name: 'Nikola Tesla',
      title: 'The Visionary Innovator',
      era: '1856-1943',
      image: '/placeholder.svg',
      description: 'The electrical genius who saw possibilities others deemed impossible.',
      expertise: ['Technological Innovation', 'Systems Engineering', 'Future Thinking', 'Scientific Breakthroughs'],
      approach: 'Envisions transformative technologies and breakthrough solutions',
      icon: Zap,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'rumi',
      name: 'Rumi',
      title: 'The Wisdom Synthesizer',
      era: '1207-1273',
      image: '/placeholder.svg',
      description: 'The mystical poet who found profound truth in the union of opposites.',
      expertise: ['Spiritual Wisdom', 'Paradox Resolution', 'Human Nature', 'Transformational Insight'],
      approach: 'Finds deeper meaning and resolves apparent contradictions with wisdom',
      icon: Heart,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'machiavelli',
      name: 'Niccolò Machiavelli',
      title: 'The Pragmatic Realist',
      era: '1469-1527',
      image: '/placeholder.svg',
      description: 'The political theorist who understood the practical realities of power and governance.',
      expertise: ['Political Strategy', 'Pragmatic Solutions', 'Power Dynamics', 'Realistic Assessment'],
      approach: 'Focuses on what works in practice, not just what sounds good in theory',
      icon: Crown,
      color: 'from-slate-500 to-gray-600'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-thin tracking-wider text-slate-800 mb-6">
          The Eight Immortal Minds
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
        <p className="text-xl text-slate-600 font-light max-w-4xl mx-auto leading-relaxed">
          Meet the historical figures whose wisdom, insight, and expertise guide every AGORA discussion. 
          Each brings their unique perspective, creating a rich tapestry of human knowledge and experience.
        </p>
        <div className="mt-8">
          <Button asChild variant="outline" className="bg-white/80 hover:bg-white">
            <Link to="/eight-immortal-minds">Learn More About Our Experts</Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {experts.map((expert, index) => (
          <Card 
            key={expert.id} 
            className="relative group hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${expert.color}`}></div>
            
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${expert.color} flex items-center justify-center shadow-lg`}>
                  <expert.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-xl font-light tracking-wide text-slate-800 mb-2">
                {expert.name}
              </CardTitle>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                  {expert.era}
                </Badge>
                <CardDescription className="text-slate-600 font-medium">
                  {expert.title}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {expert.description}
              </p>
              
              <div>
                <h4 className="text-sm font-medium text-slate-800 mb-2">Core Expertise:</h4>
                <div className="flex flex-wrap gap-1">
                  {expert.expertise.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-slate-50 text-slate-600">
                      {skill}
                    </Badge>
                  ))}
                  {expert.expertise.length > 2 && (
                    <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                      +{expert.expertise.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  "{expert.approach}"
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-2xl font-light text-slate-800 mb-4">
            Collective Intelligence in Action
          </h3>
          <p className="text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
            When these eight minds collaborate, their diverse perspectives create a rich dialogue that transcends 
            any single viewpoint. Each expert challenges and builds upon the others' ideas, leading to insights 
            that emerge from their collective wisdom rather than individual brilliance alone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfiles;
