import type { BokeModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import ProfilePage from 'src/components/ProfilePage/ProfilePage';
import { useAuth } from 'src/hooks/useAuth';
import { apiClient } from 'src/utils/apiClient';
import styles from './mypage.module.css';

const Mypage = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const [bokes, setBokes] = useState<BokeModel[] | null>([]);
  const [visibleBokesCount, setVisibleBokesCount] = useState(10);
  const { signInWithGoogle } = useAuth();

  const handleShowMore = () => {
    setVisibleBokesCount((prevCount) => prevCount + 10);
  };

  const fetchUserIdBoke = useCallback(async () => {
    console.log(profile);
    if (profile === null) {
      setBokes(null);
      console.log('profile is null');
      return;
    }
    const response = await apiClient.boke.userboke.$post({ body: { userId: profile?.userId } });
    setBokes(response);
  }, [profile]);

  useEffect(() => {
    fetchUserIdBoke();
  }, [fetchUserIdBoke]);

  const redirectToBokePage = (bokeId: number) => {
    router.push(`/view/${bokeId}?order=random`);
  };

  return bokes !== null ? (
    <ProfilePage
      profile={profile}
      bokes={bokes}
      handleShowMore={handleShowMore}
      visibleBokesCount={visibleBokesCount}
      redirectToBokePage={redirectToBokePage}
    />
  ) : (
    <>
      <Header />
      <div className={styles.maincontent}>
        <div className={styles.alert} onClick={signInWithGoogle}>
          GoogleでSign inしてください
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mypage;
