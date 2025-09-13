import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Sparkles, Sun } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'mindfulness' | 'exercise' | 'sleep' | 'nutrition';
  icon: React.ReactNode;
  duration: string;
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: '5-Minute Breathing Exercise',
    description: 'Start your day with calming breathwork to center your mind and reduce stress.',
    category: 'mindfulness',
    icon: <Brain className="w-5 h-5" />,
    duration: '5 min',
  },
  {
    id: '2',
    title: 'Evening Gratitude Journal',
    description: 'Reflect on three positive moments from your day to boost mood and perspective.',
    category: 'mindfulness',
    icon: <Heart className="w-5 h-5" />,
    duration: '10 min',
  },
  {
    id: '3',
    title: 'Light Movement Break',
    description: 'Gentle stretching or short walk to boost endorphins and energy levels.',
    category: 'exercise',
    icon: <Sparkles className="w-5 h-5" />,
    duration: '15 min',
  },
  {
    id: '4',
    title: 'Natural Light Exposure',
    description: 'Spend time near a window or outdoors to regulate circadian rhythm.',
    category: 'sleep',
    icon: <Sun className="w-5 h-5" />,
    duration: '20 min',
  },
];

const categoryColors = {
  mindfulness: 'bg-primary/10 text-primary',
  exercise: 'bg-accent/10 text-accent-foreground',
  sleep: 'bg-secondary/10 text-secondary-foreground',
  nutrition: 'bg-warning/10 text-warning-foreground',
};

export const WellnessRecommendations: React.FC = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Personalized Wellness Recommendations
        </CardTitle>
        <p className="text-muted-foreground">
          Based on your recent mood patterns, here are some activities that might help
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                {rec.icon}
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  <Badge 
                    variant="secondary" 
                    className={categoryColors[rec.category]}
                  >
                    {rec.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2 hover:bg-primary/5 hover:border-primary/30"
                >
                  Start Activity
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};