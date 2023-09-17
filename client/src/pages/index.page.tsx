import Head from 'next/head';
import Header from 'src/components/Header/Header';
import styles from './index.module.css';

const Home = () => {
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
      <div className={styles.mainContent}>
        <div className={styles.mainImage}>
          <div className={styles.textContainer}>WELCOME TO RODIN OGIRI</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
