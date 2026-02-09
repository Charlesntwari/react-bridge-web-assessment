import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Edit2, Trash2 } from 'lucide-react';

interface TaskDetailPanelProps {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskDetailPanel({ task, onClose, onEdit, onDelete }: TaskDetailPanelProps) {
  const { t } = useTranslation();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'review': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'done': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-96 border-l bg-background p-4 overflow-y-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Task Details</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-md transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">{t('taskTitle')}</p>
          <h3 className="text-xl font-bold break-words">{task.title}</h3>
        </div>

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('status')}</p>
            <Badge className={getStatusColor(task.status)}>
              {t(task.status)}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('priority')}</p>
            <Badge className={getPriorityColor(task.priority)}>
              {t(task.priority)}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('description')}</p>
            <p className="text-sm text-foreground bg-muted p-2 rounded break-words">
              {task.description}
            </p>
          </div>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('dueDate')}</p>
            <p className="text-sm text-foreground">
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </p>
          </div>
        )}

        {/* Metadata */}
        {(task.commentsCount || task.attachmentsCount) && (
          <div className="mb-4 space-y-2">
            {task.commentsCount && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">💬 Comments:</span>
                <span className="font-medium">{task.commentsCount}</span>
              </div>
            )}
            {task.attachmentsCount && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">📎 Attachments:</span>
                <span className="font-medium">{task.attachmentsCount}</span>
              </div>
            )}
          </div>
        )}

        {/* Task Complete Status */}
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              disabled
              className="h-4 w-4"
            />
            <span className="text-sm">{task.completed ? 'Completed' : 'Incomplete'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto pt-4 border-t">
        <Button
          onClick={onEdit}
          className="flex-1"
          variant="default"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          {t('edit')}
        </Button>
        <Button
          onClick={onDelete}
          variant="destructive"
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
