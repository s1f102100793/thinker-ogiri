import Head from 'next/head';
import Footer from 'src/components/Fppter/Footer';
import Header from 'src/components/Header/Header';
import HomeMainContent from 'src/components/HomeMainContent/HomeMainContent';
import styles from './index.module.css';

const Home = () => {
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
      <HomeMainContent />
      <Footer />
    </div>
  );
};

export default Home;
