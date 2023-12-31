import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Footer from 'src/components/Footer/Footer';
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
      setCurrentIndex(clickedIndex);
    }
    router.push(`/view/${boke.bokeId}?order=${sortOrder}`);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVerticalScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (wrapperRef.current) {
      const deltaY = event.deltaY;
      wrapperRef.current.scrollLeft += deltaY;
      event.preventDefault();
    }
  };

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
        <div ref={wrapperRef} onWheel={handleVerticalScroll} className={styles.imageContainer}>
          {bokeData.map((boke, index) => (
            <div
              key={boke.bokeId}
              onClick={() => handleBokeClick(boke, index)}
              className={styles.bokeWrapper}
            >
              <div className={styles.imageWrapper}>
                <img src={boke.image} alt={`Boke ${boke.bokeId}`} className={styles.bokeImage} />
              </div>
              <div className={styles.textWrapper}>
                <div className={styles.bokeText}>{boke.text}</div>
                <div className={styles.bokeLike}>{boke.like}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default View;
