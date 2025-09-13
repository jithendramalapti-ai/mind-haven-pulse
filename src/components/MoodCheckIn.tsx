import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const moodEmojis = [
  { emoji: '😢', label: 'Very Sad', value: 1, color: 'text-blue-600' },
  { emoji: '😔', label: 'Sad', value: 2, color: 'text-blue-500' },
  { emoji: '😐', label: 'Neutral', value: 3, color: 'text-muted-foreground' },
  { emoji: '😊', label: 'Good', value: 4, color: 'text-accent' },
  { emoji: '😄', label: 'Great', value: 5, color: 'text-primary' },
];

interface MoodCheckInProps {
  onMoodSubmit: (mood: { value: number; label: string; timestamp: Date }) => void;
}

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (selectedMood !== null) {
      const mood = moodEmojis.find(m => m.value === selectedMood);
      if (mood) {
        onMoodSubmit({
          value: selectedMood,
          label: mood.label,
          timestamp: new Date(),
        });
        setSelectedMood(null);
        setNotes('');
      }
    }
  };

  return (
    <Card className="shadow-soft glass-effect">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
        <p className="text-muted-foreground">Track your daily mood and wellbeing</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moodEmojis.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`
                flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:scale-105
                ${selectedMood === mood.value 
                  ? 'bg-primary/10 shadow-medium ring-2 ring-primary/30' 
                  : 'bg-secondary/50 hover:bg-secondary'
                }
              `}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className={`text-xs font-medium ${mood.color}`}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Any notes about your day? (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What made you feel this way today?"
            className="w-full p-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
        >
          Save Mood Check-in
        </Button>
      </CardContent>
    </Card>
  );
};