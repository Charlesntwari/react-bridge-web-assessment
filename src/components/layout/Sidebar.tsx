import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  Sparkles,
  Inbox,
  Calendar,
  Settings,
  ChevronRight,
  ChevronLeft,
  Plus,
  Hash,
  Zap,
  LayoutDashboard,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { t } = useTranslation();
  const [sharedOpen, setSharedOpen] = useState(true);
  const [privateOpen, setPrivateOpen] = useState(true);

  const navItems = [
    { icon: Search, label: t('search'), shortcut: '⌘K' },
    { icon: Sparkles, label: t('aiAssistant') },
    { icon: Inbox, label: t('inbox'), badge: 3 },
    { icon: Calendar, label: t('calendar') },
    { icon: Settings, label: t('settings') },
  ];

  const sharedPages = [
    { key: 'designSystem', color: 'bg-pink-500' },
    { key: 'marketingCampaign', color: 'bg-blue-500' },
    { key: 'productRoadmap', color: 'bg-green-500' },
  ];

  const privatePages = [
    { key: 'personalNotes', color: 'bg-purple-500' },
    { key: 'learningGoals', color: 'bg-orange-500' },
  ];

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Klaboard</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('searchPlaceholder')}
              className="h-9 bg-sidebar-accent pl-9 text-sm"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 px-2">
        {/* Main Nav */}
        <nav className="space-y-1 py-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                  {item.shortcut && (
                    <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Shared Pages */}
        {!collapsed && (
          <Collapsible open={sharedOpen} onOpenChange={setSharedOpen} className="py-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground">
              {t('sharedPages')}
              <ChevronRight
                className={cn('h-3 w-3 transition-transform', sharedOpen && 'rotate-90')}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {sharedPages.map((page) => (
                <Button
                  key={page.key}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <div className={cn('h-2 w-2 rounded-sm', page.color)} />
                  <span className="text-sm">{t(page.key)}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">{t('addPage')}</span>
              </Button>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Private Pages */}
        {!collapsed && (
          <Collapsible open={privateOpen} onOpenChange={setPrivateOpen} className="py-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground">
              {t('privatePages')}
              <ChevronRight
                className={cn('h-3 w-3 transition-transform', privateOpen && 'rotate-90')}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {privatePages.map((page) => (
                <Button
                  key={page.key}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{t(page.key)}</span>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </ScrollArea>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="m-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{t('upgrade')}</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">{t('upgradeMessage')}</p>
          <Button size="sm" className="w-full">
            {t('upgrade')}
          </Button>
        </div>
      )}

      {/* User */}
      <div className={cn('border-t border-sidebar-border p-3', collapsed && 'flex justify-center')}>
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" /> */}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">Charles Ntwari</p>
              <p className="truncate text-xs text-muted-foreground">charlesntwari@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
