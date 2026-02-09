import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';
import { LayoutGrid, List, Calendar, Plus, Moon, Sun, Globe, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Priority, Status } from '@/types/task';

type ViewType = 'board' | 'list' | 'timeline';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAddTask: () => void;
  filterCount?: number;
  filters?: { priority: Priority[]; status: Status[] };
  onFilterChange?: (filters: { priority: Priority[]; status: Status[] }) => void;
}

export function Header({ 
  currentView, 
  onViewChange, 
  onAddTask,
  filterCount = 0,
  filters = { priority: [], status: [] },
  onFilterChange,
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handlePriorityChange = (priority: Priority) => {
    if (!onFilterChange) return;
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority];
    onFilterChange({ ...filters, priority: newPriorities });
  };

  const handleStatusChange = (status: Status) => {
    if (!onFilterChange) return;
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatuses });
  };

  const clearFilters = () => {
    if (!onFilterChange) return;
    onFilterChange({ priority: [], status: [] });
  };

  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Product Roadmap</h1>
        <Tabs value={currentView} onValueChange={(v) => onViewChange(v as ViewType)}>
          <TabsList className="bg-muted">
            <TabsTrigger value="board" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              {t('board')}
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              {t('list')}
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              {t('timeline')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {t('filter')}
              {filterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {filterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('priority')}</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.priority.includes('high')}
              onCheckedChange={() => handlePriorityChange('high')}
              onSelect={(e) => e.preventDefault()}
            >
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                {t('high')}
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.priority.includes('medium')}
              onCheckedChange={() => handlePriorityChange('medium')}
              onSelect={(e) => e.preventDefault()}
            >
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                {t('medium')}
              </span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.priority.includes('low')}
              onCheckedChange={() => handlePriorityChange('low')}
              onSelect={(e) => e.preventDefault()}
            >
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                {t('low')}
              </span>
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>{t('status')}</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('todo')}
              onCheckedChange={() => handleStatusChange('todo')}
              onSelect={(e) => e.preventDefault()}
            >
              {t('todo')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('progress')}
              onCheckedChange={() => handleStatusChange('progress')}
              onSelect={(e) => e.preventDefault()}
            >
              {t('onProgress')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('review')}
              onCheckedChange={() => handleStatusChange('review')}
              onSelect={(e) => e.preventDefault()}
            >
              {t('needReview')}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('done')}
              onCheckedChange={() => handleStatusChange('done')}
              onSelect={(e) => e.preventDefault()}
            >
              {t('done')}
            </DropdownMenuCheckboxItem>

            {filterCount > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters} className="text-destructive">
                  <X className="h-4 w-4 mr-2" />
                  {t('clearFilters') || 'Clear filters'}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleLanguage} title={t('language')}>
          <Globe className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} title={t('theme')}>
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button onClick={onAddTask} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('addTask')}
        </Button>
      </div>
    </header>
  );
}
