import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.textBottomLeft}>考える像大喜利</div>
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.headerBottom}>
          <a href="/" className={styles.link}>
            Home
          </a>
          <a href="/create" className={styles.link}>
            Create
          </a>
          <a href="/view" className={styles.link}>
            View
          </a>
          <a href="/outstanding" className={styles.link}>
            Outstanding
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
