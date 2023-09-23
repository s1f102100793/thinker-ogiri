import { Box, CircularProgress } from '@mui/material';
import BokeImageCarousel from 'src/components/BokeImageCarousel.tsx/BokeImageCarousel';
import styles from './CreateMainContent.module.css';

interface CreateMainContentProps {
  imageData: string;
  loading: boolean;
  createImage: () => void;
  imageSize: number;
  bokeText: string;
  setBokeText: (text: string) => void;
  newSubmitBoke: () => void;
}

const CreateMainContent: React.FC<CreateMainContentProps> = ({
  imageData,
  loading,
  createImage,
  imageSize,
  bokeText,
  setBokeText,
  newSubmitBoke,
}) => {
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
          <button className={styles.submitButton} onClick={newSubmitBoke}>
            投稿する
          </button>
        </>
      )}

      <BokeImageCarousel customStyle={styles.someCustomStyleForThisPage} />
    </div>
  );
};

export default CreateMainContent;