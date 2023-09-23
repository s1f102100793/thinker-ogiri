import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import styles from './HomeMainContent.module.css';

export const HomeMainContent = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.mainImage}>
        <div className={styles.imageContainer} />
        <a href="/view" className={styles.textContainer}>
          WELCOME TO THINKER
        </a>
      </div>
      <BokeImageCarousel />
    </div>
  );
};

export default HomeMainContent;
