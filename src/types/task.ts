export type Priority = 'high' | 'medium' | 'low';
export type Status = 'todo' | 'progress' | 'review' | 'done';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  priority: Priority;
  status: Status;
  startDate?: string;
  dueDate?: string;
  checklist?: ChecklistItem[];
  commentsCount?: number;
  attachmentsCount?: number;
  assignees?: string[];
}

export interface DummyJsonTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface DummyJsonResponse {
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
}

// Transform DummyJSON todo to our Task format
export function transformTodo(todo: DummyJsonTodo): Task {
  const priorities: Priority[] = ['high', 'medium', 'low'];
  const statuses: Status[] = ['todo', 'progress', 'review', 'done'];
  
  // Generate consistent random values based on id
  const priorityIndex = todo.id % 3;
  const statusIndex = todo.completed ? 3 : todo.id % 3;
  
  // Generate fake dates
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (todo.id % 7));
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + (todo.id % 14));
  
  return {
    id: todo.id,
    title: todo.todo,
    description: `Description for task: ${todo.todo}`,
    completed: todo.completed,
    userId: todo.userId,
    priority: priorities[priorityIndex],
    status: todo.completed ? 'done' : statuses[statusIndex],
    startDate: startDate.toISOString(),
    dueDate: dueDate.toISOString(),
    checklist: [
      { id: `${todo.id}-1`, text: 'Review requirements', completed: true },
      { id: `${todo.id}-2`, text: 'Implementation', completed: todo.completed },
      { id: `${todo.id}-3`, text: 'Testing', completed: false },
    ],
    commentsCount: todo.id % 5,
    attachmentsCount: todo.id % 3,
    assignees: [`User ${todo.userId}`],
  };
}
