import type { BokeModel, UserProfileModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const useSelected = (profile: UserProfileModel | null) => {
  const [selectedBoke, setSelectedBoke] = useState<BokeModel | null>(null);
  const [loginAlert, setLoginAlert] = useState(false);
  const [value, setValue] = useState(0);

  const openTwitterShare = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openFacebookShare = (url: string) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCancel = () => {
    console.log(-value);
    setValue(0);
  };

  const handleRatingChange = async (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    setLoginAlert(false);
    if (profile !== null) {
      if (newValue !== null) {
        console.log(newValue - value);
        const updateLike = newValue - value;
        const newBokeState = await apiClient.boke.$post({
          body: {
            bokeId: selectedBoke?.bokeId,
            userId: undefined,
            text: undefined,
            image: undefined,
            like: updateLike,
          },
        });
        console.log(newBokeState);
        setSelectedBoke(newBokeState);
        setValue(newValue);
      }
    } else {
      setLoginAlert(true);
    }
  };

  function calculateInterval(seconds: number, divisor: number, unit: string): string | null {
    const interval = Math.floor(seconds / divisor);
    if (interval > 1) {
      return `${interval} ${unit}前`;
    }
    return null;
  }

  function timeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const timeUnits = [
      { divisor: 31536000, unit: '年' },
      { divisor: 2592000, unit: '月' },
      { divisor: 86400, unit: '日' },
      { divisor: 3600, unit: '時間' },
      { divisor: 60, unit: '分' },
    ];

    for (const timeUnit of timeUnits) {
      const result = calculateInterval(seconds, timeUnit.divisor, timeUnit.unit);
      if (result !== null) return result;
    }

    return `${Math.floor(seconds)} 秒前`;
  }

  const router = useRouter();
  const rawBokeId = router.query.bokeId;
  const order = router.query.order;

  const [bokeData, setBokeData] = useState<BokeModel[]>([]);
  const [sortedBokeData, setSortedBokeData] = useState<BokeModel[]>([]);
  const [bokeId, setBokeId] = useState<number | null>(null);

  const fetchBoke = async () => {
    const databaseBoke = await apiClient.boke.$get({});
    if (Array.isArray(databaseBoke)) {
      setBokeData(databaseBoke);
    }
  };

  const currentBokeIndex = sortedBokeData.findIndex((boke) => boke.bokeId === bokeId);

  const navigateToLeft = () => {
    console.log('left');
    console.log(currentBokeIndex);
    if (currentBokeIndex > 0) {
      const newBokeId = sortedBokeData[currentBokeIndex - 1].bokeId;
      router.push(`/view/${newBokeId}?order=${order}`);
    }
  };

  const navigateToRight = () => {
    console.log('right');
    console.log(currentBokeIndex);
    if (currentBokeIndex < sortedBokeData.length - 1) {
      const newBokeId = sortedBokeData[currentBokeIndex + 1].bokeId;
      router.push(`/view/${newBokeId}?order=${order}`);
    }
  };

  const fetchSelectedBoke = useCallback(async () => {
    if (bokeId !== null) {
      console.log(bokeId);
      const databaseSelectedboke = await apiClient.boke.selected.$post({ body: { bokeId } });
      console.log(databaseSelectedboke);

      if (!Array.isArray(databaseSelectedboke)) {
        setSelectedBoke(databaseSelectedboke);
      } else {
        console.error('Expected a single BokeModel but received an array.');
      }
    }
  }, [bokeId, setSelectedBoke]);

  const closeBokeDetail = () => {
    setSelectedBoke(null);
    router.push('/view/');
  };

  return {
    openTwitterShare,
    openFacebookShare,
    handleCancel,
    handleRatingChange,
    timeSince,
    selectedBoke,
    value,
    setSelectedBoke,
    router,
    rawBokeId,
    order,
    bokeData,
    sortedBokeData,
    setSortedBokeData,
    bokeId,
    setBokeId,
    fetchBoke,
    currentBokeIndex,
    navigateToLeft,
    navigateToRight,
    fetchSelectedBoke,
    closeBokeDetail,
    loginAlert,
  };
};
