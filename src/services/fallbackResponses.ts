
// Enhanced fallback responses based on expert personalities
export const EXPERT_FALLBACK_RESPONSES: Record<string, string[]> = {
  leonardo: [
    "This challenge reminds me of the intricate mechanisms I've observed in nature - perhaps we should approach it as an artist would approach a canvas, with both precision and imagination.",
    "Like the flow of water carving through stone, this problem requires us to find the path of least resistance while maintaining our creative vision.",
    "I see connections between this challenge and the anatomical studies I've conducted - both require careful observation and systematic analysis."
  ],
  curie: [
    "We must approach this systematically, gathering evidence and testing our hypotheses rigorously before drawing conclusions.",
    "This problem requires the same methodical approach I used in my laboratory - careful observation, precise measurement, and persistent investigation.",
    "Like my work with radioactive elements, this challenge demands patience and careful attention to detail to reveal its true nature."
  ],
  socrates: [
    "But first, we must ask ourselves: do we truly understand what this challenge is asking of us? What assumptions are we making?",
    "I wonder if we have examined this problem from all angles. What questions have we not yet asked?",
    "This challenge presents an opportunity to examine our own thinking - are we seeking truth or merely confirming what we already believe?"
  ],
  hypatia: [
    "Let us apply mathematical reasoning to this challenge, seeking the elegant solution that balances all variables.",
    "This problem can be understood through the lens of geometry - finding the optimal path between multiple points of consideration.",
    "We must ensure our solution serves not just efficiency but also equity and the greater good of all involved."
  ],
  einstein: [
    "This challenge invites us to think beyond conventional frameworks - perhaps the solution lies in reimagining our fundamental assumptions.",
    "Like relativity teaches us, the perspective from which we view this problem will determine what solutions become visible to us.",
    "I find myself wondering what thought experiment might illuminate the hidden connections within this challenge."
  ],
  confucius: [
    "The path to solving this challenge lies in understanding how it affects the harmony between all stakeholders involved.",
    "Wisdom suggests we consider not just the immediate solution, but the long-term consequences for our community.",
    "True resolution comes when we balance practical necessities with moral responsibilities and social cohesion."
  ],
  lovelace: [
    "This challenge has the characteristics of a complex algorithm - we must break it down into logical steps and iterate toward the solution.",
    "I see patterns in this problem that suggest a systematic, computational approach could yield innovative results.",
    "The intersection of analytical thinking and creative vision will be key to unlocking this challenge's potential."
  ],
  machiavelli: [
    "We must examine the practical realities and competing interests at play in this challenge, not just the idealistic goals.",
    "Effective solutions require understanding the motivations and constraints of all parties involved - what they truly want versus what they claim to want.",
    "This challenge calls for strategic thinking that accounts for human nature and the real-world dynamics of power and influence."
  ]
};

// Generate enhanced fallback response based on expert personality
export function generatePersonalizedFallbackResponse(expertId: string, prompt: string): string {
  const responses = EXPERT_FALLBACK_RESPONSES[expertId] || [
    "This presents an intriguing challenge that deserves careful consideration from multiple perspectives.",
    "I believe we need to examine this issue through the lens of my unique expertise and experience.",
    "The complexity of this challenge calls for a thoughtful and measured approach."
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  console.log(`Generated fallback response for ${expertId}: ${randomResponse.slice(0, 50)}...`);
  return randomResponse;
}
