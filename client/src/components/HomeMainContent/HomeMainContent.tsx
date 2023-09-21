import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import styles from './HomeMainContent.module.css';

export const HomeMainContent = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.mainImage}>
        <div className={styles.imageContainer} />
        <div className={styles.textContainer}>WELCOME TO THINKER</div>
      </div>
      <BokeImageCarousel />
    </div>
  );
};

export default HomeMainContent;
