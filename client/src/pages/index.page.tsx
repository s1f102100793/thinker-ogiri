import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useState } from 'react';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [homeBokeData, setHomeBokeData] = useState<BokeModel[]>([]);
  const [homeBokeImg, setHomeBokeImg] = useState<string[]>([]);

  const fetchHomeboke = async () => {
    const databaseBoke = await apiClient.boke.$get();
    if (databaseBoke) {
      setHomeBokeData(databaseBoke);
      setHomeBokeImg(databaseBoke.map((boke) => boke.image));
    } else {
      console.error('Failed to fetch boke data');
    }
  };

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
        <div className={styles.mainImage}>
          <div className={styles.textContainer}>WELCOME TO RODIN OGIRI</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
