import type { ImageResponseModel } from 'commonTypesWithClient/models';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [imageData, setImageData] = useState<string>('');
  const currentPath = window.location.pathname;

  const createImage = async () => {
    try {
      const res: ImageResponseModel | null = await apiClient.image.$post();
      if (!res) {
        console.error('API response is null');
        return;
      }

      console.log(res);
      if (res.data[0]?.b64_json) {
        setImageData(res.data[0].b64_json);
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.textBottomLeft}>考える像大喜利</div>
      </div>
      <div className={styles.headerBottom}>
        <a href="/" className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}>
          Home
        </a>
        <a
          href="/create"
          className={`${styles.link} ${currentPath === '/create' ? styles.active : ''}`}
        >
          Create
        </a>
        <a
          href="/view"
          className={`${styles.link} ${currentPath === '/view' ? styles.active : ''}`}
        >
          View
        </a>
        <a
          href="/outstanding"
          className={`${styles.link} ${currentPath === '/outstanding' ? styles.active : ''}`}
        >
          Outstanding
        </a>
      </div>
      <button onClick={createImage}>作る</button>
      {imageData && (
        <div className="generated-image-area">
          <figure>
            <img src={`data:image/png;base64,${imageData}`} alt="Generated Data" />
          </figure>
        </div>
      )}
    </div>
  );
};

export default Home;
