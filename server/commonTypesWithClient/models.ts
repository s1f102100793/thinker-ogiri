import { z } from 'zod';
import { taskIdParser } from '../service/idParsers';
import type { UserId } from './ids';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export const taskParser = z.object({
  id: taskIdParser,
  label: z.string(),
  done: z.boolean(),
  created: z.number(),
});

export type TaskModel = z.infer<typeof taskParser>;

export type ImageResponseModel = {
  created: number;
  data: Array<{
    b64_json: string;
  }>;
};

export type BokeModel = {
  bokeId: number;
  createdAt: Date;
  userId: string;
  text: string;
  image: string;
  like: number;
};

type OtherUserLikeModel = {
  bokeId: number;
  like: number;
};

export type UserModel = {
  userId: string;
  mailaddress: string;
  location: string;
  gender: string;
  totallike: number;
  otherUserLike: OtherUserLikeModel[];
};
