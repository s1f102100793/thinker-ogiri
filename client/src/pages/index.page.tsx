import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const currentPath = window.location.pathname;

  const createImage = async () => {
    const res = await apiClient.image.post();
    console.log(res);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.textBottomLeft}>考える像大喜利</div>
      </div>
      <div className={styles.headerBottom}>
        <a href="/" className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}>
          Home
        </a>
        <a
          href="/create"
          className={`${styles.link} ${currentPath === '/create' ? styles.active : ''}`}
        >
          Create
        </a>
        <a
          href="/view"
          className={`${styles.link} ${currentPath === '/view' ? styles.active : ''}`}
        >
          View
        </a>
        <a
          href="/outstanding"
          className={`${styles.link} ${currentPath === '/outstanding' ? styles.active : ''}`}
        >
          Outstanding
        </a>
      </div>
      <button onClick={createImage}>作る</button>
    </div>
  );
};

export default Home;
