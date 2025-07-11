"use client";
import { CheckCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onNewTaskClick: () => void;
}

export function EmptyState({ onNewTaskClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center">
      <div className="flex flex-col items-center gap-2 mb-8">
        <CheckCircle className="h-12 w-12 text-muted-foreground/50" />
        <h2 className="text-2xl font-semibold tracking-tight mt-4">No tasks yet</h2>
        <p className="text-muted-foreground">
          You haven't created any tasks yet. Create your first task to get started.
        </p>
      </div>
      
      <Button onClick={onNewTaskClick} className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Create your first task
      </Button>
    </div>
  );
}
