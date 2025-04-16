
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AuthPage } from './AuthPage';
import { ReferralSystem } from '../ReferralSystem';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('has_access')
          .eq('id', session.user.id)
          .single();

        setIsAuthenticated(!!session);
        setHasAccess(profileData?.has_access || false);
      } else {
        setIsAuthenticated(false);
        setHasAccess(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      checkUserAccess();
    });

    checkUserAccess();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null || hasAccess === null) {
    return null; // Loading state
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (!hasAccess) {
    return <ReferralSystem />;
  }

  return <>{children}</>;
};
