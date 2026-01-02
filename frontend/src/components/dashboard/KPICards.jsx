import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Target, CheckCircle2, Clock, Hourglass } from 'lucide-react';

const KPICard = ({ title, value, subtext, icon: Icon, colorClass, gradient }) => (
  <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group overflow-hidden relative">
    {/* Subtle gradient glow on hover */}
    <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl ${gradient}`}></div>
    
    <CardContent className="p-6 relative z-10">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2 font-mono tracking-tighter">{value}</h3>
          <p className={`text-xs mt-2 ${colorClass} flex items-center gap-1 font-medium`}>
            {subtext}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const KPICards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard 
        title="Total Goals" 
        value={stats.totalGoals} 
        subtext="Active Targets"
        icon={Target}
        colorClass="text-indigo-400"
        gradient="bg-indigo-500"
      />
      <KPICard 
        title="Completed" 
        value={stats.completedGoals} 
        subtext={`${stats.completionRate}% Rate`}
        icon={CheckCircle2}
        colorClass="text-teal-400"
        gradient="bg-teal-500"
      />
      <KPICard 
        title="Pending" 
        value={stats.pendingGoals} 
        subtext="In Progress"
        icon={Clock}
        colorClass="text-amber-400"
        gradient="bg-amber-500"
      />
      <KPICard 
        title="Hours Left" 
        value={stats.remainingHours} 
        subtext="Effort Remaining"
        icon={Hourglass}
        colorClass="text-fuchsia-400"
        gradient="bg-fuchsia-500"
      />
    </div>
  );
};

export default KPICards;
