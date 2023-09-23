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

              <button className={styles.bokeButton} onClick={createImage}>
                ぼける
              </button>
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
      <Modal open={isDialogOpen} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{ padding: '16px', backgroundColor: 'white' }}>
          <Typography id="modal-title" variant="h6" component="h2">
            時間切れ
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            あなたの時間は切れました。投稿するか、広告を見て時間を延長しますか？
          </Typography>
          <Button className={styles.submitButton} onClick={newSubmitBoke}>
            投稿する
          </Button>
          <Button className={styles.submitButton} onClick={extendTime}>
            広告を見て15秒延長
          </Button>
        </Box>
      </Modal>

      <BokeImageCarousel customStyle={styles.someCustomStyleForThisPage} />
    </div>
  );
};

export default CreateMainContent;
