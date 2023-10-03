import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { useEffect } from 'react';
import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import styles from './CreateMainContent.module.css';

interface CreateMainContentProps {
  imageData: string;
  loading: boolean;
  createImage: () => void;
  imageSize: number;
  bokeText: string;
  setBokeText: (text: string) => void;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;

  newSubmitBoke: () => void;
  loginalert: boolean;
}

const CreateMainContent: React.FC<CreateMainContentProps> = ({
  imageData,
  loading,
  createImage,
  imageSize,
  bokeText,
  setBokeText,
  timeRemaining,
  setTimeRemaining,
  isDialogOpen,
  setIsDialogOpen,
  newSubmitBoke,
  loginalert,
}) => {
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (imageData && !loading) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime: number) => {
          if (prevTime === 1) {
            setIsDialogOpen(true);
          }
          return Math.max(prevTime - 1, 0);
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [imageData, loading, setTimeRemaining, setIsDialogOpen]);

  const extendTime = () => {
    setTimeRemaining((prevTime: number) => prevTime + 15);
    setIsDialogOpen(false);
  };

  return (
    <div className={styles.content}>
      {!imageData ? (
        <>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                top: '20vh',
                height: 'desired_height_here',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <CircularProgress color="inherit" size={80} />
            </Box>
          ) : (
            <>
              <div className={styles.instructionsContainer}>
                <p className={`${styles.instructionsText} ${styles.heading}`}>作り方</p>
                <p className={styles.instructionsText}>
                  1.「ぼける」ボタンをクリック！
                  <br />
                  2.画像生成
                  <br />
                  3.30秒以内にボケを考える
                  <br />
                  4.提出！
                </p>
              </div>
              {loginalert !== true ? (
                <button className={styles.bokeButton} onClick={createImage}>
                  ぼける
                </button>
              ) : (
                <div className={styles.instructionsContainer} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img
              src={`data:image/png;base64,${imageData}`}
              alt="Generated Data"
              width={imageSize}
              height={imageSize}
            />
          </div>
          <input
            type="text"
            className={styles.textBox}
            value={bokeText}
            onChange={(e) => setBokeText(e.target.value)}
            placeholder="ぼけの言葉を入力"
          />
          <div className={styles.timerContainer}>残り時間: {timeRemaining}秒</div>
          <button className={styles.submitButton} onClick={newSubmitBoke}>
            投稿する
          </button>
        </>
      )}
      <Modal
        className={styles.modal}
        open={isDialogOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={styles.someClass}>
          <Typography className={styles.modalText} variant="h6" component="h2">
            終了！
          </Typography>
          <Typography className={styles.modalDescription}>
            あなたの時間は切れました。投稿するか、広告を見て時間を延長しますか？
          </Typography>
          <div className={styles.buttonContainer}>
            <Button className={styles.modalButton} onClick={newSubmitBoke}>
              投稿する
            </Button>
            <Button className={styles.modalButton} onClick={extendTime}>
              広告を見て15秒延長
            </Button>
          </div>
        </Box>
      </Modal>

      <BokeImageCarousel customStyle={styles.someCustomStyleForThisPage} />
    </div>
  );
};

export default CreateMainContent;
