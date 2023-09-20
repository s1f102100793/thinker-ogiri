import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import FullScreenBokeRight from 'src/components/FullScreenbokeRight.tsx/FullScreenBokeRight';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './bokeid.module.css';

const BokeDetail = () => {
  const router = useRouter();
  const rawBokeId = router.query.bokeId;
  const order = router.query.order;

  const [bokeData, setBokeData] = useState<BokeModel[]>([]);
  const [sortedBokeData, setSortedBokeData] = useState<BokeModel[]>([]);

  const fetchBoke = async () => {
    const databaseBoke = await apiClient.boke.$get({});
    if (Array.isArray(databaseBoke)) {
      setBokeData(databaseBoke);
    }
  };

  useEffect(() => {
    fetchBoke();
  }, []);

  useEffect(() => {
    if (order === 'like') {
      const orderedData = [...bokeData].sort((a, b) => b.like - a.like);
      setSortedBokeData(orderedData);
    } else {
      setSortedBokeData(bokeData);
    }
  }, [order, bokeData]);

  let bokeId: number | null = null;

  const currentBokeIndex = sortedBokeData.findIndex((boke) => boke.bokeId === bokeId);

  const navigateToLeft = () => {
    if (currentBokeIndex > 0) {
      const newBokeId = sortedBokeData[currentBokeIndex - 1].bokeId;
      router.push(`/view/${newBokeId}?order=${order}`);
    }
  };

  const navigateToRight = () => {
    if (currentBokeIndex < sortedBokeData.length - 1) {
      const newBokeId = sortedBokeData[currentBokeIndex + 1].bokeId;
      router.push(`/view/${newBokeId}?order=${order}`);
    }
  };

  if (typeof rawBokeId === 'string') {
    const cleanedBokeId = rawBokeId.replace(/\/$/, '');
    const parsedId = parseInt(cleanedBokeId);

    if (!isNaN(parsedId)) {
      bokeId = parsedId;
    }
  }
  const [selectedBoke, setSelectedBoke] = useState<BokeModel | null>(null);
  const [value, setValue] = useState(0);

  const closeBokeDetail = () => {
    setSelectedBoke(null);
    router.push('/view/');
  };

  const openTwitterShare = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openFacebookShare = (url: string) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCancel = () => {
    console.log(-value);
    setValue(0);
  };

  const handleRatingChange = async (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    if (newValue !== null) {
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

  const fetchSelectedBoke = useCallback(async () => {
    if (bokeId !== null) {
      console.log(bokeId);
      const databaseSelectedboke = await apiClient.boke.selected.$post({ body: { bokeId } });
      console.log(databaseSelectedboke);

      if (!Array.isArray(databaseSelectedboke)) {
        setSelectedBoke(databaseSelectedboke);
      } else {
        console.error('Expected a single BokeModel but received an array.');
      }
    }
  }, [bokeId]);

  useEffect(() => {
    fetchSelectedBoke();
  }, [fetchSelectedBoke]);

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
      <button className={styles.leftButton} onClick={navigateToLeft}>
        &lt;
      </button>

      {selectedBoke !== null && (
        <div className={styles.contentWrapper}>
          <div className={styles.fullScreenBoke}>
            <div className={styles.fullScreenBokeLeft}>
              <img
                className={styles.fullScreenImage}
                src={selectedBoke.image}
                alt={`Boke ${selectedBoke.bokeId}`}
              />
            </div>
            <FullScreenBokeRight
              selectedBoke={selectedBoke}
              value={value}
              handleRatingChange={handleRatingChange}
              handleCancel={handleCancel}
              openTwitterShare={openTwitterShare}
              openFacebookShare={openFacebookShare}
              closeBokeDetail={closeBokeDetail}
              timeSince={timeSince}
            />
          </div>
        </div>
      )}
      <button className={styles.rightButton} onClick={navigateToRight}>
        &gt;
      </button>
    </div>
  );
};

export default BokeDetail;
