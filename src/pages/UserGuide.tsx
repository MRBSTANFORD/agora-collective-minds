
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scroll, HelpCircle, Settings, Users, Flame, Columns, BookOpen, ArrowRight } from "lucide-react";

const SECTION_STYLE = "mb-12";
const SUB_TITLE_STYLE = "text-2xl font-medium mb-2 text-slate-800 flex items-center gap-2";
const ANCHOR = (id: string) => <span id={id} tabIndex={-1} className="block mt-[-120px] pb-2"/>;

const sections = [
  { id: "introduction", label: "Introduction & Vision", icon: <BookOpen className="w-5 h-5 text-amber-500" /> },
  { id: "getting-started", label: "Getting Started", icon: <ArrowRight className="w-5 h-5 text-slate-700" /> },
  { id: "experts", label: "Meet The Experts", icon: <Users className="w-5 h-5 text-amber-400" /> },
  { id: "symposium", label: "The Symposium Process", icon: <Flame className="w-5 h-5 text-amber-600" /> },
  { id: "settings", label: "Configuring AGORA", icon: <Settings className="w-5 h-5 text-slate-700" /> },
  { id: "reports", label: "Understanding Reports", icon: <Scroll className="w-5 h-5 text-slate-600" /> },
  { id: "troubleshooting", label: "Troubleshooting & Tips", icon: <HelpCircle className="w-5 h-5 text-amber-500" /> }
];

export default function UserGuide() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Intro Hero */}
      <section className="mb-12 flex items-center gap-6">
        <img
          src="/lovable-uploads/442cd3f7-0a66-40f7-bdb1-4874b741a816.png"
          alt="Agora Logo"
          className="w-20 h-20 object-contain drop-shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-thin tracking-wider text-slate-900 mb-1">AGORA User Guide</h1>
          <p className="text-lg text-amber-600 font-light">
            Your journey to collective, transcendent wisdom starts here.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Table of Contents</h2>
        <ul className="space-y-1 pl-2">
          {sections.map(s =>
            <li key={s.id}>
              <a href={`#${s.id}`} className="flex items-center gap-2 hover:text-amber-600 transition-colors">{s.icon} {s.label}</a>
            </li>
          )}
        </ul>
      </section>

      {/* Introduction & Vision */}
      <section className={SECTION_STYLE}>
        {ANCHOR("introduction")}
        <h2 className={SUB_TITLE_STYLE}>{sections[0].icon} Introduction & Vision</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-900 text-xl">
              What is AGORA?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <strong>AGORA</strong> is an innovative platform combining the timeless philosophy of the ancient <span className="font-medium">Greek agora</span>—the marketplace of ideas—with the power of modern generative AI. Its objective is to orchestrate deep, multi-perspective dialogues between legendary minds from across history, using state-of-the-art language models to generate, synthesize, and transcend individual expert perspectives.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                <span className="font-semibold text-amber-700">Concept</span>: Simulate an eternal philosophical forum where world-class thinkers collaborate to solve modern challenges.
              </li>
              <li>
                <span className="font-semibold text-amber-700">Objectives</span>: Bridge ancient wisdom and modern problems, foster cross-disciplinary insight, and distill actionable intelligence from collective debate.
              </li>
              <li>
                <span className="font-semibold text-amber-700">Vision</span>: Empower anyone to summon the wisdom of the ages, facilitating emergent insight far beyond individual capability.
              </li>
            </ul>
            <p>
              AGORA’s foundation is fourfold: the <strong>Eight Immortal Minds</strong> (expert panel), <strong>Iterative Discourse</strong> (multi-round debate), <strong>Synthesis of Wisdom</strong> (AI-powered synthesis and report generation), and <strong>Transcendent Insights</strong> (breakthrough idea discovery).
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Getting Started */}
      <section className={SECTION_STYLE}>
        {ANCHOR("getting-started")}
        <h2 className={SUB_TITLE_STYLE}>{sections[1].icon} Getting Started</h2>
        <Card>
          <CardHeader>
            <CardTitle>
              First Steps on AGORA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2 mb-2">
              <li>
                <span className="font-semibold">Formulate Your Challenge:</span>
                <br/> Enter your philosophical, scientific, or creative problem into the challenge box on the Home page to invite the assembly of minds.
              </li>
              <li>
                <span className="font-semibold">Configure the Symposium:</span>
                <br/> Select the number of discussion rounds (default: 5) and tune which experts will attend and how they will think.
              </li>
              <li>
                <span className="font-semibold">[Optional] Set Up API Keys:</span>
                <br/> For more robust AI models (beyond free HuggingFace), enter API keys for providers like Google Gemini, Cohere, Groq, OpenAI, and more.
                <div className="mt-1">
                  <Link to="/api-setup-guide" className="text-amber-700 underline hover:text-amber-900">API Setup Guide</Link> (opens provider instructions)
                </div>
              </li>
              <li>
                <span className="font-semibold">Start the Symposium:</span>
                <br/> Click "Start Symposium" to begin. AGORA orchestrates multi-round, multi-expert debate, synthesizes wisdom, and presents results.
              </li>
            </ol>
            <div>
              <strong>Tip:</strong> Most features work with free providers, but for advanced performance use your own API keys.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Meet The Experts */}
      <section className={SECTION_STYLE}>
        {ANCHOR("experts")}
        <h2 className={SUB_TITLE_STYLE}>{sections[2].icon} Meet The Experts</h2>
        <Card>
          <CardHeader>
            <CardTitle>Eight Immortal Minds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">Each symposium assembles these legendary "experts", each with tunable personality:</div>
            <ul className="list-disc pl-8 grid md:grid-cols-2 gap-x-6 gap-y-2">
              <li><strong>Leonardo da Vinci</strong>: Renaissance genius, creative inventor</li>
              <li><strong>Marie Curie</strong>: Pioneering scientist, rigorous experimenter</li>
              <li><strong>Socrates</strong>: Dialectical reasoner, challenger of assumptions</li>
              <li><strong>Hypatia of Alexandria</strong>: Mathematician, philosopher of synthesis</li>
              <li><strong>Albert Einstein</strong>: Visionary theorist, paradigm innovator</li>
              <li><strong>Confucius</strong>: Wise ethicist, harmony seeker</li>
              <li><strong>Ada Lovelace</strong>: Analytical thinker, algorithmic pioneer</li>
              <li><strong>Niccolò Machiavelli</strong>: Strategic realist, skeptic</li>
            </ul>
            <div className="mt-4">
              Each expert’s <span className="font-medium">cognitive style</span> (creativity, skepticism, optimism) shapes their responses.
              You may adjust these for each symposium, set their model/provider, and supply API keys.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* The Symposium Process */}
      <section className={SECTION_STYLE}>
        {ANCHOR("symposium")}
        <h2 className={SUB_TITLE_STYLE}>{sections[3].icon} The Symposium Process</h2>
        <Card>
          <CardHeader>
            <CardTitle>From Invocation to Synthesis</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-1 mb-3">
              <li>
                <span className="font-semibold">Invocation:</span> State your challenge and summon the minds.
              </li>
              <li>
                <span className="font-semibold">Dialectic:</span> Watch experts debate and build on each other in multiple iterative rounds.
              </li>
              <li>
                <span className="font-semibold">Synthesis:</span> The system produces AI-powered reports, uncovering wisdom, consensus, divergences, and paradigm-shifting insights.
              </li>
            </ol>
            <div className="my-2">
              <strong>Features:</strong>
              <ul className="list-disc pl-8">
                <li>Real-time message flow with indicator for expert reply in progress</li>
                <li>Multi-round iterative reasoning (configurable count)</li>
                <li>Pause, resume, or reset discussion controls</li>
                <li>Adaptive personality and provider settings for each expert</li>
              </ul>
            </div>
            <div>
              <strong>Tip:</strong> Advanced dialogue orchestration models ensure authentic multi-perspective conversation.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Symposium Settings */}
      <section className={SECTION_STYLE}>
        {ANCHOR("settings")}
        <h2 className={SUB_TITLE_STYLE}>{sections[4].icon} Configuring AGORA</h2>
        <Card>
          <CardHeader>
            <CardTitle>Customizing Your Symposium</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">Rounds:</span> Select 1 to 10 iterative rounds to deepen the analysis.
              </li>
              <li>
                <span className="font-semibold">Expert Panel:</span> Select/deselect experts for this specific challenge.
              </li>
              <li>
                <span className="font-semibold">Cognitive Attributes:</span> Adjust creativity, skepticism, and optimism for each expert to tune their personality and contributions.
              </li>
              <li>
                <span className="font-semibold">AI Provider:</span> Choose between HuggingFace (default, free), Gemini, Cohere, Groq, OpenAI, Anthropic, and more. Enter your API key for more powerful models.
              </li>
              <li>
                <span className="font-semibold">Speed and Performance:</span> Adjust speed to receive responses faster or slower, depending on provider and complexity.
              </li>
            </ul>
            <div className="mt-3">
              All configuration happens before starting a symposium.
              If you want to change settings later, reset and start a new session.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Understanding Reports */}
      <section className={SECTION_STYLE}>
        {ANCHOR("reports")}
        <h2 className={SUB_TITLE_STYLE}>{sections[5].icon} Understanding Reports</h2>
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Reports and Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              At the conclusion of a symposium, AGORA generates up to eight distinct report types, each powered by advanced AI synthesis and in-depth cross-expert analysis.
            </div>
            <ul className="list-disc pl-7 mb-4 space-y-1">
              <li><strong>Summary:</strong> Unified collective wisdom synthesis</li>
              <li><strong>Consensus:</strong> Emergent agreement patterns</li>
              <li><strong>Divergent:</strong> Creative contradictions and alternative viewpoints</li>
              <li><strong>Innovative:</strong> Breakthrough and paradigm shifts identified during the symposium</li>
              <li><strong>Practical:</strong> Actionable recommendations based on the debate</li>
              <li><strong>Ethical:</strong> Morality, reasoning, and philosophical consequences</li>
              <li><strong>Historical:</strong> Wisdom contextualized across time and tradition</li>
              <li><strong>Personalized:</strong> Tailored insights for the user’s context</li>
            </ul>
            <div>
              <span className="font-medium">Transcendent Analysis:</span> Each report is further enhanced via advanced prompting, offering collective intelligence emergence metrics, breakthrough insight detection, and wisdom evolution timelines.
            </div>
            <div className="mt-3">
              <span className="font-semibold">Export Features:</span> Download reports in PDF or HTML from the "Codex" panel.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Troubleshooting Section */}
      <section className={SECTION_STYLE}>
        {ANCHOR("troubleshooting")}
        <h2 className={SUB_TITLE_STYLE}>{sections[6].icon} Troubleshooting & Tips</h2>
        <Card>
          <CardHeader>
            <CardTitle>Help & Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-7 mb-4">
              <li>
                <span className="font-semibold">No responses, or "API key required"?</span><br />
                Free models are available for most providers, but rate limits apply. Add your own key via <Link to="/api-setup-guide" className="text-amber-700 underline">API Setup Guide</Link>.
              </li>
              <li>
                <span className="font-semibold">Responses are slow?</span><br />
                Try simpler challenges, use default (HuggingFace) models, and check rate limits. Paid providers are faster.
              </li>
              <li>
                <span className="font-semibold">Error or broken behavior?</span><br />
                Confirm configuration, check browser console, and reload. Persistent issues? See <a href="https://docs.lovable.dev/tips-tricks/troubleshooting" target="_blank" className="text-blue-800 underline">Troubleshooting Docs</a>.
              </li>
              <li>
                <span className="font-semibold">Best experience:</span><br />
                Use your own provider key for advanced performance, optimize round count, and use desktop for extended reading.
              </li>
            </ul>
            <div>
              <span className="font-medium">Further Assistance:</span> For feature requests, philosophical discussions, or technical help, join our <a href="https://discord.com/channels/1119885301872070706/1280461670979993613" className="text-blue-800 underline" target="_blank">community Discord</a>.
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Back Home Button */}
      <div className="mt-16 text-center">
        <Link to="/">
          <Button variant="outline">
            <Columns className="mr-2 w-4 h-4" /> Back to Agora Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
