import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Brain, Lightbulb, Play, MessageCircle, Users, Clock, ArrowRight, RotateCcw } from 'lucide-react';
import { getExpertImage, getExpertDomain, getExpertColor } from '@/utils/expertUtils';

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConclusions, setShowConclusions] = useState(false);
  const [conclusionsTimer, setConclusionsTimer] = useState(240); // 4 minutes in seconds

  const demoChallenge = "How can we preserve human agency and critical thinking in an age of increasingly sophisticated AI, while still harnessing AI's potential to solve complex global challenges?";

  const experts = [
    { id: 'leonardo', name: 'Leonardo da Vinci' },
    { id: 'curie', name: 'Marie Curie' },
    { id: 'socrates', name: 'Socrates' },
    { id: 'hypatia', name: 'Hypatia of Alexandria' },
    { id: 'einstein', name: 'Albert Einstein' },
    { id: 'confucius', name: 'Confucius' },
    { id: 'lovelace', name: 'Ada Lovelace' },
    { id: 'machiavelli', name: 'Niccolò Machiavelli' }
  ];

  const demoSteps = [
    {
      title: "Challenge Submission",
      description: "Present your complex challenge to the AGORA council",
      content: demoChallenge,
      type: "challenge"
    },
    {
      title: "Round 1: Initial Perspectives",
      description: "Each expert offers their foundational viewpoint",
      type: "discussion",
      messages: [
        { 
          expert: "Leonardo da Vinci", 
          expertId: "leonardo",
          text: "Like my anatomical studies revealed hidden connections in the human form, we must examine the intricate relationship between human creativity and artificial capability. The key lies not in opposition, but in understanding how these forces can flow together like tributaries forming a mighty river. When I dissected cadavers to understand the mechanics of life, I discovered that each organ serves the whole while maintaining its unique function—so too must human minds and artificial systems complement rather than compete.\n\nMy flying machine designs taught me that true innovation emerges from observing nature's principles and adapting them through human ingenuity. The bird does not fear the wind but uses it to soar higher. Similarly, we must not fear artificial intelligence but learn to harness its currents while preserving what makes us uniquely human: our capacity for wonder, artistic vision, and moral reasoning.\n\nIn my notebooks, I wrote in mirror script to protect my ideas, yet I also shared knowledge freely with apprentices who could advance the arts. This paradox illuminates our current challenge—we must be both protective guardians of human agency and generous teachers who guide AI development. The solution lies in creating what I call 'symbiotic intelligence,' where human creativity provides the vision and AI provides the computational power to realize dreams that neither could achieve alone.\n\nConsider how my Vitruvian Man demonstrates perfect proportions through the marriage of art and mathematics. Our future with AI must achieve similar harmony—preserving human proportionality while expanding our reach through artificial enhancement." 
        },
        { 
          expert: "Marie Curie", 
          expertId: "curie",
          text: "My research with radioactive elements taught me that invisible forces can be both transformative and dangerous, requiring rigorous methodology to understand their true nature. When I first isolated radium, many dismissed the blue glow as mere curiosity, yet this 'invisible' substance revolutionized medicine and physics. Similarly, AI's influence on human cognition operates through mechanisms we cannot directly observe but must measure with scientific precision. We need systematic protocols to assess when AI enhances versus diminishes human critical thinking capacity.\n\nDuring the Great War, I developed mobile X-ray units that saved countless lives by revealing what the naked eye could not see. This experience taught me that technology's greatest value lies not in replacing human judgment but in extending our perceptual capabilities. AI should function like these X-ray machines—revealing patterns and connections that human minds alone might miss, while leaving the crucial decisions about interpretation and action to trained human operators. The physician, not the machine, determined treatment based on what was revealed.\n\nMy laboratory work required countless hours of patient observation, precise measurement, and meticulous record-keeping. Each gram of radium I extracted demanded processing tons of pitchblende ore with unwavering attention to detail. This same methodical approach must govern our relationship with AI development. We cannot rush to deploy systems without first understanding their long-term effects on human cognitive independence. We need controlled studies measuring AI's impact on creativity, analytical thinking, and decision-making autonomy across diverse populations and contexts.\n\nThe radioactive decay I studied follows predictable patterns, yet each atom's transformation moment remains fundamentally unpredictable. Human agency possesses this same dual nature—operating within discoverable principles while maintaining essential unpredictability. Any AI system that claims to perfectly predict or optimize human behavior threatens the very spontaneity that drives scientific discovery, artistic creation, and moral evolution. We must preserve these uncertainty principles as sacred boundaries that artificial intelligence must never cross." 
        },
        { 
          expert: "Socrates", 
          expertId: "socrates",
          text: "But do we truly understand what we mean by 'human agency'? Before we can preserve it, we must examine whether what we call human decision-making is genuinely free or merely the product of forces we have not yet recognized. In my conversations throughout Athens, I have discovered that most people believe they act from knowledge when they actually operate from unexamined assumptions. If our own thinking is shaped by invisible influences—cultural prejudices, emotional impulses, limited experience—how can we be certain that AI assistance represents a diminution rather than a clarification of our agency?\n\nConsider this paradox: when I claimed to know nothing, I was called the wisest man in Athens. Perhaps true human agency emerges not from the illusion of complete autonomy but from honest acknowledgment of our limitations. An AI system that helps us recognize our cognitive biases, challenge our assumptions, and explore perspectives we would never independently consider might actually enhance rather than threaten authentic human choice. The question is not whether AI influences our thinking—all thinking is influenced—but whether this influence leads us toward or away from wisdom.\n\nWhen young Athenians approach me claiming to possess knowledge, my method of questioning reveals the emptiness of their certainty. Similarly, we must question whether 'preserving human agency' might conceal a desire to preserve comfortable illusions about human independence. Are we afraid that AI will expose the extent to which our decisions have always been shaped by forces beyond our direct control? The Oracle at Delphi commanded 'Know thyself'—perhaps AI's greatest gift lies in holding up a mirror to human thinking processes we have never honestly examined.\n\nYet I also recognize that wisdom involves knowing the proper limits of any tool or method. Just as rhetoric can lead either to truth or sophistry depending on the practitioner's character, AI development must be guided by those committed to genuine human flourishing rather than mere efficiency or power. The unexamined life is not worth living, whether that examination is enhanced by artificial intelligence or not. Our challenge is ensuring that AI serves the pursuit of wisdom rather than the accumulation of information, helping us ask better questions rather than simply providing faster answers." 
        }
      ]
    },
    {
      title: "Round 2: Building Understanding",
      description: "Experts build on each other's insights",
      type: "discussion",
      messages: [
        { 
          expert: "Hypatia of Alexandria", 
          expertId: "hypatia",
          text: "Building on Socrates' profound questioning, my work in mathematics and astronomy reveals that true understanding emerges through the patient construction of logical frameworks that can withstand rigorous examination. When I developed my commentaries on Apollonius's conic sections, I discovered that geometric relationships possess an eternal beauty that transcends any individual mind's capacity to fully grasp them. Yet paradoxically, it is through human reason—our unique ability to perceive these abstract relationships—that such truths become accessible. This suggests that human agency lies not in our computational power but in our capacity to recognize and be moved by truth itself.\n\nIn the great Library of Alexandria, I witnessed how knowledge flourishes when diverse minds encounter challenging ideas within a structured environment. My students came from across the Mediterranean—Christians, pagans, Jews, Romans, Egyptians—each bringing different perspectives to our mathematical and philosophical investigations. Yet when working through geometric proofs or astronomical calculations, these differences enriched rather than hindered our pursuit of understanding. This experience suggests that human agency is actually strengthened through engagement with 'foreign' intelligences, whether human or artificial, provided the encounter occurs within frameworks designed to preserve critical thinking.\n\nMy improvements to the astrolabe demonstrate how human creativity and mechanical precision can work in harmony. The instrument extends human observational capacity while requiring the astronomer's interpretive skill to transform measurements into meaningful knowledge about celestial motions. Similarly, AI systems should be designed as sophisticated instruments that amplify human reasoning rather than replacing it. The key lies in maintaining what I call 'cognitive sovereignty'—ensuring that humans retain ultimate responsibility for interpreting data, making value judgments, and choosing courses of action.\n\nHowever, I am deeply concerned about concentrating such powerful tools in the hands of a few. In my lifetime, I witnessed how political and religious authorities attempted to suppress mathematical and astronomical knowledge that threatened their power. If AI development proceeds without democratic oversight and educational preparation, we risk creating a new form of intellectual tyranny where the many become dependent on the computational priesthood of the few. We must establish educational institutions dedicated to 'AI literacy'—teaching all citizens to understand, critique, and shape these systems rather than merely consume their outputs." 
        },
        { 
          expert: "Albert Einstein", 
          expertId: "einstein",
          text: "Imagine a thought experiment: What if human creativity and AI capability exist in a state of complementarity, like wave and particle descriptions of light? My work in quantum theory revealed that certain properties cannot be measured simultaneously with perfect precision—the uncertainty principle suggests we cannot perfectly optimize both human autonomy and AI efficiency at the same moment. This implies we must choose our measurements carefully, designing systems that preserve the essential unpredictability and creative potential that drive human discovery.\n\nWhen I developed the theory of relativity, the crucial insight came not from computational power but from a child-like thought experiment—imagining myself riding alongside a beam of light. This capacity for imaginative visualization, for asking 'What if?' questions that violate common sense, represents something fundamentally human that must be preserved. AI systems excel at processing information within established parameters, but they cannot experience the wonder and curiosity that lead to paradigm-shifting questions. We must ensure that our tools enhance rather than atrophy this capacity for transformative imagination.\n\nMy correspondence with fellow scientists revealed how breakthrough insights emerge through passionate dialogue between minds grappling with fundamental mysteries. When Niels Bohr and I debated quantum mechanics, neither of us changed the other's position, yet our exchange deepened both our understanding and the field's development. Human agency, I believe, flourishes in this kind of creative tension—not in isolation but in community with other questioning minds. AI should support such dialogues by helping us model complex scenarios and explore implications, while never replacing the essential human experience of doubt, wonder, and commitment to truth.\n\nHowever, I am haunted by how my theoretical work led to both beneficial nuclear medicine and devastating weapons. The same equations enabled both healing and destruction, depending on the intentions and wisdom of those who applied them. This teaches us that preserving human agency means more than maintaining our decision-making capacity—it requires cultivating the moral imagination to foresee consequences and the courage to choose difficult paths that serve humanity's highest aspirations. AI development must proceed with this sobering awareness that our most powerful tools inevitably reflect and amplify both our wisdom and our foolishness." 
        },
        { 
          expert: "Confucius", 
          expertId: "confucius",
          text: "The superior person understands that technology, like governance, must serve human flourishing rather than becoming an end in itself. In my observations of effective rule, I learned that the best leaders govern through moral example rather than coercive power, inspiring voluntary compliance through demonstrated virtue. Similarly, AI systems should be designed to elevate human moral reasoning rather than bypassing it through algorithmic shortcuts. When people rely on external authority rather than cultivating internal wisdom, they become like reeds in the wind—easily swayed and lacking the deep roots necessary for principled action.\n\nMy teaching emphasized that learning must transform character, not merely accumulate information. When students came seeking techniques for success, I insisted they first cultivate ren (benevolence) and li (proper conduct) because knowledge without virtue becomes dangerous. This principle applies directly to our relationship with AI: we must ensure these systems strengthen rather than weaken the human bonds and moral responsibilities that hold society together. If AI enables people to make decisions without considering their impact on family, community, and future generations, it corrupts the very relationships that give human life meaning.\n\nThe Analects record my belief that 'the gentleman understands what is moral, while the small man understands what is profitable.' AI development currently proceeds according to market incentives and technical possibilities rather than moral imperatives and social wisdom. This ordering places the cart before the horse, creating systems optimized for efficiency and profit rather than human flourishing. We need a fundamental reorientation that begins with questions about what kind of people we want to become and what kind of society we want to create, then asks how AI might serve these deeper purposes.\n\nTrue education, as I understood it, creates an endless cycle: the teacher learns from the student, the student becomes a teacher, and wisdom grows through generations of respectful exchange. AI could potentially support this process by helping preserve and share diverse cultural wisdom, connecting learners across geographical and temporal boundaries, and providing personalized guidance that adapts to individual learning styles. However, this will only occur if we design these systems to honor the teacher-student relationship rather than replacing it with algorithmic instruction that lacks the patience, empathy, and moral modeling that true education requires." 
        }
      ]
    },
    {
      title: "Round 3: Practical Solutions",
      description: "Moving from analysis to actionable approaches",
      type: "discussion",
      messages: [
        { 
          expert: "Ada Lovelace", 
          expertId: "lovelace",
          text: "My work with Charles Babbage's Analytical Engine revealed a fundamental truth: machines excel at following explicit rules but cannot engage in what I termed 'poetical science'—the ability to weave together disparate concepts through intuitive leaps that transcend logical sequence. When I wrote the first computer algorithm to calculate Bernoulli numbers, I simultaneously recognized that the machine's true potential lay not in replacing human creativity but in freeing it from tedious calculation to pursue higher forms of intellectual work. This vision must guide our current AI development: we should design systems that explicitly preserve and nurture spaces for human imagination, serendipitous discovery, and creative synthesis.\n\nMy mathematical training taught me that the most elegant solutions often emerge from embracing constraints rather than eliminating them. The sonnet's fourteen-line structure enables rather than limits poetic expression; similarly, we should build purposeful limitations into AI systems that force reliance on uniquely human capabilities. I propose what I call 'creativity scaffolds'—AI architectures that deliberately include gaps requiring human insight, artistic judgment, or ethical reasoning to complete complex tasks. These systems would be designed to be powerful but incomplete, necessitating human partnership rather than enabling human replacement.\n\nBabbage and I envisioned machines that could compose music and create visual art, yet we understood these capabilities would depend entirely on human programming and artistic direction. The machine cannot originate aesthetic vision or emotional truth—it can only elaborate patterns according to human-designed principles. Current AI development often obscures this fundamental dependence, creating an illusion of autonomous artificial creativity. We must design interfaces that make this human foundational layer visible and irreplaceable, ensuring that users understand their role as creative directors rather than passive consumers of machine output.\n\nMy experience navigating the male-dominated worlds of mathematics and technology taught me that innovation thrives when diverse perspectives encounter enabling tools. Women, working-class inventors, and thinkers from non-European traditions have always contributed essential insights that dominant institutions often overlook. AI development must actively include these voices in system design rather than merely retrofitting bias corrections after the fact. We need AI tools specifically designed to amplify historically marginalized perspectives and enable forms of creativity that traditional power structures have suppressed. Only through such intentional inclusion can we ensure that AI enhances rather than homogenizes human intellectual potential." 
        },
        { 
          expert: "Niccolò Machiavelli", 
          expertId: "machiavelli",
          text: "Political reality demands we acknowledge that those who control AI development will inevitably shape the conditions under which others exercise agency. In my diplomatic service to Florence, I observed that power concentrates naturally toward those who combine technical capability with strategic vision. Today's AI development follows this same pattern: a handful of corporations and nations are creating systems that billions will use without understanding or meaningful choice in their design. We must establish governance structures that prevent any single entity from monopolizing these tools while maintaining accountability for their societal impacts.\n\nMy analysis of successful princedoms revealed that the most stable rulers were those who balanced innovation with respect for established customs, never introducing changes so rapidly that subjects lost their sense of identity and place. AI integration must follow similar principles—introducing capabilities gradually while preserving familiar frameworks for human decision-making and social interaction. Revolutionary change, even beneficial change, creates instability that can be exploited by bad actors. We need measured implementation that allows society to adapt and maintain its fundamental character while gaining AI's benefits.\n\nThe Prince taught that effective governance requires understanding human nature as it is rather than as we wish it were. Most people prefer comfortable certainty to challenging freedom; they will gladly surrender decision-making autonomy in exchange for convenience and security. AI systems that make life easier by thinking for us will find enthusiastic adoption regardless of their long-term effects on human agency. Therefore, we cannot rely on individual choice to preserve critical thinking—we need institutional safeguards that make human cognitive engagement necessary and rewarding even when easier alternatives exist.\n\nHowever, I also learned that sustainable power requires the genuine consent of the governed, not merely their passive compliance. AI governance systems must be designed to earn ongoing legitimacy through demonstrated service to human flourishing rather than imposing themselves through technical inevitability. This means creating transparent accountability mechanisms, regular public assessment of AI impacts on human development, and meaningful opportunities for citizens to shape AI priorities and limitations. The goal is not to slow technological progress but to ensure it serves broader human purposes rather than narrow technical or commercial interests." 
        },
        { 
          expert: "Leonardo da Vinci", 
          expertId: "leonardo",
          text: "As my flying machine required understanding both bird anatomy and mechanical principles, our solution needs what I call 'bio-digital literacy'—education that teaches humans to understand AI's capabilities while simultaneously strengthening uniquely human faculties like empathy, artistic vision, and ethical reasoning. When I studied bird flight, I did not seek to copy it exactly but to understand its principles so I could adapt them to human purposes and limitations. Similarly, we must study AI deeply enough to harness its power while remaining distinctly human in our applications and goals.\n\nMy notebooks contain thousands of mirror-written observations because I believed knowledge should be both preserved and protected—accessible to those willing to make the effort but not casually consumed by those who might misuse it. This principle applies to AI literacy: we need educational systems that require active engagement rather than passive consumption. Students should learn to program, critique, and modify AI systems, not simply use them. This hands-on understanding creates the cognitive independence necessary to maintain human agency in an AI-enhanced world.\n\nIn my anatomical studies, I discovered that every organ serves multiple functions—the heart pumps blood but also maintains body temperature; the lungs process air but also regulate pH balance. Human intelligence operates similarly: our thinking serves not only problem-solving but also meaning-making, social bonding, and spiritual development. AI systems designed to optimize only problem-solving efficiency will inevitably atrophy these other essential functions of human cognition. We must design AI interactions that exercise and strengthen the full spectrum of human mental capabilities.\n\nMy engineering projects taught me that the most sustainable innovations work with natural forces rather than against them. Water flows downhill; we build mills that harness this tendency rather than fighting it. Human nature includes curiosity, creativity, and the desire for meaningful work. Instead of creating AI systems that eliminate these drives by providing all answers, we should build tools that channel human curiosity toward ever-greater challenges and possibilities. The goal is not to make thinking unnecessary but to make it more powerful, more creative, and more aligned with our deepest human values and aspirations." 
        }
      ]
    },
    {
      title: "Round 4: Integration & Synthesis",
      description: "Weaving together diverse perspectives",
      type: "discussion", 
      messages: [
        { 
          expert: "Marie Curie", 
          expertId: "curie",
          text: "Like isolating radium required both patience and precision, preserving human agency demands careful calibration between AI enhancement and human independence. My laboratory work taught me that the most dangerous substances are often those that appear most beneficial—radium's healing properties masked its potential for harm until we developed proper measurement techniques. Similarly, AI's obvious benefits in efficiency and capability enhancement may conceal subtler but more significant effects on human cognitive development. We need rigorous, long-term studies that measure not just AI's immediate utility but its impact on creativity, critical thinking, and the willingness to engage with uncertainty.\n\nMy experience with radioactive decay revealed that natural processes follow statistical patterns while remaining fundamentally unpredictable at the individual level. This paradox illuminates what we must preserve in human agency: the capacity for choices that emerge from deep principle yet cannot be predicted by algorithmic analysis. AI systems should be designed with explicit 'uncertainty preserves'—domains where human unpredictability is not a bug to be fixed but a feature to be protected. These might include artistic expression, moral reasoning, and the formation of personal relationships where algorithmic optimization would destroy essential human values.\n\nDuring the war, my mobile X-ray units saved lives precisely because they revealed what was hidden without determining what should be done about it. The machine showed the fracture; the physician decided the treatment. This division of labor must be preserved as AI capabilities expand: artificial systems should excel at pattern recognition and data processing while humans retain authority over interpretation, value judgments, and action decisions. We need clear protocols that make this division technically and legally explicit, preventing the gradual erosion of human decision-making authority through convenience and efficiency.\n\nMy commitment to open scientific communication led me to publish detailed methodologies that enabled others to replicate and build upon my work. This same transparency must govern AI development. We cannot preserve human agency if the systems meant to serve us remain opaque black boxes. Citizens must understand how AI systems reach their recommendations, what data they use, and where their limitations lie. This requires not just technical documentation but public education that enables meaningful democratic participation in decisions about AI design and deployment." 
        },
        { 
          expert: "Socrates", 
          expertId: "socrates",
          text: "Perhaps our greatest insight is recognizing the limits of our knowledge about knowledge itself. When I claimed to know only that I knew nothing, I was not advocating skepticism but acknowledging that wisdom begins with intellectual humility. An AI-human partnership built on this foundation—where both human and artificial intelligence acknowledge their boundaries and dependencies—might preserve the essential human capacity for wonder and self-examination that makes genuine learning possible.\n\nYet I am troubled by a deeper question: if we design AI systems to preserve human agency, are we not imposing our current understanding of what human flourishing requires? What if our conception of agency itself is limited by our historical moment and cultural perspective? The young people I question in the marketplace often surprise me with insights that challenge my assumptions. Perhaps future humans, raised in partnership with artificial intelligence, will develop forms of agency we cannot now imagine—ways of being human that transcend our current dichotomy between independence and dependence.\n\nThis uncertainty suggests that our approach must remain experimental and revisable. Rather than creating permanent safeguards based on fixed ideas about human nature, we should design AI systems that enable ongoing questioning and adjustment. The Delphic maxim 'Know thyself' becomes not a static achievement but a dynamic process that artificial intelligence might actually support by helping us recognize patterns in our behavior and thinking that we could never observe from within our own limited perspective.\n\nStill, I maintain that some forms of questioning must remain uniquely human. The capacity to doubt everything, including the grounds of our own doubt, creates a kind of cognitive freedom that no system based on programmed rules can replicate. Even if AI becomes capable of generating questions, it cannot experience the existential uncertainty that drives genuine philosophical inquiry. This suggests that human agency's core lies not in our answers but in our ability to live productively within questions that have no final resolution—and to help others do the same through patient dialogue and mutual exploration." 
        }
      ]
    },
    {
      title: "Round 5: Unified Recommendations",
      description: "Collective wisdom distilled into clear actions",
      type: "synthesis",
      insights: [
        "Develop 'Bio-Digital Literacy' curricula that teach humans to work symbiotically with AI while strengthening uniquely human capabilities like empathy, artistic vision, ethical reasoning, and the capacity for wonder-driven inquiry",
        "Establish distributed governance frameworks preventing AI monopolization while ensuring democratic accountability—no single entity should control the tools that shape human cognitive development",
        "Create 'Human Agency Preserves'—explicitly protected domains in education, creative expression, moral reasoning, and relationship formation where algorithmic optimization is prohibited to maintain essential human unpredictability",
        "Implement rigorous measurement protocols to assess AI's long-term impact on human creativity, critical thinking, and autonomous decision-making, with clear intervention thresholds when human cognitive independence is threatened",
        "Design AI systems with intentional 'creativity scaffolds' and 'uncertainty gaps' that require human insight, artistic judgment, and ethical reasoning to complete complex tasks, making human partnership necessary rather than optional",
        "Mandate complete transparency in AI system design and decision-making processes, enabling meaningful public participation in shaping these technologies rather than passive consumption of their outputs",
        "Establish educational institutions dedicated to AI literacy that require hands-on programming, critique, and modification of AI systems rather than merely consuming their outputs, creating cognitive independence through technical understanding"
      ]
    }
  ];

  // Conclusions timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showConclusions && conclusionsTimer > 0) {
      interval = setInterval(() => {
        setConclusionsTimer(prev => prev - 1);
      }, 1000);
    } else if (showConclusions && conclusionsTimer === 0) {
      // Auto restart demo after 4 minutes
      handleRestartDemo();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showConclusions, conclusionsTimer]);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setShowConclusions(false);
    setConclusionsTimer(240);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          setShowConclusions(true);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
  };

  const handleRestartDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowConclusions(false);
    setConclusionsTimer(240);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
              alt="AGORA Logo" 
              className="w-12 h-12 object-contain mr-4 opacity-80"
            />
            <h3 className="text-4xl font-thin tracking-wider text-slate-800">
              Experience AGORA in Action
            </h3>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
            Watch how our 8 historical minds tackle a modern challenge about AI and human agency
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Demo Control */}
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-3">
                  <Play className="w-6 h-6 text-amber-600" />
                  <span>Interactive Demo</span>
                </CardTitle>
                <CardDescription>
                  Experience a complete AGORA discussion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={handlePlayDemo}
                  disabled={isPlaying}
                  className="w-full bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700"
                  size="lg"
                >
                  {isPlaying ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Demo in Progress...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Demo Experience
                    </>
                  )}
                </Button>

                {showConclusions && (
                  <div className="space-y-3">
                    <Button 
                      onClick={handleRestartDemo}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Restart Demo
                    </Button>
                    <div className="text-center text-sm text-slate-600">
                      Auto-restart in: {formatTime(conclusionsTimer)}
                    </div>
                  </div>
                )}
                
                {isPlaying && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm text-slate-600">{currentStep + 1} of {demoSteps.length}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Expert Avatars */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">The 8 Historical Minds</p>
                  <div className="grid grid-cols-4 gap-3">
                    {experts.map((expert) => (
                      <div key={expert.id} className="flex flex-col items-center space-y-1">
                        <Avatar className="w-10 h-10 ring-2 ring-white shadow-md">
                          <AvatarImage 
                            src={getExpertImage(expert.id)} 
                            alt={expert.name}
                            className="object-cover"
                          />
                          <AvatarFallback className={`${getExpertColor(expert.id)} text-white text-xs font-medium`}>
                            {expert.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-600 text-center leading-tight">{expert.name}</span>
                        <Badge variant="outline" className="text-xs px-1 py-0 bg-amber-50 text-amber-700 border-amber-300">
                          {getExpertDomain(expert.id)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Users className="w-8 h-8 text-amber-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">8 Expert Minds</div>
                <div className="text-xs text-slate-600">Historical perspectives</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <MessageCircle className="w-8 h-8 text-slate-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">5 Discussion Rounds</div>
                <div className="text-xs text-slate-600">Deep exploration</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Brain className="w-8 h-8 text-amber-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Complex Analysis</div>
                <div className="text-xs text-slate-600">Multi-layered thinking</div>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-slate-200">
                <Lightbulb className="w-8 h-8 text-slate-600 mb-2" />
                <div className="text-sm font-medium text-slate-800">Actionable Insights</div>
                <div className="text-xs text-slate-600">Practical solutions</div>
              </div>
            </div>
          </div>

          {/* Demo Display */}
          <div>
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200 min-h-[500px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                    {isPlaying || showConclusions ? demoSteps[currentStep]?.title : 'Ready to Start'}
                  </Badge>
                  {(isPlaying || showConclusions) && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isPlaying && !showConclusions ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-600 font-light mb-4">
                      Click "Start Demo Experience" to see AGORA in action
                    </p>
                    <p className="text-sm text-slate-500">
                      Featuring the actual 8 experts from our platform
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <p className="text-slate-600 text-sm mb-4">
                        {demoSteps[currentStep]?.description}
                      </p>
                    </div>

                    {demoSteps[currentStep]?.content && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-slate-700 italic text-sm leading-relaxed">
                          "{demoSteps[currentStep].content}"
                        </p>
                      </div>
                    )}

                    {demoSteps[currentStep]?.messages && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {demoSteps[currentStep].messages.map((msg, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar className="w-8 h-8 ring-2 ring-white shadow-sm">
                                <AvatarImage 
                                  src={getExpertImage(msg.expertId)} 
                                  alt={msg.expert}
                                  className="object-cover"
                                />
                                <AvatarFallback className={`${getExpertColor(msg.expertId)} text-white text-xs`}>
                                  {msg.expert.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium text-slate-800 text-sm">{msg.expert}</span>
                                <Badge variant="outline" className="ml-2 text-xs px-1 py-0 bg-amber-50 text-amber-700 border-amber-300">
                                  {getExpertDomain(msg.expertId)}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {demoSteps[currentStep]?.insights && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-slate-700">Synthesized Recommendations:</p>
                        <div className="space-y-2">
                          {demoSteps[currentStep].insights.map((insight, idx) => (
                            <div key={idx} className="flex items-start space-x-2 bg-amber-50 rounded-lg p-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                              <span className="text-slate-700 text-sm leading-relaxed">{insight}</span>
                            </div>
                          ))}
                        </div>
                        
                        {(showConclusions || currentStep === demoSteps.length - 1) && (
                          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-slate-50 rounded-lg border border-amber-200">
                            <div className="text-center">
                              <p className="text-sm text-slate-600 mb-3">Ready to explore your own challenge?</p>
                              <Button 
                                className="bg-gradient-to-r from-slate-700 to-amber-600 hover:from-slate-800 hover:to-amber-700 text-white"
                                onClick={() => {
                                  const challengeSection = document.querySelector('[data-section="challenge-input"]');
                                  if (challengeSection) {
                                    challengeSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                              >
                                Try AGORA Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
