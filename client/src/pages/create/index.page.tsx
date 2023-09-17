import imageCompression from 'browser-image-compression';
import type { ImageResponseModel } from 'commonTypesWithClient/models';
import Head from 'next/head';
import { useState } from 'react';
import Header from 'src/components/Header/Header';
import { apiClient } from 'src/utils/apiClient';
import styles from './create.module.css';

const Create = () => {
  const [imageData, setImageData] = useState<string>('');
  const [bokeText, setBokeText] = useState<string>('');

  const imageSize = 300;

  const compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const userId = 'gouta';

  const createImage = async () => {
    try {
      const res: ImageResponseModel | null = await apiClient.image.$post();
      if (!res) {
        console.error('API response is null');
        return;
      }

      console.log(res);
      if (res.data[0]?.b64_json) {
        setImageData(res.data[0].b64_json);
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const submitBoke1 = async () => {
    console.log('submit boke');
    let compressedImageData = imageData;

    try {
      console.log('Converting Base64 to Blob...');
      const blob = dataURLToBlob(imageData);
      console.log('Converted to Blob successfully.');

      console.log('Creating File object from Blob...');
      const file = new File([blob], 'compressedImage.jpg', { type: 'image/jpeg' });
      console.log('File object created successfully.');

      console.log('Starting image compression...');
      const compressedFile = await imageCompression(file, compressionOptions);
      compressedImageData = await imageCompression.getDataUrlFromFile(compressedFile);
      console.log('Image compressed successfully.');
    } catch (error) {
      console.error('Image compression error:', error);
      return;
    }

    console.log('Sending compressed image data...');
    try {
      await apiClient.boke.post({
        body: { userId, text: bokeText, image: compressedImageData, like: 0 },
      });
      console.log('Data sent successfully.');
    } catch (apiError) {
      console.error('API error:', apiError);
    }
  };
  type DataURL = string;

  function dataURLToBlob(dataURL: DataURL) {
    const BASE64_MARKER = ';base64,';

    if (!dataURL.includes(BASE64_MARKER)) {
      throw new Error('Provided dataURL does not appear to be Base64-encoded.');
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1].split(';')[0];
    const base64 = parts[1];

    const byteString = window.atob(base64);
    const byteNumbers = Array.from(byteString, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: contentType });
  }

  const submitBoke = async () => {
    console.log('Starting submitBoke function...');

    let compressedImageData = imageData;

    try {
      console.log('Converting Base64 to Blob...');
      const blob = dataURLToBlob(imageData);
      console.log('Converted to Blob successfully.');

      console.log(blob);
      const blobUrl = URL.createObjectURL(blob);
      console.log('Blob URL:', blobUrl);

      console.log('Creating File object from Blob...');
      const fileName = `compressedImage.${blob.type.split('/')[1]}`;
      const file = new File([blob], fileName, { type: blob.type });
      console.log('File object:', file);

      console.log('File object created successfully.');

      console.log('Starting image compression...');
      console.log(file);
      console.log(compressionOptions);
      const compressedFile = await imageCompression(file, compressionOptions);
      console.log('Image compressed successfully.');

      console.log('Converting compressed image to Base64...');
      compressedImageData = await imageCompression.getDataUrlFromFile(compressedFile);
      console.log('Converted to Base64 successfully.');
    } catch (error) {
      console.error('Image compression error:', error);
      return;
    }

    console.log('Sending compressed image data...');
    await apiClient.boke.post({
      body: { userId, text: bokeText, image: compressedImageData, like: 0 },
    });
    console.log('Data sent successfully.');
  };

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
      <div className={styles.content}>
        <button className={styles.bokeButton} onClick={createImage}>
          ぼける
        </button>
        {imageData && (
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
            <button className={styles.submitButton} onClick={submitBoke}>
              投稿する
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Create;
