import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import styles from './HomeMainContent.module.css';

export const HomeMainContent = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.mainImage}>
        <a href="/create" className={styles.imageContainer} />
        <a href="/view" className={styles.textContainer}>
          WELCOME TO THINKER
        </a>
        <a href="/create" className={styles.subTextContainer}>
          あなたの大喜利力、ここで試してみませんか
        </a>
      </div>
      <BokeImageCarousel />
    </div>
  );
};

export default HomeMainContent;
