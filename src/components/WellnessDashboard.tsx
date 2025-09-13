import React, { useState, useEffect } from 'react';
import { MoodCheckIn } from './MoodCheckIn';
import { MoodTrendsChart } from './MoodTrendsChart';
import { WellnessRecommendations } from './WellnessRecommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Smile, Calendar } from 'lucide-react';

interface MoodEntry {
  value: number;
  label: string;
  timestamp: Date;
}

export const WellnessDashboard: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showCheckIn, setShowCheckIn] = useState(true);

  // Load mood entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('wellness-mood-entries');
    if (stored) {
      const parsed = JSON.parse(stored).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      }));
      setMoodEntries(parsed);
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wellness-mood-entries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleMoodSubmit = (mood: MoodEntry) => {
    setMoodEntries(prev => [...prev, mood]);
    setShowCheckIn(false);
    
    // Show check-in again after 3 seconds (demo purposes)
    setTimeout(() => setShowCheckIn(true), 3000);
  };

  // Prepare chart data (last 7 days)
  const chartData = moodEntries
    .slice(-7)
    .map(entry => ({
      date: entry.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.value,
      label: entry.label,
    }));

  // Calculate wellness metrics
  const todaysMood = moodEntries.filter(entry => 
    entry.timestamp.toDateString() === new Date().toDateString()
  );
  
  const avgMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.value, 0) / moodEntries.length).toFixed(1)
    : '0';

  const streak = moodEntries.length; // Simplified streak calculation

  return (
    <div className="min-h-screen bg-gradient-calm p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent">
            Wellness Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your mental health journey with daily check-ins and personalized insights
          </p>
        </div>

        {/* Wellness Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft glass-effect">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{avgMood}/5</p>
              <p className="text-sm text-muted-foreground">Avg Mood</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft glass-effect">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-sm text-muted-foreground">Check-ins</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft glass-effect">
            <CardContent className="p-6 text-center">
              <Smile className="w-8 h-8 text-primary-light mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {todaysMood.length > 0 ? todaysMood[0].label : 'Not yet'}
              </p>
              <p className="text-sm text-muted-foreground">Today's Mood</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft glass-effect">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{Math.max(0, 7 - moodEntries.length)}</p>
              <p className="text-sm text-muted-foreground">Days to Goal</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Check-in */}
          <div className="lg:col-span-1">
            {showCheckIn ? (
              <MoodCheckIn onMoodSubmit={handleMoodSubmit} />
            ) : (
              <Card className="shadow-soft glass-effect">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Check-in Complete!</h3>
                  <p className="text-muted-foreground">Thank you for tracking your mood today.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mood Trends Chart */}
          <div className="lg:col-span-2">
            <MoodTrendsChart data={chartData} />
          </div>
        </div>

        {/* Wellness Recommendations */}
        <WellnessRecommendations />
      </div>
    </div>
  );
};