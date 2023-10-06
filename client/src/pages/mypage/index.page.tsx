import type { BokeModel } from 'commonTypesWithClient/models';
import { useCallback, useEffect, useState } from 'react';
import ProfilePage from 'src/components/ProfilePage/ProfilePage';
import { useAuth } from 'src/hooks/useAuth';
import { apiClient } from 'src/utils/apiClient';

const Mypage = () => {
  const { profile } = useAuth();

  const [bokes, setBokes] = useState<BokeModel[]>([]);
  const [visibleBokesCount, setVisibleBokesCount] = useState(10);

  const handleShowMore = () => {
    setVisibleBokesCount((prevCount) => prevCount + 10);
  };

  const fetchUserIdBoke = useCallback(async () => {
    if (profile === null) {
      return;
    }
    const response = await apiClient.boke.userboke.$post({ body: { userId: profile?.userId } });
    setBokes(response);
  }, [profile]);

  useEffect(() => {
    fetchUserIdBoke();
  }, [fetchUserIdBoke]);

  return (
    <ProfilePage
      profile={profile}
      bokes={bokes}
      handleShowMore={handleShowMore}
      visibleBokesCount={visibleBokesCount}
    />
  );
};

export default Mypage;
