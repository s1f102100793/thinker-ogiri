import type { ImageResponseModel } from '$/commonTypesWithClient/models';
import { OPENAIAPI } from '$/service/envValues';
import axios from 'axios';

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

export const uploadBoke = async (text: string, like: number) => {
  console.log(text, like);
};
