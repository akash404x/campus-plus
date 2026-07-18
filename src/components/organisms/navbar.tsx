'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/auth-context';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const handlePrimaryAction = () => {
    router.push(user ? '/dashboard' : '/login');
  };

  const handleSectionNavigation = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-primary-foreground">C+</span>
          </div>
          <span className="text-xl font-bold">Campus+</span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => {
                if (item.href === '/') {
                  router.push('/');
                  return;
                }

                if (item.href === '/features') {
                  handleSectionNavigation('features');
                  return;
                }

                if (item.href === '/about') {
                  handleSectionNavigation('ai');
                  return;
                }

                if (item.href === '/contact') {
                  handleSectionNavigation('testimonials');
                  return;
                }

                router.push(item.href);
              }}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden md:flex"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="default" className="hidden md:flex" onClick={handlePrimaryAction}>
            Get Started
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
                onClick={() => {
                  if (item.href === '/') {
                    router.push('/');
                  } else if (item.href === '/features') {
                    handleSectionNavigation('features');
                  } else if (item.href === '/about') {
                    handleSectionNavigation('ai');
                  } else if (item.href === '/contact') {
                    handleSectionNavigation('testimonials');
                  } else {
                    router.push(item.href);
                  }
                }}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button variant="default" className="w-full" onClick={handlePrimaryAction}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
