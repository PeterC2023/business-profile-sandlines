// Task-related types for TypeScript

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'default' | 'urgent' | 'inProgress' | 'upcoming' | 'completed' | 'review';

export interface TaskItem {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  assignees?: string[];
  labels?: string[];
}

export interface TaskGroupProps {
  title: string;
  count: number;
  variant?: TaskStatus;
  children: React.ReactNode;
}
