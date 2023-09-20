import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './view.module.css';

const View = () => {
  const router = useRouter();
  const [bokeData, setBokeData] = useState<BokeModel[]>([]);
  const fetchBoke = async () => {
    const databaseBoke = await apiClient.boke.$get({});
    if (Array.isArray(databaseBoke)) {
      setBokeData(databaseBoke);
    }
  };
  const handleBokeClick = (boke: BokeModel, clickedIndex: number) => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.clientWidth;
      const newOffset = clickedIndex * wrapperWidth * 0.33;
      setOffset(newOffset);
      setCurrentIndex(clickedIndex);
    }
    router.push(`/view/${boke.bokeId}?order=like`);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.clientWidth;
        let newOffset: number | undefined;

        if (e.deltaY > 0 && currentIndex < bokeData.length - 1) {
          newOffset = (currentIndex + 1) * wrapperWidth * 0.33;
          setCurrentIndex(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          newOffset = (currentIndex - 1) * wrapperWidth * 0.33;
          setCurrentIndex(currentIndex - 1);
        }

        if (newOffset !== undefined) {
          setOffset(newOffset);
        }
      }
    };
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [bokeData.length, currentIndex]);

  useEffect(() => {
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
      <div className={styles.contentWrapper} ref={wrapperRef}>
        <div className={styles.bokeList} style={{ transform: `translateX(-${offset}px)` }}>
          <div className={styles.initialMargin} />
          {bokeData.map((boke, index) => (
            <div
              key={boke.bokeId}
              className={`${styles.bokeItem} ${index === currentIndex ? styles.centerItem : ''}`}
              onClick={() => handleBokeClick(boke, index)}
            >
              <div className={styles.imageBorder}>
                <img src={boke.image} alt={`Boke ${boke.bokeId}`} />
              </div>
              <div className={styles.description}>
                <div className={styles.textWrapper}>{boke.text}</div>
                <div className={styles.likeWrapper}>{boke.like}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
