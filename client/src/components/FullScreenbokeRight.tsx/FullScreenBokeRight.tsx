import { faFacebookSquare, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rating } from '@mui/material';
import React from 'react';
import styles from './FullScreenBokeright.module.css';

type FullScreenBokeRightProps = {
  selectedBoke: {
    text: string;
    like: number;
    image: string;
    bokeId: number;
    createdAt: Date;
  };
  value: number;
  handleRatingChange: (event: React.ChangeEvent<unknown>, newValue: number | null) => void;
  handleCancel: () => void;
  openTwitterShare: (text: string) => void;
  openFacebookShare: (url: string) => void;
  closeBokeDetail: () => void;
  timeSince: (date: Date) => string;
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
}) => {
  return (
    <div className={styles.fullScreenBokeRight}>
      <p className={styles.fullScreenText}>{selectedBoke.text}</p>
      {/* <div className={styles.middleErea}> */}

      <p className={styles.fullScreenTime}>{timeSince(new Date(selectedBoke.createdAt))}</p>
      <div className={styles.twitterShare}>
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          size="2xs"
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
      <div className={styles.rating}>
        <Rating
          name="customized-10"
          size="large"
          value={value}
          onChange={handleRatingChange}
          max={3}
        />
        {value > 0 && <button onClick={handleCancel}>取り消し</button>}
      </div>
      <button className={styles.closeButton} onClick={closeBokeDetail}>
        閉じる
      </button>
    </div>
  );
};

export default FullScreenBokeRight;
