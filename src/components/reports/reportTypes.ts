
import { FileText, BarChart3, Users, Lightbulb, Shield, History, User, CheckCircle } from 'lucide-react';

export const REPORT_TYPES = [{
  id: 'summary',
  title: 'Discussion Summary',
  description: 'Comprehensive overview of all expert perspectives and key insights',
  icon: FileText,
  color: 'bg-blue-100 text-blue-700'
}, {
  id: 'consensus',
  title: 'Consensus & Shared Ideas',
  description: 'Areas of agreement and common ground among experts',
  icon: Users,
  color: 'bg-green-100 text-green-700'
}, {
  id: 'divergent',
  title: 'Divergent & Dissenting Opinions',
  description: 'Contrasting viewpoints and creative tensions in the discussion',
  icon: BarChart3,
  color: 'bg-orange-100 text-orange-700'
}, {
  id: 'innovative',
  title: 'Innovative & Creative Solutions',
  description: 'Novel approaches and breakthrough ideas from the collective wisdom',
  icon: Lightbulb,
  color: 'bg-yellow-100 text-yellow-700'
}, {
  id: 'practical',
  title: 'Practical Recommendations',
  description: 'Actionable steps and implementation strategies',
  icon: CheckCircle,
  color: 'bg-indigo-100 text-indigo-700'
}, {
  id: 'ethical',
  title: 'Ethical & Societal Implications',
  description: 'Moral considerations and broader social impact analysis',
  icon: Shield,
  color: 'bg-purple-100 text-purple-700'
}, {
  id: 'historical',
  title: 'Historical & Contextual Analysis',
  description: 'Lessons from history and contextual frameworks',
  icon: History,
  color: 'bg-amber-100 text-amber-700'
}, {
  id: 'personal',
  title: 'Personalized Action Plan',
  description: 'Customized recommendations based on your specific context',
  icon: User,
  color: 'bg-pink-100 text-pink-700'
}];
