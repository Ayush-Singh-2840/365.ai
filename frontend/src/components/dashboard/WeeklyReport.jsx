import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Calendar, CheckCircle2, Clock, Zap } from 'lucide-react';
import { isSameWeek, parseISO } from 'date-fns';

const WeeklyReport = ({ goals, setInsight }) => {
  const weeklyStats = useMemo(() => {
    const now = new Date();
    const thisWeekGoals = goals.filter(g => {
        try {
            return isSameWeek(parseISO(g.createdAt), now);
        } catch (e) { return false; }
    });

    const completedThisWeek = thisWeekGoals.filter(g => g.status === 'completed').length;
    const addedThisWeek = thisWeekGoals.length;
    const pendingThisWeek = addedThisWeek - completedThisWeek;
    const activeWorkload = thisWeekGoals
        .filter(g => g.status === 'pending')
        .reduce((acc, curr) => acc + Number(curr.totalHours), 0);

    return { completedThisWeek, addedThisWeek, pendingThisWeek, activeWorkload };
  }, [goals]);

  return (
    <Card 
      className="bg-gradient-to-b from-white/10 to-white/5 border-white/10 backdrop-blur-xl h-full"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-slate-200 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          Weekly Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        
        {/* Metric 1 */}
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:border-teal-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Done</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-white">{weeklyStats.completedThisWeek}</span>
        </div>

        {/* Metric 2 */}
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Added</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-white">{weeklyStats.pendingThisWeek}</span>
        </div>

        {/* Metric 3 */}
        <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Load</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-white">{weeklyStats.activeWorkload}h</span>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500 font-medium">
                {weeklyStats.completedThisWeek > 0 
                 ? "🚀 Momentum is building!" 
                 : "🌱 Plant seeds for the week."}
            </p>
        </div>

      </CardContent>
    </Card>
  );
};

export default WeeklyReport;
