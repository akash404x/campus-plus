'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Calendar, Users, Trophy, Settings, LogOut, Menu } from 'lucide-react';

const sidebarItems = [
  {
    title: 'Main',
    items: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Events', href: '/events', icon: Calendar },
      { name: 'Clubs', href: '/clubs', icon: Users },
      { name: 'Rewards', href: '/rewards', icon: Trophy },
    ],
  },
  {
    title: 'Settings',
    items: [
      { name: 'Settings', href: '/settings', icon: Settings },
      { name: 'Logout', href: '/logout', icon: LogOut },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onToggle}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 border-r bg-background transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:relative md:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                <span className="text-sm font-bold text-primary-foreground">C+</span>
              </div>
              <span className="text-xl font-bold">Campus+</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggle}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            {sidebarItems.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                  {section.title}
                </h3>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
