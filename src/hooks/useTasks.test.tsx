import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask, useTasksByStatus } from './useTasks';
import { Task } from '@/types/task';
import { ReactNode } from 'react';

interface MockResponse {
  ok: boolean;
  json: () => Promise<unknown>;
}

// Mock fetch
global.fetch = vi.fn() as ReturnType<typeof vi.fn<[], Promise<MockResponse>>>

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Test Task 1',
    description: 'Description 1',
    completed: false,
    userId: 1,
    priority: 'high',
    status: 'todo',
    dueDate: '2026-02-15',
    startDate: '2026-02-01',
    checklist: [],
    commentsCount: 0,
    attachmentsCount: 0,
    assignees: ['User 1'],
  },
  {
    id: 2,
    title: 'Test Task 2',
    description: 'Description 2',
    completed: true,
    userId: 1,
    priority: 'medium',
    status: 'done',
    dueDate: '2026-02-10',
    startDate: '2026-02-01',
    checklist: [],
    commentsCount: 2,
    attachmentsCount: 1,
    assignees: ['User 2'],
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
};

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch tasks successfully', async () => {
    (global.fetch as ReturnType<typeof vi.fn<[], Promise<MockResponse>>>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ todos: mockTasks }),
    });

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Check that data was fetched
    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });

  it('should handle fetch error', async () => {
    (global.fetch as ReturnType<typeof vi.fn<[], Promise<MockResponse>>>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useTasks(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

describe('useCreateTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a task', async () => {
    const newTask: Partial<Task> = {
      title: 'New Task',
      priority: 'high',
      status: 'todo',
    };

    (global.fetch as ReturnType<typeof vi.fn<[], Promise<MockResponse>>>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 3, ...newTask }),
    });

    const { result } = renderHook(() => useCreateTask(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newTask);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });
});

describe('useTasksByStatus', () => {
  it('should group tasks by status', () => {
    const { result } = renderHook(() => useTasksByStatus(mockTasks));

    expect(result.current.todo).toHaveLength(1);
    expect(result.current.todo[0].id).toBe(1);
    expect(result.current.done).toHaveLength(1);
    expect(result.current.done[0].id).toBe(2);
  });

  it('should handle undefined tasks', () => {
    const { result } = renderHook(() => useTasksByStatus(undefined));

    expect(result.current.todo).toHaveLength(0);
    expect(result.current.progress).toHaveLength(0);
    expect(result.current.review).toHaveLength(0);
    expect(result.current.done).toHaveLength(0);
  });
});
