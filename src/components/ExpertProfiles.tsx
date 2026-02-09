import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import ExpertSwapDialog from './ExpertSwapDialog';
import { AlternativeExpert } from '@/config/alternativeMinds';
import { getExpertImage, getExpertDomain } from '@/utils/expertUtils';

interface ExpertData {
  id: string;
  name: string;
  era: string;
  domain: string;
  description: string;
  image: string;
  traits: { creativity: number; skepticism: number; optimism: number };
  quote: string;
}

const defaultExpertsData: ExpertData[] = [
  { id: 'leonardo', name: 'Leonardo da Vinci', era: 'Renaissance (1452-1519)', domain: 'Art, Science, Engineering', description: 'The ultimate Renaissance polymath who bridged art and science.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg', traits: { creativity: 95, skepticism: 40, optimism: 85 }, quote: "Learning never exhausts the mind." },
  { id: 'curie', name: 'Marie Curie', era: 'Modern (1867-1934)', domain: 'Physics, Chemistry', description: 'Pioneer of radioactivity research, first woman to win a Nobel Prize.', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg', traits: { creativity: 70, skepticism: 85, optimism: 60 }, quote: "In science, we must be interested in things, not in persons." },
  { id: 'socrates', name: 'Socrates', era: 'Ancient Greece (470-399 BC)', domain: 'Philosophy', description: 'The father of Western philosophy, known for his method of questioning.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg', traits: { creativity: 60, skepticism: 90, optimism: 55 }, quote: "The only true wisdom is in knowing you know nothing." },
  { id: 'hypatia', name: 'Hypatia of Alexandria', era: 'Late Antiquity (350-415 AD)', domain: 'Mathematics, Astronomy, Philosophy', description: 'A brilliant philosopher and astronomer who advanced mathematical knowledge.', image: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png', traits: { creativity: 75, skepticism: 70, optimism: 80 }, quote: "Reserve your right to think, for even to think wrongly is better than not to think at all." },
  { id: 'einstein', name: 'Albert Einstein', era: 'Modern (1879-1955)', domain: 'Theoretical Physics', description: 'Revolutionary physicist, known for his theory of relativity.', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg', traits: { creativity: 100, skepticism: 60, optimism: 75 }, quote: "Imagination is more important than knowledge." },
  { id: 'confucius', name: 'Confucius', era: 'Ancient China (551-479 BC)', domain: 'Ethics, Governance', description: 'Influential philosopher who emphasized morality and social harmony.', image: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png', traits: { creativity: 65, skepticism: 45, optimism: 85 }, quote: "It does not matter how slowly you go as long as you do not stop." },
  { id: 'lovelace', name: 'Ada Lovelace', era: 'Victorian Era (1815-1852)', domain: 'Computing, Mathematics', description: 'Considered the first computer programmer for her work on the Analytical Engine.', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg', traits: { creativity: 90, skepticism: 50, optimism: 90 }, quote: "That brain of mine is something more than merely mortal; as time will show." },
  { id: 'machiavelli', name: 'Niccolò Machiavelli', era: 'Renaissance (1469-1527)', domain: 'Political Philosophy', description: 'Diplomat and political theorist, author of "The Prince".', image: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png', traits: { creativity: 80, skepticism: 95, optimism: 40 }, quote: "It is much safer to be feared than loved." },
];

interface ExpertProfilesProps {
  onSwapExpert?: (index: number, newExpert: AlternativeExpert) => void;
  experts?: ExpertData[];
}

const ExpertProfiles: React.FC<ExpertProfilesProps> = ({ onSwapExpert, experts }) => {
  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const displayExperts = experts || defaultExpertsData;
  const activeIds = displayExperts.map(e => e.id);

  const handleSwap = (alt: AlternativeExpert) => {
    if (swapIndex !== null && onSwapExpert) {
      onSwapExpert(swapIndex, alt);
    }
    setSwapIndex(null);
  };

  return (
    <div className="py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-wider text-slate-900 mb-4">
            The Eight Immortal Minds
          </h2>
          <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4 md:mb-6"></div>
          <p className="text-lg md:text-xl text-slate-600 font-light max-w-3xl mx-auto px-4">
            Meet the legendary thinkers who will convene in your symposium. Click <strong>Swap</strong> to replace any mind with one of 28 alternatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayExperts.map((expert, idx) => (
            <Card key={expert.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-amber-200 bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-4 md:p-6">
                <div className="text-center mb-3 md:mb-4">
                  <Avatar className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 border-2 border-white shadow-lg group-hover:scale-105 transition-transform">
                    <AvatarImage src={expert.image} alt={expert.name} />
                    <AvatarFallback className="text-base md:text-lg">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-base md:text-lg font-medium text-slate-900 mb-1">{expert.name}</h3>
                  <p className="text-xs md:text-sm text-slate-600 mb-2">{expert.era}</p>
                  <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700 border border-amber-200">
                    {expert.domain}
                  </Badge>
                </div>

                <p className="text-xs md:text-sm text-slate-700 mb-3 md:mb-4 leading-relaxed">
                  {expert.description}
                </p>

                <div className="space-y-2 mb-3 md:mb-4">
                  {(['creativity', 'skepticism', 'optimism'] as const).map(trait => (
                    <div key={trait}>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 capitalize">{trait}</span>
                        <span className="text-slate-900 font-medium">{expert.traits[trait]}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-500 ${
                            trait === 'creativity' ? 'bg-orange-400 group-hover:bg-orange-500' :
                            trait === 'skepticism' ? 'bg-blue-400 group-hover:bg-blue-500' :
                            'bg-green-400 group-hover:bg-green-500'
                          }`}
                          style={{ width: `${expert.traits[trait]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <blockquote className="text-xs italic text-slate-600 border-l-2 border-amber-200 pl-3 mb-3">
                  "{expert.quote}"
                </blockquote>

                {onSwapExpert && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-1.5 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                    onClick={() => setSwapIndex(idx)}
                  >
                    <ArrowLeftRight className="w-3 h-3" />
                    Swap Mind
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {swapIndex !== null && (
        <ExpertSwapDialog
          open
          onOpenChange={(open) => { if (!open) setSwapIndex(null); }}
          onSelect={handleSwap}
          currentExpertName={displayExperts[swapIndex]?.name || ''}
          excludeIds={activeIds}
        />
      )}
    </div>
  );
};

export default ExpertProfiles;
