import type { ImageResponseModel } from '$/commonTypesWithClient/models';
import { OPENAIAPI } from '$/service/envValues';
import axios from 'axios';

export const createImage = async (): Promise<ImageResponseModel | null> => {
  try {
    const API_KEY = OPENAIAPI;
    const response = await axios.post<ImageResponseModel>(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: 'two puppies, cute, playing in the park',
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
