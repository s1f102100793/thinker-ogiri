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

      console.log(res.data[0]?.b64_json);
      if (res.data[0]?.b64_json) {
        setImageData(res.data[0].b64_json);
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  type DataURL = string;

  function dataURLToBlob(dataURL: DataURL): Blob {
    const BASE64_MARKER = ';base64,';
    console.log('BASE64_MARKER', BASE64_MARKER);
    const parts = dataURL.split(BASE64_MARKER);
    console.log('parts', parts);
    const contentType = parts[0].split(':')[1] || 'image/png';
    console.log('Content Type:', contentType);
    const raw = atob(parts[1]);
    console.log('Raw:', raw);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  function blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return theBlob as File;
  }

  async function compressImage(base64String: string): Promise<string> {
    console.log('Starting compressImage function...');

    const dataURL = `data:image/png;base64,${base64String}`;
    const blob = dataURLToBlob(dataURL);
    console.log('Blob:', blob);
    const file = blobToFile(blob, 'compressed_image.png');
    const compressedBlob = await imageCompression(file, compressionOptions);

    console.log('Compressed Blob:', compressedBlob);
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target?.result as DataURL);
      reader.onerror = (error) => reject(new Error('Failed to read blob as DataURL'));

      reader.readAsDataURL(compressedBlob);
    });
  }

  const newSubmitBoke = async () => {
    console.log('Starting newSubmitBoke function...');

    try {
      console.log('Compressing image...');
      console.log('Image data:', imageData);
      const compressedImageData = await compressImage(imageData);
      console.log('Image compressed successfully.');

      console.log('Sending compressed image data...');
      await apiClient.boke.post({
        body: { bokeId: undefined, userId, text: bokeText, image: compressedImageData, like: 0 },
      });
      console.log('Data sent successfully.');
      setImageData('');
      setBokeText('');
    } catch (error) {
      console.error('Error in newSubmitBoke:', error);
    }
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
            <button className={styles.submitButton} onClick={newSubmitBoke}>
              投稿する
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Create;
