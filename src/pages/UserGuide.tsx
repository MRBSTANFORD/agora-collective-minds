
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Users, Flame, Settings, Scroll, HelpCircle, Columns, Cog, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { ApiSetupGuideContent } from "./ApiSetupGuide";

// TABS TITLES
const GUIDE_TABS = [{
  tab: "welcome",
  label: "Welcome",
  icon: BookOpen
}, {
  tab: "getting-started",
  label: "Getting Started",
  icon: ArrowRight
}, {
  tab: "experts",
  label: "The Minds",
  icon: Users
}, {
  tab: "symposium",
  label: "Symposium Process",
  icon: Flame
}, {
  tab: "api",
  label: "API Setup & Config",
  icon: Cog
}, {
  tab: "reports",
  label: "Reports & Insights",
  icon: Scroll
}, {
  tab: "advanced",
  label: "Advanced & Tips",
  icon: HelpCircle
}];
export default function UserGuide() {
  // Default to 'welcome' tab
  const [tab, setTab] = React.useState('welcome');
  return <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Guide HEADER */}
      <div className="mb-6 flex items-center gap-6">
        <img src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png" alt="Agora Logo" className="w-16 h-16 object-contain drop-shadow-lg" />
        <div>
          <h1 className="text-3xl font-thin tracking-wider text-slate-900 mb-1">AGORA User Guide</h1>
          <p className="text-lg text-amber-600 font-light">
            Your journey to collective, transcendent wisdom starts here.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex flex-wrap gap-2 mb-8 bg-slate-50 p-2 rounded-lg border border-slate-100">
          {GUIDE_TABS.map(({
          tab: t,
          label,
          icon: Icon
        }) => <TabsTrigger key={t} value={t} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="py-0">{label}</span>
            </TabsTrigger>)}
        </TabsList>

        {/* WELCOME */}
        <TabsContent value="welcome">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 my-0 py-[20px]">
              <BookOpen className="w-5 h-5 text-amber-500" />
              Welcome to AGORA
            </h2>
            <p>
              <strong>AGORA</strong> is an innovative platform blending the timeless concept of the Greek <span className="italic">agora</span>—the marketplace of ideas—with state-of-the-art AI. Our mission is to orchestrate profound, multi-perspective dialogues between legendary thinkers, distilling collective intelligence and transcending individual insight.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><span className="font-semibold text-amber-700">Concept:</span> Simulate an eternal forum, where history’s greatest minds collaborate to tackle today's challenges.</li>
              <li><span className="font-semibold text-amber-700">Objective:</span> Bridge ancient wisdom with modern problems, deepening collective understanding.</li>
              <li><span className="font-semibold text-amber-700">Vision:</span> Empower users to summon legendary insight, uncover breakthroughs, and create wisdom together.</li>
            </ul>
            <div>
              AGORA’s foundation includes the <strong>Eight Immortal Minds</strong> (our expert panel), <strong>Iterative Discourse</strong> (multi-round debate), <strong>Synthesis of Wisdom</strong> (AI-powered reports), and <strong>Transcendent Insights</strong> (breakthrough idea discovery).
            </div>
          </section>
        </TabsContent>

        {/* GETTING STARTED */}
        <TabsContent value="getting-started">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 py-[20px]">
              <ArrowRight className="w-5 h-5 text-slate-700" /> Getting Started
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <span className="font-semibold">Formulate Your Challenge:</span>
                <br />On the Home page, enter your philosophical, scientific, or creative problem to gather the expert assembly.
              </li>
              <li>
                <span className="font-semibold">Configure the Symposium:</span>
                <br />Choose the number of rounds (default: 5) and tune which minds will attend and how they will think.
              </li>
              <li>
                <span className="font-semibold">[Optional] Set Up API Keys:</span>
                <br />
                For advanced providers, enter API keys for Gemini, Cohere, Groq, and more. The default (HuggingFace) models are free and work out-of-the-box.
                <br />
                <Button variant="link" className="px-0 py-0 h-auto text-amber-700" onClick={() => setTab("api")}>
                  See API Setup Tab
                </Button>
              </li>
              <li>
                <span className="font-semibold">Start the Symposium:</span>
                <br />Click "Start Symposium" to begin the discussion. AGORA will orchestrate the dialogue, synthesize wisdom, and present you with insightful reports.
              </li>
            </ol>
            <div className="mt-2">
              <strong>Tip:</strong> Most features work with free providers, but for more advanced experiences use your own API keys.
            </div>
          </section>
        </TabsContent>

        {/* EXPERTS */}
        <TabsContent value="experts">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 py-[20px]">
              <Users className="w-5 h-5 text-amber-400" /> Meet the Eight Immortal Minds
            </h2>
            <p>
              AGORA’s panels are composed of these iconic experts, each with unique perspectives:
            </p>
            <ul className="list-disc pl-8 grid md:grid-cols-2 gap-x-6 gap-y-1 mb-2">
              <li><strong>Leonardo da Vinci</strong>: Renaissance genius, inventive polymath</li>
              <li><strong>Marie Curie</strong>: Rigorous scientist, relentless experimenter</li>
              <li><strong>Socrates</strong>: Dialectic master, challenger of assumptions</li>
              <li><strong>Hypatia of Alexandria</strong>: Math philosopher, synthesis seeker</li>
              <li><strong>Albert Einstein</strong>: Visionary physicist, paradigm innovator</li>
              <li><strong>Confucius</strong>: Ethical sage, harmony builder</li>
              <li><strong>Ada Lovelace</strong>: Analytical, computational pioneer</li>
              <li><strong>Niccolò Machiavelli</strong>: Strategic realist, bold skeptic</li>
            </ul>
            <div>
              Each expert’s <span className="font-medium">cognitive style</span>—creativity, skepticism, optimism—is adjustable. You can also switch providers and API keys per expert for customizable personalities.
            </div>
          </section>
        </TabsContent>

        {/* SYMPOSIUM */}
        <TabsContent value="symposium">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 py-[20px]">
              <Flame className="w-5 h-5 text-amber-600" /> Symposium Process
            </h2>
            
            {/* High-Level Overview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">Overview</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  <span className="font-semibold">Invocation:</span> State your challenge and assemble the minds.
                </li>
                <li>
                  <span className="font-semibold">Dialectic:</span> Watch experts debate and iterate in multiple rounds.
                </li>
                <li>
                  <span className="font-semibold">Synthesis:</span> AGORA's AI generates multi-layered wisdom and actionable reports.
                </li>
              </ol>
            </div>

            {/* How the Discussion Engine Works */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <Cog className="w-5 h-5 text-amber-600" />
                How the Discussion Engine Works
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">🧠 Dynamic Prompt Evolution</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    Each expert receives uniquely crafted prompts that evolve throughout the discussion:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
                    <li><strong>Round 1:</strong> Base expert personality + original challenge</li>
                    <li><strong>Round 2+:</strong> Expert personality + challenge + previous round insights + collective patterns</li>
                    <li><strong>Final Rounds:</strong> Enhanced with breakthrough detection and synthesis preparation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">🔄 Collective Memory System</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    AGORA maintains a sophisticated memory architecture:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
                    <li><strong>Message History:</strong> All previous expert contributions are preserved and analyzed</li>
                    <li><strong>Pattern Recognition:</strong> AI identifies emerging themes, agreements, and contradictions</li>
                    <li><strong>Context Evolution:</strong> Each round builds upon collective insights from all previous rounds</li>
                    <li><strong>Wisdom Cascading:</strong> Conclusions from round N become input for round N+1</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">📊 Intelligence Metrics</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    The system tracks sophisticated discussion intelligence:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
                    <li><strong>Wisdom Momentum:</strong> How insights build and accelerate across rounds</li>
                    <li><strong>Paradigm Shift Potential:</strong> Detection of breakthrough ideas and novel connections</li>
                    <li><strong>Cross-Disciplinary Resonance:</strong> How different expert domains intersect and amplify</li>
                    <li><strong>Consensus Formation:</strong> Tracking agreement and synthesis emergence</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">🎭 Adaptive Discussion Phases</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    Discussion phases adapt based on round count and content:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
                    <li><strong>Early Rounds (1-2):</strong> Exploration and perspective establishment</li>
                    <li><strong>Middle Rounds (3-4):</strong> Deep dialectic, challenge assumptions, build connections</li>
                    <li><strong>Later Rounds (5+):</strong> Synthesis preparation, breakthrough seeking, wisdom distillation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">⚡ The Cascade Effect</h4>
                  <p className="text-sm text-slate-600">
                    Each round doesn't just respond to the original challenge—it responds to the <em>evolved understanding</em> 
                    that has emerged from all previous expert interactions. This creates a cascading intelligence effect where 
                    later rounds contain exponentially richer context and more nuanced perspectives.
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Features */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">Features & Control</h3>
              <ul className="list-disc pl-8">
                <li>Real-time expert message flow & typing indicators</li>
                <li>Configurable rounds for in-depth dialogue</li>
                <li>Pause, resume, or reset symposium anytime</li>
                <li>Adjust expert panel and their cognitive style per discussion</li>
              </ul>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Note:</strong> To change settings mid-discussion, reset the symposium and start a new session.
              </p>
            </div>
          </section>
        </TabsContent>

        {/* API SETUP */}
        <TabsContent value="api">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 py-[20px]">
              <Cog className="w-5 h-5 text-amber-700" /> API Setup & Provider Configuration
            </h2>
            <div>
              AGORA supports a range of model providers for expert minds.
              <span className="font-bold text-green-600">🆓 Free</span> models need no setup,
              while <span className="font-bold text-amber-600">💎 Paid</span> providers require API keys for more advanced abilities.
            </div>
            <ApiSetupGuideContent />
          </section>
        </TabsContent>

        {/* REPORTS */}
        <TabsContent value="reports">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 py-[20px]">
              <Scroll className="w-5 h-5 text-slate-600" /> Reports & Insights
            </h2>
            <div>
              At the end of a symposium, AGORA generates up to eight report types powered by AI, offering deep synthesis:
            </div>
            <ul className="list-disc pl-8 mb-3 space-y-1">
              <li><strong>Summary:</strong> Unified collective wisdom</li>
              <li><strong>Consensus:</strong> Agreements among minds</li>
              <li><strong>Divergent:</strong> Contradictions, alternative views</li>
              <li><strong>Innovative:</strong> Paradigm-shifting ideas</li>
              <li><strong>Practical:</strong> Actionable recommendations</li>
              <li><strong>Ethical:</strong> Moral/Philosophical analysis</li>
              <li><strong>Historical:</strong> Timeless context</li>
              <li><strong>Personalized:</strong> Insights tailored for you</li>
            </ul>
            <div>
              <span className="font-medium">Advanced:</span> Reports feature metrics for wisdom emergence and breakthrough detection. Download as PDF or HTML in the <strong>Codex</strong> panel.
            </div>
          </section>
        </TabsContent>

        {/* ADVANCED & TIPS */}
        <TabsContent value="advanced">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 flex items-center gap-2 my-0 py-[20px]">
              <HelpCircle className="w-5 h-5 text-amber-500" /> Advanced Tips & Troubleshooting
            </h2>
            <ul className="list-disc pl-7 mb-4">
              <li>
                <span className="font-semibold">No responses or "API key required"?</span><br />
                Use free defaults or add a key for more responses. See API Setup tab above.
              </li>
              <li>
                <span className="font-semibold">Responses are slow?</span><br />
                Try simpler prompts, reduce rounds, or use paid providers.
              </li>
              
              <li>
                <span className="font-semibold">Best experience:</span><br />
                Use your own provider key, optimize round count, use desktop for longer debates.
              </li>
            </ul>
            
          </section>
        </TabsContent>
      </Tabs>

      {/* Back Home Button */}
      <div className="mt-12 text-center">
        <Link to="/">
          <Button variant="outline">
            <Columns className="mr-2 w-4 h-4" /> Back to Agora Home
          </Button>
        </Link>
      </div>
    </div>;
}
