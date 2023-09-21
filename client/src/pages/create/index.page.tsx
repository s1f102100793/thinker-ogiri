import { Box, CircularProgress } from '@mui/material';

import Head from 'next/head';
import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import Footer from 'src/components/Fppter/Footer';
import Header from 'src/components/Header/Header';
import { useCreate } from 'src/hooks/useCreate';
import styles from './create.module.css';

const Create = () => {
  const {
    imageData,
    setImageData,
    loading,
    createImage,
    imageSize,
    bokeText,
    setBokeText,
    newSubmitBoke,
  } = useCreate();

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
        {!imageData ? (
          <>
            {loading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress color="inherit" size={80} />
              </Box>
            ) : (
              <button className={styles.bokeButton} onClick={createImage}>
                ぼける
              </button>
            )}
          </>
        ) : (
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
            <button className={styles.submitButton} onClick={newSubmitBoke}>
              投稿する
            </button>
          </>
        )}

        <BokeImageCarousel customStyle={styles.someCustomStyleForThisPage} />
      </div>
      <Footer />
    </div>
  );
};

export default Create;
