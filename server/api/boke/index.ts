import type { DefineMethods } from 'aspida';
import type { BokeModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: BokeModel[] | null;
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
