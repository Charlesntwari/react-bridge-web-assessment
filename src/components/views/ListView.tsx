import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Task, Status } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Paperclip, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="flex-1 overflow-auto p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                Name
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                {t('dueDate')}
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('priority')}</TableHead>
            <TableHead>{t('attachments')}</TableHead>
            <TableHead>People</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onTaskClick(task)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onTaskToggle(task)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <span className={cn(task.completed && 'line-through text-muted-foreground')}>
                  {task.title}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {task.dueDate && format(new Date(task.dueDate), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {t(statusLabels[task.status])}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn('text-xs', priorityColors[task.priority])}>
                  {t(task.priority)}
                </Badge>
              </TableCell>
              <TableCell>
                {task.attachmentsCount !== undefined && task.attachmentsCount > 0 && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Paperclip className="h-3 w-3" />
                    {task.attachmentsCount}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {task.assignees?.slice(0, 3).map((assignee, i) => (
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
