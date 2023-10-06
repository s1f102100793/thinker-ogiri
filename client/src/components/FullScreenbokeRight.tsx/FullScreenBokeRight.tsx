import { faFacebookSquare, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './FullScreenBokeright.module.css';

type FullScreenBokeRightProps = {
  selectedBoke: {
    text: string;
    like: number;
    image: string;
    bokeId: number;
    userId: string;
    createdAt: Date;
  };
  value: number;
  handleRatingChange: (event: React.ChangeEvent<unknown>, newValue: number | null) => void;
  handleCancel: () => void;
  openTwitterShare: (text: string) => void;
  openFacebookShare: (url: string) => void;
  closeBokeDetail: () => void;
  timeSince: (date: Date) => string;
  loginAlert: boolean;
  signInWithGoogle: () => void;
};

export const FullScreenBokeRight: React.FC<FullScreenBokeRightProps> = ({
  selectedBoke,
  value,
  handleRatingChange,
  handleCancel,
  openTwitterShare,
  openFacebookShare,
  closeBokeDetail,
  timeSince,
  loginAlert,
  signInWithGoogle,
}) => {
  const router = useRouter();
  const handleUserIdClick = () => {
    router.push(`/${selectedBoke.userId}`);
  };

  return (
    <div className={styles.fullScreenBokeRight}>
      <p className={styles.fullScreenText}>{selectedBoke.text}</p>
      <p className={styles.fullScreenTime} onClick={handleUserIdClick}>
        {selectedBoke.userId}
      </p>
      {/* <div className={styles.middleErea}> */}

      <p className={styles.fullScreenTime}>{timeSince(new Date(selectedBoke.createdAt))}</p>
      <div className={styles.twitterShare}>
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          size="xs"
          style={{ color: '#434343' }}
          onClick={() => openTwitterShare(selectedBoke.text)}
        />

        <FontAwesomeIcon
          icon={faFacebookSquare}
          size="2xs"
          style={{ color: '#434343' }}
          onClick={() => openFacebookShare(selectedBoke.text)}
        />
      </div>
      {/* </div> */}
      <p className={styles.middleEreaLikeCount}>★{selectedBoke.like}</p>
      {loginAlert !== true ? (
        <div className={styles.rating}>
          <Rating
            name="customized-10"
            size="large"
            value={value}
            onChange={handleRatingChange}
            max={3}
          />
          {value > 0 && <button className={styles.cancel}onClick={handleCancel}>取り消し</button>}
        </div>
      ) : (
        <div onClick={signInWithGoogle} className={styles.noUserAlert}>
          評価するにはユーザーログインが必要です
        </div>
      )}
      <button className={styles.closeButton} onClick={closeBokeDetail}>
        閉じる
      </button>
    </div>
  );
};

export default FullScreenBokeRight;
