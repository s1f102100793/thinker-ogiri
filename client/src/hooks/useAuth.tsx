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
      } else if (router.pathname !== '/createuserprofile') {
        router.push('/createuserprofile');
      }
    } finally {
      setLoadingProfile(false);
    }
  }, [user?.email, setProfile, setLoadingProfile, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      fetchUserProfile();
    });
    return () => unsubscribe();
  }, [setUser, setLoadingProfile, fetchUserProfile, loadingProfile]);

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
