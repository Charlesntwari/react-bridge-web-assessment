import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Task } from '@/types/task';
import { Calendar, MessageSquare, Paperclip, CheckSquare } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onClick, isDragging }: TaskCardProps) {
  const { t } = useTranslation();
  
  const completedItems = task.checklist?.filter((item) => item.completed).length || 0;
  const totalItems = task.checklist?.length || 0;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const priorityColors = {
    high: 'bg-priority-high text-white',
    medium: 'bg-priority-medium text-white',
    low: 'bg-priority-low text-white',
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        'cursor-pointer border border-border bg-card transition-all hover:shadow-md',
        isDragging && 'rotate-2 shadow-lg ring-2 ring-primary'
      )}
    >
      <CardContent className="p-4">
        {/* Priority Badge */}
        <div className="mb-3 flex items-center justify-between">
          <Badge className={cn('text-xs', priorityColors[task.priority])}>
            {t(task.priority)}
          </Badge>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(task.dueDate), 'MMM d')}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 font-medium leading-snug">{task.title}</h3>

        {/* Progress */}
        {totalItems > 0 && (
          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckSquare className="h-3 w-3" />
                {completedItems}/{totalItems}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.commentsCount !== undefined && task.commentsCount > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {task.commentsCount}
              </span>
            )}
            {task.attachmentsCount !== undefined && task.attachmentsCount > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                {task.attachmentsCount}
              </span>
            )}
          </div>

          {/* Assignees */}
          <div className="flex -space-x-2">
            {task.assignees?.slice(0, 3).map((assignee, i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-card">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee}`}
                />
                <AvatarFallback className="text-[10px]">
                  {assignee.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
