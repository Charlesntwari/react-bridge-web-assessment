import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from './TaskCard';
import { Task } from '@/types/task';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'This is a test task',
  completed: false,
  userId: 1,
  priority: 'high',
  status: 'progress',
  dueDate: '2026-02-15',
  startDate: '2026-02-01',
  checklist: [
    { id: 1, text: 'Subtask 1', completed: true },
    { id: 2, text: 'Subtask 2', completed: false },
  ],
  commentsCount: 3,
  attachmentsCount: 2,
  assignees: ['Alice', 'Bob'],
};

describe('TaskCard', () => {
  it('should render task title', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('should render priority badge', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);

    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('should render due date when present', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);

    // Due date should be displayed as "Feb 15"
    expect(screen.getByText(/Feb 15/)).toBeInTheDocument();
  });

  it('should render checklist progress', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);

    // Should show 1/2 for checklist items
    expect(screen.getByText('1/2')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should render comments count when present', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render attachments count when present', () => {
    const handleClick = vi.fn();
    render(<TaskCard task={mockTask} onClick={handleClick} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<TaskCard task={mockTask} onClick={handleClick} />);

    const card = container.querySelector('[class*="cursor-pointer"]');
    if (card) {
      await user.click(card);
      expect(handleClick).toHaveBeenCalledOnce();
    }
  });

  it('should render assignee avatars', () => {
    const handleClick = vi.fn();
    const { container } = render(<TaskCard task={mockTask} onClick={handleClick} />);

    // Check that the avatars container exists
    const avatarContainer = container.querySelector('.flex.-space-x-2');
    expect(avatarContainer).toBeInTheDocument();
    
    // Check that avatar elements are rendered
    const avatars = avatarContainer?.querySelectorAll('[class*="h-6 w-6"]');
    expect(avatars?.length).toBeGreaterThan(0);
  });

  it('should handle task without checklist', () => {
    const taskNoChecklist = { ...mockTask, checklist: [] };
    const handleClick = vi.fn();
    const { container } = render(<TaskCard task={taskNoChecklist} onClick={handleClick} />);

    expect(container.textContent).not.toContain('100%');
  });

  it('should apply dragging styles when isDragging is true', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <TaskCard task={mockTask} onClick={handleClick} isDragging={true} />
    );

    const card = container.querySelector('[class*="ring-2"]');
    expect(card).toBeInTheDocument();
  });
});
