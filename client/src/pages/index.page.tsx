import type { ImageResponseModel } from 'commonTypesWithClient/models';
import { useState } from 'react';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [imageData, setImageData] = useState<string>('');

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
      <Header />
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
