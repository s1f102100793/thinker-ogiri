import type { BokeModel } from 'commonTypesWithClient/models';
import { useCallback, useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import { useAuth } from 'src/hooks/useAuth';
import { apiClient } from 'src/utils/apiClient';
import styles from './mypage.module.css';

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
                {/* <div className={styles.detailItem}>
                <span className={styles.detailKey}>メールアドレス:</span>
                <span className={styles.detailValue}>{profile?.mailAddress}</span>
              </div> */}
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

export default Mypage;
