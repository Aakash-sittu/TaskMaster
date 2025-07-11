"use client";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TaskCard } from "./_components/task-card";
import { TaskDialog } from "./_components/task-dialog";
import { EmptyState } from "./_components/empty-state";
import { DashboardHeader } from "./_components/dashboard-header";
import { Task } from "@/lib/types";

export default function DashboardPage() {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  async function fetchUser() {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to get user session");
      
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function fetchTasks() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to fetch tasks");
      
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tasks. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Open the dialog for creating a new task
  const openNewDialog = () => {
    setEditingTask(null); // Ensure we're not in edit mode
    setIsDialogOpen(true);
  };

  // Open the dialog for editing an existing task
  const openEditDialog = (task: Task) => {
    console.log("Opening edit dialog for task:", task); // Debug
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  // Enhanced version of handleSaveTask with better error handling and debugging
  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (editingTask) {
        console.log("Updating task:", editingTask.id, "with data:", taskData);
        
        // Edit existing task
        const response = await fetch(`/api/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData)
        });

        const responseData = await response.json();
        
        if (!response.ok) {
          console.error("Update failed:", responseData);
          throw new Error(responseData.error || "Failed to update task");
        }

        console.log("API response for task update:", responseData);
        
        // Update the task in local state immediately
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === editingTask.id
              ? { ...task, ...taskData, ...responseData.task }
              : task
          )
        );

        toast({
          title: "Success",
          description: "Task updated successfully"
        });
      } else {
        // Create new task
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData)
        });

        const responseData = await response.json();
        
        if (!response.ok) {
          console.error("Create failed:", responseData);
          throw new Error(responseData.error || "Failed to create task");
        }

        console.log("API response for task creation:", responseData);
        toast({
          title: "Success",
          description: "Task created successfully"
        });
        
        // Refresh tasks to get the new task
        fetchTasks();
      }

      // Reset state
      setEditingTask(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save task"
      });
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task");
      }

      // Remove task from local state and show toast
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task. Please try again."
      });
    }
  };

  // Handle task status toggle with proper error handling
  const handleToggleStatus = async (taskId: number) => {
    // Store original tasks for rollback if needed
    const originalTasks = [...tasks];
    
    try {
      // Optimistic update for UI responsiveness
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
            : task
        )
      );

      // Make API call to toggle status
      const response = await fetch(`/api/tasks/${taskId}/toggle-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to toggle task status");
      }
      
      // Get updated task data
      const data = await response.json();
      
      // Update with server data to ensure consistency
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? data.task : task
        )
      );
    } catch (error) {
      console.error("Error toggling task status:", error);
      
      // Revert to original state if something went wrong
      setTasks(originalTasks);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task status. Please try again."
      });
    }
  };

  const handleDeleteAllCompleted = async () => {
    if (!completeTasks.length) return;
    
    if (!confirm("Are you sure you want to delete all completed tasks?")) return;
    
    try {
      const deletionPromises = completeTasks.map(task => 
        fetch(`/api/tasks/${task.id}`, { method: "DELETE" })
      );
      
      await Promise.all(deletionPromises);
      
      setTasks(prevTasks => prevTasks.filter(task => task.status !== "completed"));
      
      toast({
        title: "Success",
        description: `${completeTasks.length} completed tasks deleted successfully`
      });
    } catch (error) {
      console.error("Error deleting all completed tasks:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete all completed tasks"
      });
    }
  };

  const handleDeleteAllIncomplete = async () => {
    if (!incompleteTasks.length) return;
    
    if (!confirm("Are you sure you want to delete all incomplete tasks?")) return;
    
    try {
      const deletionPromises = incompleteTasks.map(task => 
        fetch(`/api/tasks/${task.id}`, { method: "DELETE" })
      );
      
      await Promise.all(deletionPromises);
      
      setTasks(prevTasks => prevTasks.filter(task => task.status === "completed"));
      
      toast({
        title: "Success",
        description: `${incompleteTasks.length} incomplete tasks deleted successfully`
      });
    } catch (error) {
      console.error("Error deleting all incomplete tasks:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete all incomplete tasks"
      });
    }
  };

  const { completeTasks, incompleteTasks } = useMemo(() => {
    return {
      incompleteTasks: tasks.filter(task => task.status !== "completed"),
      completeTasks: tasks.filter(task => task.status === "completed")
    };
  }, [tasks]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader user={user} onNewTask={openNewDialog} />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <EmptyState onNewTaskClick={openNewDialog} />
 ) : (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    inComplete
                  </h2>
                </div>
                
                {incompleteTasks.length > 0 ? (
                  <>
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
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleDeleteAllIncomplete}
                        className="flex items-center text-sm text-red-500 hover:text-red-700"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                          />
                        </svg>
                        Delete all incomplete tasks
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No incomplete tasks. Well done!
                  </p>
                )}
              </div>

              {completeTasks.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      Complete
                    </h2>
                  </div>
                  
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
                  
                  {/* Delete All Completed Tasks Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleDeleteAllCompleted}
                      className="flex items-center text-sm text-red-500 hover:text-red-700"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                      Delete all completed tasks
                    </button>
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
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}
