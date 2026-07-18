'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  showCloseButton?: boolean;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = 'right',
  showCloseButton = true,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="rounded-2xl">
        {showCloseButton && (
          <div className="absolute right-4 top-4">
            <Button variant="ghost" size="icon" onClick={() => onOpenChange?.(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </Sheet>
  );
}
