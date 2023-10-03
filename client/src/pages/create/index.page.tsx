import Head from 'next/head';
import CreateMainContent from 'src/components/CreateMainContent/CreateMainContent';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import { useAuth } from 'src/hooks/useAuth';
import { useCreate } from 'src/hooks/useCreate';
import styles from './create.module.css';

const Create = () => {
  const { profile, signInWithGoogle } = useAuth();
  const {
    imageData,
    loading,
    timeRemaining,
    setTimeRemaining,
    isDialogOpen,
    setIsDialogOpen,
    loginalert,
    createImage,
    imageSize,
    bokeText,
    setBokeText,
    newSubmitBoke,
  } = useCreate(profile);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <CreateMainContent
        imageData={imageData}
        loading={loading}
        createImage={createImage}
        imageSize={imageSize}
        bokeText={bokeText}
        setBokeText={setBokeText}
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        newSubmitBoke={newSubmitBoke}
        loginalert={loginalert}
        signInWithGoogle={signInWithGoogle}
      />
      <Footer />
    </div>
  );
};

export default Create;
