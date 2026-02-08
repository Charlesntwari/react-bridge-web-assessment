import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Task, Status } from '@/types/task';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskMove: (taskId: number, newStatus: Status) => void;
  onAddTask: (status: Status) => void;
}

const columns: { id: Status; key: string; color: string }[] = [
  { id: 'todo', key: 'todo', color: 'bg-status-todo' },
  { id: 'progress', key: 'onProgress', color: 'bg-status-progress' },
  { id: 'review', key: 'needReview', color: 'bg-status-review' },
  { id: 'done', key: 'done', color: 'bg-status-done' },
];

export function KanbanBoard({ tasks, onTaskClick, onTaskMove, onAddTask }: KanbanBoardProps) {
  const { t } = useTranslation();

  const tasksByStatus = columns.reduce((acc, col) => {
    acc[col.id] = tasks.filter((task) => task.status === col.id);
    return acc;
  }, {} as Record<Status, Task[]>);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const taskId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId as Status;
    
    onTaskMove(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto p-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex w-80 shrink-0 flex-col rounded-lg bg-muted/50"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className={cn('h-3 w-3 rounded-full', column.color)} />
                <h3 className="font-semibold">{t(column.key)}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {tasksByStatus[column.id].length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onAddTask(column.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Column Content */}
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'flex-1 space-y-3 overflow-y-auto p-3 pt-0 scrollbar-thin',
                    snapshot.isDraggingOver && 'bg-accent/50'
                  )}
                >
                  {tasksByStatus[column.id].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onClick={() => onTaskClick(task)}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
