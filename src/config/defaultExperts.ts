
import { DiscussionConfig } from "@/components/DiscussionConfigPanel";
import { alternativeMinds } from '@/config/alternativeMinds';

export const defaultExperts = [
  {
    id: 'leonardo',
    name: 'Leonardo da Vinci',
    cognitive: { creativity: 95, skepticism: 40, optimism: 85 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    cognitive: { creativity: 70, skepticism: 85, optimism: 60 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'socrates',
    name: 'Socrates',
    cognitive: { creativity: 60, skepticism: 90, optimism: 55 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    cognitive: { creativity: 75, skepticism: 70, optimism: 80 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    cognitive: { creativity: 100, skepticism: 60, optimism: 75 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'confucius',
    name: 'Confucius',
    cognitive: { creativity: 65, skepticism: 45, optimism: 85 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'lovelace',
    name: 'Ada Lovelace',
    cognitive: { creativity: 90, skepticism: 50, optimism: 90 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  },
  {
    id: 'machiavelli',
    name: 'Niccolò Machiavelli',
    cognitive: { creativity: 80, skepticism: 95, optimism: 40 },
    apiKey: "",
    provider: "LLM7",
    model: "default",
  }
];

/** Look up any expert by ID across defaults and alternatives */
export function getExpertById(id: string) {
  const def = defaultExperts.find(e => e.id === id);
  if (def) return def;
  const alt = alternativeMinds.find(m => m.id === id);
  if (alt) {
    return {
      id: alt.id,
      name: alt.name,
      cognitive: { ...alt.traits },
      apiKey: "",
      provider: "LLM7",
      model: "default",
    };
  }
  return undefined;
}

export function createDefaultConfig(rounds: number): DiscussionConfig {
  return {
    rounds,
    experts: defaultExperts
  };
}
