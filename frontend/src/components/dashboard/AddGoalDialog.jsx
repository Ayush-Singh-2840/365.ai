import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PlusCircle } from 'lucide-react';

const AddGoalDialog = ({ open, onOpenChange, onAdd }) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !hours) return;
    
    onAdd({
      name,
      totalHours: Number(hours)
    });
    
    setName('');
    setHours('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg shadow-teal-900/20">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New 365 Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-400">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., Master React Patterns"
              className="bg-slate-950 border-slate-800 focus:border-teal-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hours" className="text-slate-400">Total Hours Required</Label>
            <Input
              id="hours"
              type="number"
              placeholder="e.g., 40"
              className="bg-slate-950 border-slate-800 focus:border-teal-500"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 w-full">
              Create Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
