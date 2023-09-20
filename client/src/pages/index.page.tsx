import Head from 'next/head';
import { useEffect } from 'react';
import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import Header from 'src/components/Header/Header';
import { useHome } from 'src/hooks/useHome';
import styles from './index.module.css';

const Home = () => {
  const { homeBokeImg, fetchHomeboke } = useHome();

  useEffect(() => {
    fetchHomeboke();
  }, [fetchHomeboke]);

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
        <BokeImageCarousel homeBokeImg={homeBokeImg} />
      </div>
    </div>
  );
};

export default Home;
