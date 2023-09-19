import type { BokeModel, ImageResponseModel } from '$/commonTypesWithClient/models';
import { OPENAIAPI } from '$/service/envValues';
import { prismaClient } from '$/service/prismaClient';
import type { Boke } from '@prisma/client';
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
          'Western classical sculpture centered on the screen, striking whimsical and contemplative poses without going beyond the frame, set against a white background',
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

export const uploadBoke = async (
  bokeId: number | undefined,
  userId: string | undefined,
  text: string | undefined,
  image: string | undefined,
  like: number
) => {
  try {
    const validatedUserId = userId ?? '';
    const validatedText = text ?? '';
    const validatedImage = image ?? '';

    console.log(validatedText, like);
    let prismaBoke;

    if (bokeId !== undefined) {
      prismaBoke = await prismaClient.boke.update({
        where: { bokeId },
        data: {
          like,
        },
      });
    } else {
      prismaBoke = await prismaClient.boke.create({
        data: {
          userId: validatedUserId,
          text: validatedText,
          image: validatedImage,
          like,
        },
      });
    }
    return toBokeModel(prismaBoke);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getBoke = async (
  bokeId: number | undefined
): Promise<BokeModel | BokeModel[] | null> => {
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

      return toBokeModel(singleBoke);
    }

    const prismaBoke = await prismaClient.boke.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return prismaBoke.map((boke) => toBokeModel(boke));
  } catch (err) {
    console.log(err);
    return null;
  }
};
