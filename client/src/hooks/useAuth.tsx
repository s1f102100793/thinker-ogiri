import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';
import useURLChange from './useURLChange';
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevPath, setPrevPath] = useState(window.location.pathname); 
  const path = useURLChange();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user && window.location.pathname !== '/createuserprofile/') {
        window.location.href = '/createuserprofile';
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      user &&
      prevPath === '/createuserprofile' && 
      path !== '/createuserprofile' 
    ) {
      auth.signOut();
    }
    setPrevPath(path);
  }, [path, user, prevPath]);

  return { user, loading };
};
