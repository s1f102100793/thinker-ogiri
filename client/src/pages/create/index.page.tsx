import type { ImageResponseModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useState } from 'react';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './create.module.css';

const Create = () => {
  const [imageData, setImageData] = useState<string>('');
  const [bokeText, setBokeText] = useState<string>('');

  const imageSize = 300;

  const userId = 'gouta';

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

  const submitBoke = async () => {
    await apiClient.boke.post({ body: { userId, text: bokeText, image: imageData, like: 0 } });
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
      <div className={styles.content}>
        <button className={styles.bokeButton} onClick={createImage}>
          ぼける
        </button>
        {imageData && (
          <>
            <div className={styles.imageContainer}>
              <img
                src={`data:image/png;base64,${imageData}`}
                alt="Generated Data"
                width={imageSize}
                height={imageSize}
              />
            </div>
            <input
              type="text"
              className={styles.textBox}
              value={bokeText}
              onChange={(e) => setBokeText(e.target.value)}
              placeholder="ぼけの言葉を入力"
            />
            <button className={styles.submitButton} onClick={submitBoke}>
              投稿する
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Create;
