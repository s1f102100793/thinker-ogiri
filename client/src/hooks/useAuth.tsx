import type { UserProfileModel } from 'commonTypesWithClient/models';
import type { User } from 'firebase/auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { auth } from '../utils/firebaseConfig';

const userAtom = atom<User | null>(null);
const userProfileAtom = atom<UserProfileModel | null>(null);
const loadingAtom = atom<boolean>(false);

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [profile, setProfile] = useAtom(userProfileAtom);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useAtom(loadingAtom);
  const [stage, setStage] = useState(0);
  const router = useRouter();
  const currentPath = router.pathname;

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const myProfile = await apiClient.profile.myprofile.$post({
        body: { mailAddress: user?.email as string },
      });
      if (myProfile !== null) {
        setProfile(myProfile);
      }
      setStage(2);
    } finally {
      setLoadingProfile(false);
    }
  }, [user?.email, setProfile, setLoadingProfile]);

  useEffect(() => {
    if (stage === 0) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        setStage(1);
      });
      return () => unsubscribe();
    }
  }, [stage, setUser, setLoadingProfile]);

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

  return {
    user,
    loading,
    currentPath,
    auth,
    router,
    signOut,
    profile,
    signOutButton,
    signInWithGoogle,
    loadingProfile,
  };
};
