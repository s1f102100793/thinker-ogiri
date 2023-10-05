import imageCompression from 'browser-image-compression';
import type { ImageResponseModel, UserProfileModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const useCreate = (profile: UserProfileModel | null) => {
  const [imageData, setImageData] = useState<string>('');
  const [bokeText, setBokeText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loginalert, setLoginAlert] = useState(false);
  const [createAlert, setCreateAlert] = useState(false);
  const router = useRouter();

  const imageSize = 300;

  const compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const createImage = async () => {
    setLoginAlert(false);
    if (profile !== null) {
      setLoading(true);
      setTimeRemaining(30);
      try {
        const res: ImageResponseModel | null = await apiClient.image.$post();
        if (!res) {
          console.error('API response is null');
          return;
        }
        if (res.data[0]?.b64_json) {
          setImageData(res.data[0].b64_json);
        }
      } catch (error) {
        console.error('API error:', error);
      }
      setLoading(false);
    } else {
      setLoginAlert(true);
    }
    console.log(loginalert);
  };

  type DataURL = string;

  function dataURLToBlob(dataURL: DataURL): Blob {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1] || 'image/png';
    const raw = atob(parts[1]);
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
    const dataURL = `data:image/png;base64,${base64String}`;
    const blob = dataURLToBlob(dataURL);
    const file = blobToFile(blob, 'compressed_image.png');
    const compressedBlob = await imageCompression(file, compressionOptions);
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target?.result as DataURL);
      reader.onerror = (error) => reject(new Error('Failed to read blob as DataURL'));

      reader.readAsDataURL(compressedBlob);
    });
  }

  const newSubmitBoke = async () => {
    if (bokeText === '') {
      setCreateAlert(true);
      return;
    }
    try {
      const compressedImageData = await compressImage(imageData);
      if (profile === null) {
        return;
      }
      const latestboke = await apiClient.boke.$post({
        body: {
          bokeId: undefined,
          userId: profile.userId,
          text: bokeText,
          image: compressedImageData,
          like: 0,
        },
      });
      setImageData('');
      setBokeText('');
      router.push(`/view/${latestboke.bokeId}?order=createdAt`);
    } catch (error) {
      console.error('Error in newSubmitBoke:', error);
    }
    setIsDialogOpen(false);
  };

  return {
    imageData,
    setImageData,
    loading,
    timeRemaining,
    setTimeRemaining,
    isDialogOpen,
    setIsDialogOpen,
    loginalert,
    createAlert,
    createImage,
    imageSize,
    bokeText,
    setBokeText,
    newSubmitBoke,
  };
};
