import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { KanbanBoard } from '@/components/views/KanbanBoard';
import { ListView } from '@/components/views/ListView';
import { TimelineView } from '@/components/views/TimelineView';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { Task, Status } from '@/types/task';
import { Loader2 } from 'lucide-react';

type ViewType = 'board' | 'list' | 'timeline';

export default function Index() {
  const { t } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('board');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>('todo');

  const { data: tasks, isLoading, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleAddTask = (status?: Status) => {
    setSelectedTask(null);
    setDefaultStatus(status || 'todo');
    setDialogOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleTaskSave = (taskData: Partial<Task>) => {
    if (selectedTask) {
      updateTask.mutate({ ...selectedTask, ...taskData } as Task);
    } else {
      createTask.mutate({ ...taskData, status: taskData.status || defaultStatus });
    }
  };

  const handleTaskDelete = (id: number) => {
    deleteTask.mutate(id);
  };

  const handleTaskMove = (taskId: number, newStatus: Status) => {
    const task = tasks?.find((t) => t.id === taskId);
    if (task) {
      updateTask.mutate({
        ...task,
        status: newStatus,
        completed: newStatus === 'done',
      });
    }
  };

  const handleTaskToggle = (task: Task) => {
    updateTask.mutate({
      ...task,
      completed: !task.completed,
      status: !task.completed ? 'done' : 'todo',
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="mb-2 text-destructive">{t('error')}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary underline"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          currentView={currentView}
          onViewChange={setCurrentView}
          onAddTask={() => handleAddTask()}
        />

        <main className="flex-1 overflow-hidden">
          {currentView === 'board' && (
            <KanbanBoard
              tasks={tasks || []}
              onTaskClick={handleTaskClick}
              onTaskMove={handleTaskMove}
              onAddTask={handleAddTask}
            />
          )}
          {currentView === 'list' && (
            <ListView
              tasks={tasks || []}
              onTaskClick={handleTaskClick}
              onTaskToggle={handleTaskToggle}
            />
          )}
          {currentView === 'timeline' && (
            <TimelineView
              tasks={tasks || []}
              onTaskClick={handleTaskClick}
            />
          )}
        </main>
      </div>

      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        task={selectedTask}
        onSave={handleTaskSave}
        onDelete={handleTaskDelete}
      />
    </div>
  );
}
