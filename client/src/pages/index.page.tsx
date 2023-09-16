import Header from 'src/components/Header/Header';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContent} />
      <div className={styles.welcomeText}>
        <span>大喜利の世界へ</span>
        <br />
        <span>ようこそ</span>
      </div>
    </div>
  );
};

export default Home;
