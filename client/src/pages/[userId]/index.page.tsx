import type { BokeModel, UserProfileModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import styles from 'src/pages/mypage/mypage.module.css';
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

  let displayGender;
  if (profile?.mailAddress !== null) {
    displayGender = '男性';
  } else {
    switch (profile?.gender) {
      case 'mail':
        displayGender = '男性';
        break;
      case 'female':
        displayGender = '女性';
        break;
      case 'other':
        displayGender = 'その他';
        break;
      default:
        displayGender = profile?.gender;
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.maincontent}>
        <div className={styles.background}>
          <div className={styles.profile}>
            <div className={styles.leftcontent}>
              <div className={styles.title}>プロフィール</div>
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.detailKey}>ユーザーID:</span>
                  <span className={styles.detailValue}>{profile?.userId}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailKey}>メールアドレス:</span>
                  <span className={styles.detailValue}>{profile?.mailAddress}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailKey}>場所:</span>
                  <span className={styles.detailValue}>{profile?.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailKey}>性別:</span>
                  <span className={styles.detailValue}>{displayGender}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailKey}>★の合計:</span>
                  <span className={styles.detailValue}>{profile?.totallike}</span>
                </div>
              </div>
              <div className={styles.title}>{profile?.userId}さんの投稿したぼけ</div>
              <div className={styles.bokelist}>
                {bokes.slice(0, visibleBokesCount).map((boke) => (
                  <div key={boke.bokeId} className={styles.boke}>
                    <img src={boke.image} alt="boke" />
                    <p>{boke.text}</p>
                    <span>{`Likes: ${boke.like}`}</span>
                    <span>{`Date: ${new Date(boke.createdAt).toLocaleDateString()}`}</span>
                  </div>
                ))}
              </div>
              <div className={styles.buttonContainer}>
                {bokes.length > visibleBokesCount && (
                  <button onClick={handleShowMore} className={styles.button}>
                    もっと見る
                  </button>
                )}
              </div>
            </div>
            <div className={styles.rightcontent} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Userpage;
