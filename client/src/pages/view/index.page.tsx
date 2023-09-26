import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Footer from 'src/components/Fppter/Footer';
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
    console.log(databaseBoke);
  };

  const [sortOrder, setSortOrder] = useState<'like' | 'createdAt' | 'random'>('like');

  const sortBoke = (order: 'like' | 'createdAt' | 'random') => {
    let sortedData = [...bokeData];
    switch (order) {
      case 'like':
        sortedData.sort((a, b) => b.like - a.like);
        break;
      case 'createdAt':
        sortedData.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'random':
        sortedData = sortedData.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    setBokeData(sortedData);
    setSortOrder(order);
  };

  const handleBokeClick = (boke: BokeModel, clickedIndex: number) => {
    if (wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.clientWidth;
      const newOffset = clickedIndex * wrapperWidth * 0.33;
      setOffset(newOffset);
      setCurrentIndex(clickedIndex);
    }
    router.push(`/view/${boke.bokeId}?order=${sortOrder}`);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line complexity
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.clientWidth;

        const oneThirdWidth = window.innerWidth <= 576 ? wrapperWidth : wrapperWidth * 0.33;

        let newOffset = currentIndex * oneThirdWidth;

        if (e.deltaY > 0 && currentIndex < bokeData.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          newOffset += oneThirdWidth;
        } else if (e.deltaY < 0 && currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
          newOffset -= oneThirdWidth;
        }

        setOffset(newOffset);
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
      <div className={styles.mainContent}>
        <div className={styles.buttonList}>
          <button onClick={() => sortBoke('like')}>Like</button>
          <button onClick={() => sortBoke('createdAt')}>CreatedAt</button>
          <button onClick={() => sortBoke('random')}>Random</button>
        </div>
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
      <Footer />
    </div>
  );
};

export default View;
