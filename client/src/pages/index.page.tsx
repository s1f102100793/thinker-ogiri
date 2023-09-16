import Header from 'src/components/Header/Header';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent} />
      <div className={styles.welcomeText}>大喜利の世界へようこそ</div>
    </div>
  );
};

export default Home;
