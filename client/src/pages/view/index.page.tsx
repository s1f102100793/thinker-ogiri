import type { BokeModel } from 'commonTypesWithClient/models';
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
