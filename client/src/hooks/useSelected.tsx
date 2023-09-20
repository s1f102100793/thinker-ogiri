import type { BokeModel } from 'commonTypesWithClient/models';
import { useState } from 'react';
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

  return {
    openTwitterShare,
    openFacebookShare,
    handleCancel,
    handleRatingChange,
    timeSince,
    selectedBoke,
    value,
    setSelectedBoke,
  };
};
