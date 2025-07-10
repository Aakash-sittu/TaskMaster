export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'complete' | 'incomplete';
  createdAt: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
};
