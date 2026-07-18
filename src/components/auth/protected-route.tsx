'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';
import { resolveUserRole, UserRole } from '@/lib/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const effectiveRole = userProfile?.role ?? (user?.email ? resolveUserRole(user.email) : undefined);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
      } else if (allowedRoles && effectiveRole) {
        if (!allowedRoles.includes(effectiveRole)) {
          router.push('/unauthorized');
        }
      }
    }
  }, [user, userProfile, loading, allowedRoles, redirectTo, router, effectiveRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && effectiveRole && !allowedRoles.includes(effectiveRole)) {
    return null;
  }

  return <>{children}</>;
}
