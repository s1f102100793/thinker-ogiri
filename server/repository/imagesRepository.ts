import type { ImageResponseModel } from '$/commonTypesWithClient/models';
import { OPENAIAPI } from '$/service/envValues';
import { prismaClient } from '$/service/prismaClient';
import type { Boke } from '@prisma/client';
import axios from 'axios';

export const toBokeModel = (prismaBoke: Boke) => {
  return {
    bokeId: prismaBoke.bokeId,
    userId: prismaBoke.userId,
    text: prismaBoke.text,
    image: prismaBoke.image,
    like: prismaBoke.likeCount,
  };
};

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
  userId: string,
  text: string,
  image: string,
  like: number
) => {
  try {
    console.log(text, like);
    let prismaBoke;
    if (bokeId !== undefined && bokeId !== null) {
      prismaBoke = await prismaClient.boke.update({
        where: { bokeId },
        data: {
          likeCount: like,
        },
      });
    } else {
      prismaBoke = await prismaClient.boke.create({
        data: {
          userId,
          text,
          image,
          likeCount: like,
        },
      });
    }
    return toBokeModel(prismaBoke);
  } catch (err) {
    console.log(err);
    return null;
  }
};
