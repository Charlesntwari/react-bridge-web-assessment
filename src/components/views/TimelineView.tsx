import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface TimelineViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TimelineView({ tasks, onTaskClick }: TimelineViewProps) {
  const { t } = useTranslation();

  const weekDays = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, []);

  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const priorityColors = {
    high: 'border-l-priority-high bg-red-500/10',
    medium: 'border-l-priority-medium bg-orange-500/10',
    low: 'border-l-priority-low bg-green-500/10',
  };

  const getTasksForDay = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      return isSameDay(new Date(task.dueDate), date);
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {format(weekDays[0], 'MMMM yyyy')}
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="grid min-w-[800px] grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const dayTasks = getTasksForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div key={day.toISOString()} className="flex flex-col">
                {/* Day Header */}
                <div
                  className={cn(
                    'mb-3 rounded-lg p-3 text-center',
                    isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  <p className="text-xs font-medium uppercase tracking-wider opacity-70">
                    {t(dayNames[index])}
                  </p>
                  <p className="text-2xl font-bold">{format(day, 'd')}</p>
                </div>

                {/* Tasks */}
                <div className="flex-1 space-y-2">
                  {dayTasks.length === 0 ? (
                    <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30">
                      <p className="text-xs text-muted-foreground">{t('noTasks')}</p>
                    </div>
                  ) : (
                    dayTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        className={cn(
                          'cursor-pointer rounded-lg border-l-4 p-3 transition-all hover:shadow-md',
                          priorityColors[task.priority]
                        )}
                      >
                        <p className="mb-1 text-sm font-medium line-clamp-2">{task.title}</p>
                        <Badge
                          variant="outline"
                          className="text-[10px] capitalize"
                        >
                          {t(task.priority)}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
