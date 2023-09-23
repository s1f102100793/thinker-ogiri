import type { BokeModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHome } from 'src/hooks/useHome';
import styles from './BokeImageCarousel.module.css';

type BokeImageCarouselProps = {
  customStyle?: string;
};

const BokeImageCarousel: React.FC<BokeImageCarouselProps> = ({ customStyle }) => {
  const { homeBokeData, fetchHomeboke } = useHome();
  const [displayImages, setDisplayImages] = useState<BokeModel[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchHomeboke();
  }, [fetchHomeboke]);

  useEffect(() => {
    if (homeBokeData.length > 0) {
      setDisplayImages(homeBokeData.slice(0, 5));
    }
  }, [homeBokeData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (homeBokeData.length === 0) return;

      const newImages = [...displayImages.slice(1)];
      const nextImageIndex =
        homeBokeData.findIndex((boke) => boke === newImages[newImages.length - 1]) + 1;

      if (homeBokeData[nextImageIndex] !== undefined) {
        newImages.push(homeBokeData[nextImageIndex]);
      } else {
        newImages.push(homeBokeData[0]);
      }

      setDisplayImages(newImages);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages, homeBokeData]);

  const handleBokeClick = (boke: BokeModel) => {
    router.push(`/view/${boke.bokeId}?order=createdAt`);
  };

  return (
    <div className={`${styles.imageContainer} ${customStyle}`}>
      {displayImages.map((boke) => (
        <img
          key={boke.bokeId}
          src={boke.image}
          alt={`Boke image ${boke.bokeId}`}
          className={styles.displayedImg}
          onClick={() => handleBokeClick(boke)}
        />
      ))}
    </div>
  );
};

export default BokeImageCarousel;
