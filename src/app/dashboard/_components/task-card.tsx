"use client";
import { MoreHorizontal, Edit, Trash2, CheckCircle, Circle, Flag } from "lucide-react";
import { format } from 'date-fns';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { type Task } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const isCompleted = task.status === 'completed';
  
  // Priority colors
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  // Default to medium if priority is not set
  const priority = task.priority || 'medium';
  
  return (
    <Card className={cn("transition-all hover:shadow-md", isCompleted && "bg-muted/50")}>
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
              {task.title}
            </CardTitle>
            <Badge variant="outline" className={cn(priorityColors[priority as keyof typeof priorityColors])}>
              {priority}
            </Badge>
          </div>
          <CardDescription className={cn(isCompleted && "line-through text-muted-foreground")}>
            {task.description}
          </CardDescription>
        </div>
        <TooltipProvider>
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isCompleted ? 'outline' : 'secondary'} 
                  size="icon" 
                  className={cn("h-8 w-8", !isCompleted && "bg-[#0071E3]/10 hover:bg-[#0071E3]/20")}
                  onClick={onToggleStatus}
                >
                  {isCompleted ? 
                    <Circle className="h-4 w-4" /> : 
                    <CheckCircle className="h-4 w-4 text-[#0071E3]" />
                  }
                  <span className="sr-only">Toggle Status</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit or delete task</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Created on {format(new Date(task.created_at), "PPP")}
        </div>
      </CardFooter>
    </Card>
  );
}
