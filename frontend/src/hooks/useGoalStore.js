import { useState, useEffect } from 'react';

const MOCK_DATA = [
  { id: '1', name: 'Master Advanced Python', totalHours: 45, status: 'pending', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '2', name: 'Build Goal Tracker MVP', totalHours: 20, status: 'completed', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '3', name: 'Read "Clean Architecture"', totalHours: 15, status: 'pending', createdAt: new Date(Date.now() - 86400000 * 1).toISOString() },
];

export const useGoalStore = (userId) => {
  const [goals, setGoals] = useState([]);
  
  // Use a composite key for storage to separate users
  const storageKey = userId ? `goals_user_${userId}` : 'goals_guest';

  // Stats State
  const [stats, setStats] = useState({
    totalGoals: 0,
    completedGoals: 0,
    pendingGoals: 0,
    totalHours: 0,
    remainingHours: 0,
    completionRate: 0,
    completedHours: 0
  });

  // Load Initial Data
  useEffect(() => {
    if (!userId) {
        setGoals([]);
        return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse goals", e);
        setGoals(MOCK_DATA);
      }
    } else {
      // New user gets mock data to start
      setGoals(MOCK_DATA);
    }
  }, [userId, storageKey]);

  // Save & Calculate Stats
  useEffect(() => {
    if (!userId && goals.length === 0) return;
    
    // Save to storage
    localStorage.setItem(storageKey, JSON.stringify(goals));
    
    // Calculate Stats
    const total = goals.length;
    const completed = goals.filter(g => g.status === 'completed').length;
    const pending = total - completed;
    const totalHours = goals.reduce((acc, curr) => acc + Number(curr.totalHours), 0);
    const completedHours = goals.filter(g => g.status === 'completed').reduce((acc, curr) => acc + Number(curr.totalHours), 0);
    const remainingHours = totalHours - completedHours;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    setStats({
      totalGoals: total,
      completedGoals: completed,
      pendingGoals: pending,
      totalHours,
      remainingHours,
      completionRate,
      completedHours
    });
  }, [goals, userId, storageKey]);

  const addGoal = (goal) => {
    const newGoal = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...goal
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const toggleGoalStatus = (id) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, status: g.status === 'completed' ? 'pending' : 'completed' };
      }
      return g;
    }));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return { goals, stats, addGoal, toggleGoalStatus, deleteGoal };
};
