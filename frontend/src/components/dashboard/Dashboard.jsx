import React, { useState } from 'react';
import { useGoalStore } from '../../hooks/useGoalStore';
import { useAuth } from '../../context/AuthContext';
import KPICards from './KPICards';
import ChartsSection from './ChartsSection';
import WeeklyReport from './WeeklyReport';
import GoalTable from './GoalTable';
import InsightPanel from './InsightPanel';
import AddGoalDialog from './AddGoalDialog';
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  // Pass user.id to store to load specific data
  const { goals, stats, addGoal, toggleGoalStatus, deleteGoal } = useGoalStore(user?.id);
  
  const [insight, setInsight] = useState({ 
    title: 'Welcome Back', 
    message: 'Hover over charts for deep insights.',
    type: 'neutral'
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden">
      {/* 
         UNIQUE THEME: Cosmic Glass
         Deep rich background with vibrant gradient orbs 
      */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-900/10 rounded-full blur-[120px]" />
         <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-cyan-900/10 rounded-full blur-[100px]" />
         {/* Noise overlay for texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 p-4 md:p-6 max-w-[1600px] mx-auto space-y-6 md:space-y-8">
        
        {/* Header - Mobile Friendly */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              GoalTracker<span className="text-cyan-400">.ai</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
               <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Logged in as {user?.phoneNumber}
            </p>
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
             <AddGoalDialog 
               open={isAddModalOpen} 
               onOpenChange={setIsAddModalOpen} 
               onAdd={addGoal} 
             />
             <Button 
                variant="outline" 
                className="border-white/10 bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50"
                onClick={logout}
             >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
             </Button>
          </div>
        </header>

        {/* Top KPIs */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <KPICards stats={stats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Charts Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <ChartsSection 
              goals={goals} 
              stats={stats} 
              setInsight={setInsight} 
            />
          </div>

          {/* Weekly Report */}
          <div className="lg:col-span-4 xl:col-span-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <WeeklyReport 
              goals={goals} 
              setInsight={setInsight}
            />
          </div>
        </div>

        {/* Data Table - Horizontal Scroll on Mobile */}
        <div className="pt-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="overflow-x-auto rounded-xl border border-white/5 shadow-2xl shadow-black/50">
                <GoalTable 
                    goals={goals} 
                    toggleStatus={toggleGoalStatus} 
                    deleteGoal={deleteGoal}
                />
            </div>
        </div>
      </div>

      {/* Floating Insight Panel - Responsive */}
      <InsightPanel insight={insight} />
      
    </div>
  );
};

export default Dashboard;
