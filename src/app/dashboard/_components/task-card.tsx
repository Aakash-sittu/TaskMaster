"use client";
import { MoreHorizontal, Edit, Trash2, CheckCircle, Circle } from "lucide-react";
import { format } from 'date-fns';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type Task } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) {
  const isComplete = task.status === 'complete';

  return (
    <Card className={cn("transition-all hover:shadow-md", isComplete && "bg-muted/50")}>
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className={cn("font-medium", isComplete && "line-through text-muted-foreground")}>{task.title}</CardTitle>
          <CardDescription className={cn(isComplete && "line-through text-muted-foreground")}>
            {task.description}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant={isComplete ? 'outline' : 'secondary'} size="icon" className="h-8 w-8" onClick={onToggleStatus}>
                {isComplete ? <Circle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-accent" />}
                <span className="sr-only">Toggle Status</span>
            </Button>
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
        </div>
      </CardHeader>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Created on {format(new Date(task.createdAt), "PPP")}
        </div>
      </CardFooter>
    </Card>
  );
}
