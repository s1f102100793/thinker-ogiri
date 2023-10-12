import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import FullScreenBokeRight from 'src/components/FullScreenbokeRight.tsx/FullScreenBokeRight';
import Header from 'src/components/Header/Header';
import { useAuth } from 'src/hooks/useAuth';
import { useSelected } from 'src/hooks/useSelected';
import { apiClient } from 'src/utils/apiClient';
import styles from './bokeid.module.css';

const BokeDetail = () => {
  const { profile, signInWithGoogle, loadingProfile } = useAuth();
  const {
    openTwitterShare,
    openFacebookShare,
    handleCancel,
    handleRatingChange,
    timeSince,
    selectedBoke,
    value,
    setSelectedBoke,
    loginAlert,
    setValue,
  } = useSelected(profile);

  const router = useRouter();
  const rawBokeId = router.query.bokeId;
  const order = router.query.order;
  const [bokeData, setBokeData] = useState<BokeModel[]>([]);
  const [sortedBokeData, setSortedBokeData] = useState<BokeModel[]>([]);
  const [bokeId, setBokeId] = useState<number | null>(null);

  const fetchBoke = async () => {
    const databaseBoke = await apiClient.boke.$get({});
    if (Array.isArray(databaseBoke)) {
      setBokeData(databaseBoke);
    }
  };

  const currentBokeIndex = sortedBokeData.findIndex((boke) => boke.bokeId === bokeId);

  const navigateToLeft = () => {
    console.log('left');
    console.log(currentBokeIndex);
    if (currentBokeIndex > 0) {
      const newBokeId = sortedBokeData[currentBokeIndex - 1].bokeId;
      router.push(`/view/${newBokeId}?order=${order}`);
    }
  };

  const navigateToRight = () => {
    console.log('right');
    console.log(currentBokeIndex);
    if (currentBokeIndex < sortedBokeData.length - 1) {
      const newBokeId = sortedBokeData[currentBokeIndex + 1].bokeId;
      router.push(`/view/${newBokeId}?order=${order}`);
    }
  };

  const fetchSelectedBoke = useCallback(async () => {
    if (bokeId !== null) {
      const databaseSelectedboke = await apiClient.boke.selected.$post({ body: { bokeId } });

      if (!Array.isArray(databaseSelectedboke)) {
        setSelectedBoke(databaseSelectedboke);
      } else {
        console.error('Expected a single BokeModel but received an array.');
      }
    }
  }, [bokeId, setSelectedBoke]);

  const closeBokeDetail = () => {
    setSelectedBoke(null);
    router.push('/view/');
  };

  useEffect(() => {
    fetchBoke();
  }, []);

  useEffect(() => {
    if (bokeId !== null && profile?.otherUserLike) {
      const matchedLike = profile.otherUserLike.find((like) => like.bokeId === bokeId);
      if (matchedLike) {
        setValue(matchedLike.like);
      }
    }
  }, [bokeId, profile?.otherUserLike, setValue]);

  useEffect(() => {
    if (order === 'like') {
      const orderedData = [...bokeData].sort((a, b) => b.like - a.like);
      setSortedBokeData(orderedData);
    } else if (order === 'createdAt') {
      const orderedData = [...bokeData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSortedBokeData(orderedData);
    } else if (order === 'random') {
      const shuffledData = [...bokeData].sort(() => Math.random() - 0.5);
      setSortedBokeData(shuffledData);
    } else {
      setSortedBokeData(bokeData);
    }
  }, [order, bokeData]);

  useEffect(() => {
    if (typeof rawBokeId === 'string') {
      const cleanedBokeId = rawBokeId.replace(/\/$/, '');
      const parsedId = parseInt(cleanedBokeId);

      if (!isNaN(parsedId)) {
        setBokeId(parsedId);
      }
    }
  }, [rawBokeId]);

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
        <ArrowCircleLeftIcon fontSize="large" />
      </button>

      {selectedBoke && (
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
              loginAlert={loginAlert}
              signInWithGoogle={signInWithGoogle}
            />
          </div>
        </div>
      )}

      <button className={styles.rightButton} onClick={navigateToRight}>
        <ArrowCircleRightIcon fontSize="large" />
      </button>
      <Footer />
    </div>
  );
};

export default BokeDetail;
