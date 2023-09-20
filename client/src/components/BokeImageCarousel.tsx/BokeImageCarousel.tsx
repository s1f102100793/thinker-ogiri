import { useEffect, useState } from 'react';
import styles from './BokeImageCarousel.module.css';

interface Props {
  homeBokeImg: string[];
}

const BokeImageCarousel: React.FC<Props> = ({ homeBokeImg }) => {
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  useEffect(() => {
    if (homeBokeImg.length > 0) {
      setDisplayImages(homeBokeImg.slice(0, 5));
    }
  }, [homeBokeImg]);

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
  }, [displayImages, homeBokeImg]);

  return (
    <div className={styles.imageContainer}>
      {displayImages.map((img, index) => (
        <img key={index} src={img} alt={`Boke image ${index}`} className={styles.displayedImg} />
      ))}
    </div>
  );
};

export default BokeImageCarousel;
