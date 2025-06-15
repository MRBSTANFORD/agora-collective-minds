import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ExpertProfiles = () => {
  const experts = [
    {
      id: 'leonardo',
      name: 'Leonardo da Vinci',
      era: 'Renaissance (1452-1519)',
      domain: 'Art, Science, Engineering',
      description: 'The ultimate Renaissance polymath who bridged art and science.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
      traits: { creativity: 95, skepticism: 40, optimism: 85 },
      quote: "Learning never exhausts the mind."
    },
    {
      id: 'curie',
      name: 'Marie Curie',
      era: 'Modern (1867-1934)',
      domain: 'Physics, Chemistry',
      description: 'Pioneer of radioactivity research, first woman to win a Nobel Prize.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg',
      traits: { creativity: 70, skepticism: 85, optimism: 60 },
      quote: "In science, we must be interested in things, not in persons."
    },
    {
      id: 'socrates',
      name: 'Socrates',
      era: 'Ancient Greece (470-399 BC)',
      domain: 'Philosophy',
      description: 'The father of Western philosophy, known for his method of questioning.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Socrates_Louvre.jpg',
      traits: { creativity: 60, skepticism: 90, optimism: 55 },
      quote: "The only true wisdom is in knowing you know nothing."
    },
    {
      id: 'hypatia',
      name: 'Hypatia of Alexandria',
      era: 'Late Antiquity (350-415 AD)',
      domain: 'Mathematics, Astronomy, Philosophy',
      description: 'A brilliant philosopher and astronomer who advanced mathematical knowledge.',
      image: '/lovable-uploads/7fa67e56-1a42-4648-be84-9213f73f953c.png',
      traits: { creativity: 75, skepticism: 70, optimism: 80 },
      quote: "Reserve your right to think, for even to think wrongly is better than not to think at all."
    },
    {
      id: 'einstein',
      name: 'Albert Einstein',
      era: 'Modern (1879-1955)',
      domain: 'Theoretical Physics',
      description: 'Revolutionary physicist, known for his theory of relativity.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      traits: { creativity: 100, skepticism: 60, optimism: 75 },
      quote: "Imagination is more important than knowledge."
    },
    {
      id: 'confucius',
      name: 'Confucius',
      era: 'Ancient China (551-479 BC)',
      domain: 'Ethics, Governance',
      description: 'Influential philosopher who emphasized morality and social harmony.',
      image: '/lovable-uploads/439f1d74-152a-43a7-9aac-9aa5efa8e31d.png',
      traits: { creativity: 65, skepticism: 45, optimism: 85 },
      quote: "It does not matter how slowly you go as long as you do not stop."
    },
    {
      id: 'lovelace',
      name: 'Ada Lovelace',
      era: 'Victorian Era (1815-1852)',
      domain: 'Computing, Mathematics',
      description: 'Considered the first computer programmer for her work on the Analytical Engine.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg',
      traits: { creativity: 90, skepticism: 50, optimism: 90 },
      quote: "That brain of mine is something more than merely mortal; as time will show."
    },
    {
      id: 'machiavelli',
      name: 'Niccolò Machiavelli',
      era: 'Renaissance (1469-1527)',
      domain: 'Political Philosophy',
      description: 'Diplomat and political theorist, author of "The Prince".',
      image: '/lovable-uploads/d1f7c4e9-a220-4971-a95f-c627572fd57f.png',
      traits: { creativity: 80, skepticism: 95, optimism: 40 },
      quote: "It is much safer to be feared than loved."
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-thin tracking-wider text-slate-900 mb-4">
            The Eight Immortal Minds
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
            Meet the legendary thinkers who will convene in your symposium, each bringing their unique perspective to illuminate your challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experts.map((expert) => (
            <Card key={expert.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-amber-200 bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-white shadow-lg group-hover:scale-105 transition-transform">
                    <AvatarImage src={expert.image} alt={expert.name} />
                    <AvatarFallback className="text-lg">{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-lg font-medium text-slate-900 mb-1">{expert.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{expert.era}</p>
                  <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-700 border border-amber-200">
                    {expert.domain}
                  </Badge>
                </div>

                <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                  {expert.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Creativity</span>
                    <span className="text-slate-900 font-medium">{expert.traits.creativity}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div 
                      className="bg-orange-400 h-1 rounded-full transition-all duration-500 group-hover:bg-orange-500" 
                      style={{ width: `${expert.traits.creativity}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Skepticism</span>
                    <span className="text-slate-900 font-medium">{expert.traits.skepticism}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div 
                      className="bg-blue-400 h-1 rounded-full transition-all duration-500 group-hover:bg-blue-500" 
                      style={{ width: `${expert.traits.skepticism}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Optimism</span>
                    <span className="text-slate-900 font-medium">{expert.traits.optimism}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div 
                      className="bg-green-400 h-1 rounded-full transition-all duration-500 group-hover:bg-green-500" 
                      style={{ width: `${expert.traits.optimism}%` }}
                    ></div>
                  </div>
                </div>

                <blockquote className="text-xs italic text-slate-600 border-l-2 border-amber-200 pl-3">
                  "{expert.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertProfiles;
