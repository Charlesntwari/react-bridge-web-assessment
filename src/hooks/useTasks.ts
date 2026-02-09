import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Task,
  DummyJsonResponse,
  transformTodo,
  Status,
  Priority,
} from "@/types/task";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "https://dummyjson.com/todos";

async function fetchTodos(): Promise<Task[]> {
  const response = await fetch(`${API_BASE}?limit=30`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  const data: DummyJsonResponse = await response.json();
  return data.todos.map(transformTodo);
}

async function createTodo(task: Partial<Task>): Promise<Task> {
  const response = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: task.title,
      completed: task.status === "done",
      userId: 1,
    }),
  });
  if (!response.ok) throw new Error("Failed to create todo");
  const data = await response.json();
  return {
    ...transformTodo(data),
    ...task,
    id: data.id,
  };
}

async function updateTodo(task: Task): Promise<Task> {
  const response = await fetch(`${API_BASE}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: task.title,
      completed: task.status === "done",
    }),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return task;
}

async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTodos,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createTodo,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      const optimisticTask: Task = {
        id: Date.now(),
        title: newTask.title || "",
        description: newTask.description,
        completed: newTask.status === "done",
        userId: 1,
        priority: newTask.priority || "medium",
        status: newTask.status || "todo",
        startDate: newTask.startDate,
        dueDate: newTask.dueDate,
        checklist: newTask.checklist || [],
        commentsCount: 0,
        attachmentsCount: 0,
        assignees: ["User 1"],
      };

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old ? [optimisticTask, ...old] : [optimisticTask],
      );

      return { previousTasks };
    },
    onSuccess: () => {
      toast({
        title: "✓ Task Created",
        description: "Your task has been created successfully.",
      });
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast({
        title: "✗ Creation Failed",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );

      return { previousTasks };
    },
    onSuccess: () => {
      toast({
        title: "✓ Task Updated",
        description: "Your changes have been saved.",
      });
    },
    onError: (err, updatedTask, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast({
        title: "✗ Update Failed",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task.id !== taskId),
      );

      return { previousTasks };
    },
    onSuccess: () => {
      toast({
        title: "✓ Task Deleted",
        description: "Task has been removed.",
      });
    },
    onError: (err, taskId, context) => {
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      toast({
        title: "✗ Deletion Failed",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useTasksByStatus(tasks: Task[] | undefined) {
  const grouped: Record<Status, Task[]> = {
    todo: [],
    progress: [],
    review: [],
    done: [],
  };

  if (!tasks) return grouped;

  tasks.forEach((task) => {
    grouped[task.status].push(task);
  });

  return grouped;
}
