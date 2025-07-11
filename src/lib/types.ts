export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export type Task = {
  id: number;
  user_id: string;
  title: string;
  description?: string;
  status: string;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string | null;
  created_at: string;
};

const sortTasksByPriority = (tasks: Task[]) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  
  return [...tasks].sort((a, b) => {
    const aPriority = a.priority || 'medium';
    const bPriority = b.priority || 'medium';
    return priorityOrder[aPriority as keyof typeof priorityOrder] - priorityOrder[bPriority as keyof typeof priorityOrder];
  });
};

const pendingTasks: Task[] = [
  {
    id: 1,
    user_id: "1",
    title: "Finish report",
    status: "pending",
    priority: "high",
    created_at: "2024-06-01T10:00:00Z"
  },
  {
    id: 2,
    user_id: "2",
    title: "Email client",
    status: "pending",
    priority: "medium",
    created_at: "2024-06-02T11:00:00Z"
  }
];

const sortedPendingTasks = sortTasksByPriority(pendingTasks);
