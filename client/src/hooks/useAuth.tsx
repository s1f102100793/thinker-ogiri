import type { UserProfileModel } from 'commonTypesWithClient/models';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { auth } from '../utils/firebaseConfig';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileModel | null>(null);
  const [stage, setStage] = useState(0);
  const router = useRouter();
  const currentPath = router.pathname;

  const fetchUserProfile = useCallback(async () => {
    const myProfile = await apiClient.myprofile.$post({
      body: { mailAddress: user?.email as string },
    });
    if (myProfile !== null) {
      setProfile(myProfile);
    }
    setStage(2);
  }, [user?.email]);

  useEffect(() => {
    if (stage === 0) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        setStage(1);
      });
      return () => unsubscribe();
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 1 && user) {
      fetchUserProfile();
    }
  }, [stage, user, fetchUserProfile]);

  useEffect(() => {
    if (
      stage === 2 &&
      profile === null &&
      user !== null &&
      router.pathname !== '/createuserprofile'
    ) {
      router.push('/createuserprofile');
    }
  }, [stage, profile, user, router]);

  const signOut = async () => {
    if (router.pathname === '/createuserprofile') {
      await auth.signOut();
      setUser(null);
    }
  };

  const signOutButton = async () => {
    await auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return { user, loading, currentPath, auth, router, signOut, profile, signOutButton };
};
