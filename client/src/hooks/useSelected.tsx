import type { BokeModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const useSelected = () => {
  const [selectedBoke, setSelectedBoke] = useState<BokeModel | null>(null);
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
    if (newValue !== null) {
      console.log(newValue - value);
      const updateLike = newValue - value;
      await apiClient.boke.post({
        body: {
          bokeId: selectedBoke?.bokeId,
          userId: undefined,
          text: undefined,
          image: undefined,
          like: updateLike,
        },
      });
      setValue(newValue);
    }
  };

  function timeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} 年前`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} 月前`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} 日前`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} 時間前`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} 分前`;
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
  };
};
