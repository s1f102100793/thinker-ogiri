import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      userId: string;
      text: string;
      image: string;
      like: number;
    };
  };
}>;
