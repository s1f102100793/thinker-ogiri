import type { BokeModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useState } from 'react';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './view.module.css';

const View = () => {
  const [bokeData, setBokeData] = useState<BokeModel[]>([]);

  const fetchBoke = async () => {
    const databaseBoke = await apiClient.boke.$get();
    if (databaseBoke) {
      setBokeData(databaseBoke);
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
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;４00&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <button onClick={fetchBoke}>ぼけを見る</button>
      {bokeData.length > 0 && (
        <div className={styles.bokeList}>
          {bokeData.map((boke) => (
            <div key={boke.bokeId} className={styles.bokeItem}>
              <img src={boke.image} alt={`Boke ${boke.bokeId}`} />
              <p>{boke.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default View;
