import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'; // useEffectをインポート
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
    } else if (databaseBoke) {
      console.error('Expected an array of BokeModel but received a single instance.');
    } else {
      console.error('Failed to fetch boke data');
    }
  };

  const handleBokeClick = (boke: BokeModel) => {
    router.push(`/view/${boke.bokeId}`);
    // setSelectedBoke(boke);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

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
      <div className={styles.contentWrapper} ref={wrapperRef}>
        <div className={styles.bokeList}>
          {bokeData.map((boke, index) => (
            <div
              key={boke.bokeId}
              className={`${styles.bokeItem} ${index === 1 ? styles.centerItem : ''}`}
              onClick={() => handleBokeClick(boke)}
            >
              <div className={styles.imageBorder}>
                <img src={boke.image} alt={`Boke ${boke.bokeId}`} />
              </div>
              <div className={styles.description}>{boke.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
