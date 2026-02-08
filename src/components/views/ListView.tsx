import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Task, Status } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/table';
import { Paperclip, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ListViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskToggle: (task: Task) => void;
}

export function ListView({ tasks, onTaskClick, onTaskToggle }: ListViewProps) {
  const { t } = useTranslation();

  const priorityColors = {
    high: 'bg-priority-high text-white',
    medium: 'bg-priority-medium text-white',
    low: 'bg-priority-low text-white',
  };

  const statusLabels: Record<Status, string> = {
    todo: 'todo',
    progress: 'onProgress',
    review: 'needReview',
    done: 'done',
  };

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        id: 'checkbox',
        header: '',
        cell: ({ row }) => (
          <Checkbox
            checked={row.original.completed}
            onCheckedChange={() => onTaskToggle(row.original)}
          />
        ),
        size: 48,
      },
      {
        accessorKey: 'title',
        header: 'Name',
        cell: ({ getValue, row }) => (
          <span className={cn(row.original.completed && 'line-through text-muted-foreground')}>
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'dueDate',
        header: t('dueDate'),
        cell: ({ getValue }) => {
          const date = getValue() as string | undefined;
          return date ? <span className="text-muted-foreground">{format(new Date(date), 'MMM d, yyyy')}</span> : null;
        },
      },
      {
        accessorKey: 'status',
        header: t('status'),
        cell: ({ getValue, row }) => (
          <Badge variant="outline" className="capitalize">
            {t(statusLabels[row.original.status])}
          </Badge>
        ),
      },
      {
        accessorKey: 'priority',
        header: t('priority'),
        cell: ({ getValue, row }) => (
          <Badge className={cn('text-xs', priorityColors[row.original.priority])}>
            {t(row.original.priority)}
          </Badge>
        ),
      },
      {
        accessorKey: 'attachmentsCount',
        header: t('attachments'),
        cell: ({ getValue }) => {
          const count = getValue() as number | undefined;
          return count && count > 0 ? (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Paperclip className="h-3 w-3" />
              {count}
            </span>
          ) : null;
        },
      },
      {
        id: 'assignees',
        header: 'People',
        cell: ({ row }) => (
          <div className="flex -space-x-2">
            {row.original.assignees?.slice(0, 3).map((assignee, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee}`}
                />
                <AvatarFallback className="text-[10px]">
                  {assignee.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        ),
      },
    ],
    [t, statusLabels, priorityColors, onTaskToggle]
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      <div
        className="w-full"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('tr');
          if (row && !target.closest('button, input, [role="checkbox"]')) {
            const taskId = parseInt(row.getAttribute('data-task-id') || '0');
            const task = tasks.find((t) => t.id === taskId);
            if (task) onTaskClick(task);
          }
        }}
      >
        <DataTable columns={columns} data={tasks} />
      </div>
    </div>
  );
}
