import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const ChartsSection = ({ goals, stats, setInsight }) => {
  
  const barData = goals
    .filter(g => g.status === 'pending')
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 7)
    .map(g => ({
      name: g.name.length > 15 ? g.name.substring(0, 15) + '...' : g.name,
      fullName: g.name,
      hours: Number(g.totalHours)
    }));

  // Updated colors for the new theme
  const pieData = [
    { name: 'Completed', value: stats.completedGoals, color: '#2dd4bf' }, // teal-400
    { name: 'Pending', value: stats.pendingGoals, color: '#4f46e5' },   // indigo-600
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Bar Chart */}
      <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl h-[400px]">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-200">Workload Allocation</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={barData} 
              barSize={32}
              onMouseEnter={() => setInsight({
                title: 'Allocation Analysis',
                message: 'Distribution of hours across your top pending goals.',
                type: 'info'
              })}
            >
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/> {/* Indigo-400 */}
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.4}/> {/* Indigo-600 */}
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#000000CC', borderColor: '#333', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar 
                dataKey="hours" 
                fill="url(#colorHours)" 
                radius={[4, 4, 0, 0]}
                onMouseEnter={(data) => setInsight({
                  title: data.fullName,
                  message: `${data.hours} hours required. Focus priority: High.`,
                  type: 'warning'
                })}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut Chart */}
      <Card className="lg:col-span-1 bg-white/5 border-white/10 backdrop-blur-xl h-[400px]">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-200">Progress Status</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ backgroundColor: '#000000CC', borderColor: '#333', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                 itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-4xl font-bold text-white tracking-tighter">{stats.completionRate}%</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Done</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
