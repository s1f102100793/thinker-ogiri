import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user !== null && router.pathname !== '/createuserprofile') {
        router.push('/createuserprofile');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signOut = async () => {
    if (router.pathname === '/createuserprofile') {
      await auth.signOut();
    }
  };

  return { user, loading, currentPath, auth, router, signOut };
};
