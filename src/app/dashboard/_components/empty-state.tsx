"use client";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    onNewTaskClick: () => void;
}

export function EmptyState({ onNewTaskClick }: EmptyStateProps) {
    return (
        <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">No Tasks Yet</h2>
            <p className="text-muted-foreground mt-2 mb-4">
                Looks like your task list is empty. Get started by creating a new task.
            </p>
            <Button onClick={onNewTaskClick}>Create Your First Task</Button>
        </div>
    )
}
