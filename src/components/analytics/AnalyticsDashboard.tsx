
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DiscussionMessage } from '@/services/aiOrchestrator';
import { ExpertConfig } from '@/components/ExpertCardList';
import { Brain, MessageSquare, TrendingUp, Users, Clock, Zap } from 'lucide-react';

interface AnalyticsDashboardProps {
  messages: DiscussionMessage[];
  experts: ExpertConfig[];
  currentRound: number;
  maxRounds: number;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  messages,
  experts,
  currentRound,
  maxRounds
}) => {
  const analytics = useMemo(() => {
    // Expert participation analysis
    const expertParticipation = experts.map(expert => {
      const expertMessages = messages.filter(m => m.speaker === expert.id);
      const avgLength = expertMessages.length > 0 
        ? expertMessages.reduce((sum, m) => sum + m.content.length, 0) / expertMessages.length 
        : 0;
      
      return {
        name: expert.name,
        messageCount: expertMessages.length,
        avgLength: Math.round(avgLength),
        totalWords: expertMessages.reduce((sum, m) => sum + m.content.split(' ').length, 0),
        creativity: expert.cognitive.creativity,
        skepticism: expert.cognitive.skepticism,
        optimism: expert.cognitive.optimism
      };
    });

    // Round progression analysis
    const roundData = Array.from({ length: maxRounds }, (_, i) => {
      const round = i + 1;
      const roundMessages = messages.filter(m => m.round === round);
      const avgLength = roundMessages.length > 0
        ? roundMessages.reduce((sum, m) => sum + m.content.length, 0) / roundMessages.length
        : 0;
      
      return {
        round: `Round ${round}`,
        messages: roundMessages.length,
        avgLength: Math.round(avgLength),
        totalWords: roundMessages.reduce((sum, m) => sum + m.content.split(' ').length, 0)
      };
    });

    // Cognitive trait distribution
    const traitData = [
      {
        trait: 'Creativity',
        average: experts.reduce((sum, e) => sum + e.cognitive.creativity, 0) / experts.length,
        color: '#8B5CF6'
      },
      {
        trait: 'Skepticism',
        average: experts.reduce((sum, e) => sum + e.cognitive.skepticism, 0) / experts.length,
        color: '#EF4444'
      },
      {
        trait: 'Optimism',
        average: experts.reduce((sum, e) => sum + e.cognitive.optimism, 0) / experts.length,
        color: '#10B981'
      }
    ];

    // Overall metrics
    const totalWords = messages.reduce((sum, m) => sum + m.content.split(' ').length, 0);
    const avgWordsPerMessage = messages.length > 0 ? totalWords / messages.length : 0;
    const discussionDepth = (currentRound / maxRounds) * 100;
    const expertEngagement = (messages.length / (experts.length * currentRound)) * 100;

    return {
      expertParticipation,
      roundData,
      traitData,
      totalWords,
      avgWordsPerMessage,
      discussionDepth,
      expertEngagement
    };
  }, [messages, experts, currentRound, maxRounds]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Words</p>
                <p className="text-2xl font-bold">{analytics.totalWords.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Discussion Depth</p>
                <p className="text-2xl font-bold">{Math.round(analytics.discussionDepth)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Engagement</p>
                <p className="text-2xl font-bold">{Math.round(analytics.expertEngagement)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expert Participation Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Expert Participation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.expertParticipation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'messageCount' ? `${value} messages` : 
                  name === 'avgLength' ? `${value} chars avg` : 
                  `${value} words total`,
                  name === 'messageCount' ? 'Messages' : 
                  name === 'avgLength' ? 'Avg Length' : 
                  'Total Words'
                ]}
              />
              <Bar dataKey="messageCount" fill="#3B82F6" name="messageCount" />
              <Bar dataKey="totalWords" fill="#10B981" name="totalWords" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Round Progression */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Discussion Evolution by Round
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.roundData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="messages" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="totalWords" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cognitive Traits Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Collective Cognitive Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.traitData.map((trait) => (
              <div key={trait.trait}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{trait.trait}</span>
                  <span className="text-sm text-gray-600">{Math.round(trait.average)}%</span>
                </div>
                <Progress value={trait.average} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expert Cognitive Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Cognitive Traits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {analytics.expertParticipation.map((expert) => (
              <div key={expert.name} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{expert.name}</h4>
                  <Badge variant="outline">{expert.messageCount} messages</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-purple-600">Creativity: {expert.creativity}%</span>
                  </div>
                  <div>
                    <span className="text-red-600">Skepticism: {expert.skepticism}%</span>
                  </div>
                  <div>
                    <span className="text-green-600">Optimism: {expert.optimism}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
