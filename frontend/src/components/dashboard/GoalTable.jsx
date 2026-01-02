import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Trash2 } from 'lucide-react';

const GoalTable = ({ goals, toggleStatus, deleteGoal }) => {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-slate-200">Active Goals Registry</CardTitle>
          <Badge variant="outline" className="text-slate-400 border-slate-700 bg-black/20">
            {goals.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-black/20 border-white/5">
            <TableRow className="border-white/5 hover:bg-white/5">
              <TableHead className="w-[50px] text-slate-400">Done</TableHead>
              <TableHead className="text-slate-400">Goal Name</TableHead>
              <TableHead className="text-slate-400">Total Hours</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.length === 0 ? (
                <TableRow className="hover:bg-transparent border-white/5">
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                        No goals found. Add your first goal to get started.
                    </TableCell>
                </TableRow>
            ) : (
                goals.map((goal) => (
                <TableRow key={goal.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell>
                    <Checkbox 
                        checked={goal.status === 'completed'} 
                        onCheckedChange={() => toggleStatus(goal.id)}
                        className="border-slate-500 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                    />
                    </TableCell>
                    <TableCell className="font-medium text-slate-200">
                        <span className={goal.status === 'completed' ? 'line-through text-slate-500' : ''}>
                            {goal.name}
                        </span>
                    </TableCell>
                    <TableCell className="text-slate-300">{goal.totalHours} hrs</TableCell>
                    <TableCell>
                    <Badge 
                        variant="secondary"
                        className={
                        goal.status === 'completed' 
                            ? "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border-teal-500/20" 
                            : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20"
                        }
                    >
                        {goal.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteGoal(goal.id)}
                        className="text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GoalTable;
