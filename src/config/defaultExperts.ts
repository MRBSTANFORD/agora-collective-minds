
import { DiscussionConfig } from "@/components/DiscussionConfigPanel";

export const defaultExperts = [
  {
    id: 'leonardo',
    name: 'Leonardo da Vinci',
    cognitive: { creativity: 95, skepticism: 40, optimism: 85 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    cognitive: { creativity: 70, skepticism: 85, optimism: 60 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'socrates',
    name: 'Socrates',
    cognitive: { creativity: 60, skepticism: 90, optimism: 55 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    cognitive: { creativity: 75, skepticism: 70, optimism: 80 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    cognitive: { creativity: 100, skepticism: 60, optimism: 75 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'confucius',
    name: 'Confucius',
    cognitive: { creativity: 65, skepticism: 45, optimism: 85 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'lovelace',
    name: 'Ada Lovelace',
    cognitive: { creativity: 90, skepticism: 50, optimism: 90 },
    apiKey: "",
    provider: "HuggingFace",
  },
  {
    id: 'machiavelli',
    name: 'Niccolò Machiavelli',
    cognitive: { creativity: 80, skepticism: 95, optimism: 40 },
    apiKey: "",
    provider: "HuggingFace",
  }
];

export function createDefaultConfig(rounds: number): DiscussionConfig {
  return {
    rounds,
    experts: defaultExperts
  };
}
