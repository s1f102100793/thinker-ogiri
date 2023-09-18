import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '@mui/material';
import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useEffect, useState } from 'react'; // useEffectをインポート
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './view.module.css';

const View = () => {
  const [bokeData, setBokeData] = useState<BokeModel[]>([]);

  const fetchBoke = async () => {
    const databaseBoke = await apiClient.boke.$get();
    if (databaseBoke) {
      console.log(databaseBoke);
      setBokeData(databaseBoke);
    } else {
      console.error('Failed to fetch boke data');
    }
  };

  const [selectedBoke, setSelectedBoke] = useState<BokeModel | null>(null);

  const handleBokeClick = (boke: BokeModel) => {
    setSelectedBoke(boke);
  };

  const closeBokeDetail = () => {
    setSelectedBoke(null);
  };

  const openTwitterShare = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const [value, setValue] = useState(0);

  const handleRatingChange = async (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    if (newValue !== null) {
      // console.log(newValue);
      console.log(newValue - value);
      const updateLike = newValue - value;
      await apiClient.boke.post({
        body: {
          bokeId: selectedBoke?.bokeId,
          userId: undefined,
          text: undefined,
          image: undefined,
          like: updateLike,
        },
      });
      setValue(newValue);
    }
  };

  const handleCancel = () => {
    console.log(-value);
    setValue(0);
  };

  function timeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} 年前`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} 月前`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} 日前`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} 時間前`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} 分前`;
    }
    return `${Math.floor(seconds)} 秒前`;
  }

  useEffect(() => {
    console.log('useEffect');
    fetchBoke();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className={styles.contentWrapper}>
        {selectedBoke !== null ? (
          <div className={styles.fullScreenBoke}>
            <div className={styles.fullScreenBokeLeft}>
              <img
                className={styles.fullScreenImage}
                src={selectedBoke.image}
                alt={`Boke ${selectedBoke.bokeId}`}
              />
            </div>
            <div className={styles.fullScreenBokeRight}>
              <p className={styles.fullScreenText}>{selectedBoke.text}</p>
              <div className={styles.middleErea}>
                <p className={styles.middleEreaLikeCount}>★{selectedBoke.like}</p>
                <p className={styles.fullScreenTime}>
                  {timeSince(new Date(selectedBoke.createdAt))}
                </p>
                <div className={styles.twitterShare}>
                  <FontAwesomeIcon
                    icon={faSquareXTwitter}
                    size="2xs"
                    style={{ color: '#434343' }}
                    onClick={() => openTwitterShare(selectedBoke.text)}
                  />
                </div>
              </div>
              <div className={styles.rating}>
                <Rating name="customized-10" value={value} onChange={handleRatingChange} max={3} />
                {value > 0 && <button onClick={handleCancel}>取り消し</button>}
              </div>
              <button className={styles.closeButton} onClick={closeBokeDetail}>
                閉じる
              </button>
            </div>
          </div>
        ) : (
          bokeData.length > 0 && (
            <div className={styles.bokeList}>
              {bokeData.map((boke) => (
                <div
                  key={boke.bokeId}
                  className={styles.bokeItem}
                  onClick={() => handleBokeClick(boke)}
                >
                  <img src={boke.image} alt={`Boke ${boke.bokeId}`} />
                  <div className={styles.bokeDetails}>
                    <p>
                      <span className={styles.likeCount}>★{boke.like}</span> {boke.text}
                    </p>
                    <p>{timeSince(new Date(boke.createdAt))}</p>
                    <div className={styles.socialShare}>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${boke.text}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faSquareXTwitter}
                          size="2xs"
                          style={{ color: '#000' }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default View;
