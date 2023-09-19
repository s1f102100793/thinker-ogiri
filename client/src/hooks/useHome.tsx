import type { BokeModel } from 'commonTypesWithClient/models';
import { useCallback, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const useHome = () => {
  const [homeBokeData, setHomeBokeData] = useState<BokeModel[]>([]);
  const [homeBokeImg, setHomeBokeImg] = useState<string[]>([]);
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  const fetchHomeboke = useCallback(async () => {
    const databaseBoke = await apiClient.boke.$get();

    if (Array.isArray(databaseBoke)) {
      setHomeBokeData(databaseBoke);
      setHomeBokeImg(databaseBoke.map((boke) => boke.image));
    } else if (databaseBoke) {
      console.error('Expected an array of BokeModel but received a single instance.');
    } else {
      console.error('Failed to fetch boke data');
    }
  }, []);

  return {
    homeBokeData,
    setHomeBokeData,
    homeBokeImg,
    setHomeBokeImg,
    displayImages,
    setDisplayImages,
    fetchHomeboke,
  };
};
