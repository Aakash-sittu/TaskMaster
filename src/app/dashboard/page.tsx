"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { type Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "./_components/header";
import { TaskCard } from "./_components/task-card";
import { TaskDialog } from "./_components/task-dialog";
import { EmptyState } from "./_components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; username: string } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        const allTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`) || "[]");
        setTasks(allTasks);
      }
    } catch (error) {
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const saveTasks = (newTasks: Task[]) => {
    if(user?.email) {
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(newTasks));
      setTasks(newTasks);
    }
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const handleToggleStatus = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'complete' ? 'incomplete' : 'complete',
        };
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const { incompleteTasks, completeTasks } = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (task.status === "complete") {
          acc.completeTasks.push(task);
        } else {
          acc.incompleteTasks.push(task);
        }
        return acc;
      },
      { incompleteTasks: [] as Task[], completeTasks: [] as Task[] }
    );
  }, [tasks]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader user={user} />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Tasks</h1>
            <Button onClick={openNewDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          {tasks.length === 0 ? (
            <EmptyState onNewTaskClick={openNewDialog} />
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Incomplete</h2>
                {incompleteTasks.length > 0 ? (
                  <div className="grid gap-4">
                    {incompleteTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => openEditDialog(task)}
                        onDelete={() => handleDeleteTask(task.id)}
                        onToggleStatus={() => handleToggleStatus(task.id)}
                      />
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground italic">No incomplete tasks. Well done!</p>}
              </div>
              
              {completeTasks.length > 0 && (
                 <div>
                    <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Complete</h2>
                    <div className="grid gap-4">
                      {completeTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onEdit={() => openEditDialog(task)}
                          onDelete={() => handleDeleteTask(task.id)}
                          onToggleStatus={() => handleToggleStatus(task.id)}
                        />
                      ))}
                    </div>
                  </div>
              )}
            </div>
          )}
        </div>
      </main>
      <TaskDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSave={(taskData) => {
          if (editingTask) {
            handleEditTask({ ...editingTask, ...taskData });
          } else {
            handleAddTask(taskData);
          }
        }}
        task={editingTask}
      />
    </div>
  );
}

const DashboardSkeleton = () => (
    <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-8">
             <Skeleton className="h-8 w-32" />
             <div className="ml-auto flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-20" />
             </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        </main>
    </div>
);
