import Head from 'next/head';
import { useEffect } from 'react';
import Header from 'src/components/Header/Header';
import { useHome } from 'src/hooks/useHome';
import styles from './index.module.css';

const Home = () => {
  const { homeBokeImg, displayImages, setDisplayImages, fetchHomeboke } = useHome();

  useEffect(() => {
    fetchHomeboke();
  }, [fetchHomeboke]);

  useEffect(() => {
    if (homeBokeImg.length > 0) {
      setDisplayImages(homeBokeImg.slice(0, 5));
    }
  }, [homeBokeImg, setDisplayImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (homeBokeImg.length === 0) return;

      const newImages = [...displayImages.slice(1)];
      const nextImageIndex = homeBokeImg.indexOf(newImages[newImages.length - 1]) + 1;

      if (homeBokeImg[nextImageIndex]) {
        newImages.push(homeBokeImg[nextImageIndex]);
      } else {
        newImages.push(homeBokeImg[0]);
      }

      setDisplayImages(newImages);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages, homeBokeImg, setDisplayImages]);

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
        <div className={styles.imageContainer}>
          {displayImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Boke image ${index}`}
              className={styles.displayedImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
