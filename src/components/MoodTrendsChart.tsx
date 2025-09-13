import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface MoodData {
  date: string;
  mood: number;
  label: string;
}

interface MoodTrendsChartProps {
  data: MoodData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-medium">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Mood: <span className="text-primary font-medium">{data.label}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const MoodTrendsChart: React.FC<MoodTrendsChartProps> = ({ data }) => {
  const averageMood = data.length > 0 
    ? (data.reduce((sum, item) => sum + item.mood, 0) / data.length).toFixed(1)
    : '0';

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Mood Trends (Last 7 Days)
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Average mood: <span className="text-primary font-medium">{averageMood}/5</span></span>
          <span>•</span>
          <span>{data.length} check-ins recorded</span>
        </div>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  domain={[1, 5]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No mood data yet</p>
              <p className="text-sm text-muted-foreground">Start checking in daily to see your trends!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};