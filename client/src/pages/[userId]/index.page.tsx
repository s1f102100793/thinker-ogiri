import type { BokeModel, UserProfileModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ProfilePage from 'src/components/ProfilePage/ProfilePage';
import { apiClient } from 'src/utils/apiClient';

const Userpage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [profile, setProfile] = useState<UserProfileModel | null>(null);
  const [bokes, setBokes] = useState<BokeModel[]>([]);
  const [visibleBokesCount, setVisibleBokesCount] = useState(10);

  const handleShowMore = () => {
    setVisibleBokesCount((prevCount) => prevCount + 10);
  };

  const fetchUserIdBoke = useCallback(async () => {
    const response = await apiClient.boke.userboke.$post({ body: { userId } });
    setBokes(response);
  }, [userId]);

  const fetchUserProfile = useCallback(async () => {
    const userProfile = await apiClient.profile.userprofile.$post({
      body: { userId },
    });
    setProfile(userProfile);
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
    fetchUserIdBoke();
  }, [fetchUserProfile, fetchUserIdBoke]);

  return (
    <ProfilePage
      profile={profile}
      bokes={bokes}
      handleShowMore={handleShowMore}
      visibleBokesCount={visibleBokesCount}
    />
  );
};

export default Userpage;
