import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/ThemeProvider';
import { LayoutGrid, List, Calendar, Plus, Moon, Sun, Globe, Filter } from 'lucide-react';

type ViewType = 'board' | 'list' | 'timeline';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAddTask: () => void;
}

export function Header({ currentView, onViewChange, onAddTask }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
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
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          {t('filter')}
        </Button>

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
