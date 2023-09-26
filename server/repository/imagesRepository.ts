import type { BokeModel, ImageResponseModel } from '$/commonTypesWithClient/models';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, OPENAIAPI } from '$/service/envValues';
import { prismaClient } from '$/service/prismaClient';
import type { Boke } from '@prisma/client';
import { S3 } from 'aws-sdk';
import axios from 'axios';

export const toBokeModel = (prismaBoke: Boke): BokeModel => ({
  bokeId: prismaBoke.bokeId,
  createdAt: prismaBoke.createdAt,
  userId: prismaBoke.userId,
  text: prismaBoke.text,
  image: prismaBoke.image,
  like: prismaBoke.like,
});

export const createImage = async (): Promise<ImageResponseModel | null> => {
  try {
    const API_KEY = OPENAIAPI;
    console.log(API_KEY);
    const response = await axios.post<ImageResponseModel>(
      'https://api.openai.com/v1/images/generations',
      {
        prompt:
          //   'A thinker sclupture with many poses, is centered on the screen, captured in scenes of daily life, sports, and work, seamlessly blending into the real world.',
          'A black male sculpture, muscular in build, , is centered on the screen, captured in scenes of daily life, sports, and work, seamlessly blending into the real world.',
        n: 1,
        size: '512x512',
        response_format: 'b64_json',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-1',
});

// eslint-disable-next-line complexity
export const uploadBoke = async (
  bokeId: number | undefined,
  userId: string | undefined,
  text: string | undefined,
  image: string | undefined,
  like: number
) => {
  const validatedUserId = userId ?? '';
  const validatedText = text ?? '';
  let imageKey = '';

  // 画像データをS3にアップロード
  if (image !== null && image !== undefined) {
    // ここでの条件を変更
    imageKey = `boke-images/${validatedUserId}/${Date.now()}.png`;
    console.log(imageKey);
    await s3
      .putObject({
        Bucket: 'thinker-ogiri-images',
        Key: imageKey,
        Body: Buffer.from(image.split('base64,')[1], 'base64'),
        ContentType: 'image/png',
      })
      .promise();
  }

  let prismaBoke;

  if (bokeId !== undefined) {
    prismaBoke = await prismaClient.boke.update({
      where: { bokeId },
      data: {
        like,
        image: imageKey ? `https://thinker-ogiri-images.s3.amazonaws.com/${imageKey}` : '',
      },
    });
  } else if (validatedUserId !== undefined) {
    prismaBoke = await prismaClient.boke.create({
      data: {
        userId: validatedUserId,
        text: validatedText,
        image: imageKey ? `https://thinker-ogiri-images.s3.amazonaws.com/${imageKey}` : '',
        like,
      },
    });
  }
  if (!prismaBoke) {
    throw new Error('Failed to create or update boke');
  }

  return toBokeModel(prismaBoke);
};

const getSignedUrl = async (key: string): Promise<string> => {
  const params = {
    Bucket: 'thinker-ogiri-images',
    Key: key,
    Expires: 3600,
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err !== null && err !== undefined) {
        reject(err);
        return;
      }
      resolve(url);
    });
  });
};

// export const getBoke = async (
//   bokeId: number | undefined
// ): Promise<BokeModel | BokeModel[] | null> => {
//   console.log('bokeId', bokeId);
//   try {
//     if (bokeId !== null && bokeId !== undefined) {
//       const singleBoke = await prismaClient.boke.findUnique({
//         where: {
//           bokeId,
//         },
//       });

//       if (!singleBoke) {
//         return null;
//       }

//       const imageKey = singleBoke.image ? singleBoke.image.split('/').pop() : null;
//       console.log('Image Key:', imageKey);
//       const signedUrl =
//         imageKey !== null && imageKey !== undefined && imageKey !== ''
//           ? await getSignedUrl(imageKey)
//           : '';

//       return {
//         ...toBokeModel(singleBoke),
//         image: signedUrl,
//       };
//     }

//     const prismaBoke = await prismaClient.boke.findMany({
//       orderBy: { createdAt: 'desc' },
//     });

//     console.log(prismaBoke);

//     const bokeModels = await Promise.all(
//       prismaBoke.map(async (boke) => {
//         const imageKey = boke.image ? boke.image.split('/').pop() : null;
//         console.log('Image Key:', imageKey);
//         const signedUrl =
//           imageKey !== null && imageKey !== undefined && imageKey !== ''
//             ? await getSignedUrl(imageKey)
//             : '';
//         console.log('Signed URL:', signedUrl);

//         return {
//           ...toBokeModel(boke),
//           image: signedUrl,
//         };
//       })
//     );

//     return bokeModels;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

export const getBoke = async (
  bokeId: number | undefined
): Promise<BokeModel | BokeModel[] | null> => {
  console.log('bokeId', bokeId);
  try {
    if (bokeId !== null && bokeId !== undefined) {
      const singleBoke = await prismaClient.boke.findUnique({
        where: {
          bokeId,
        },
      });

      if (!singleBoke) {
        return null;
      }

      return toBokeModel(singleBoke); // updated this line
    }

    const prismaBoke = await prismaClient.boke.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(prismaBoke);

    const bokeModels = prismaBoke.map((boke) => toBokeModel(boke)); // updated this line

    return bokeModels;
  } catch (err) {
    console.log(err);
    return null;
  }
};
