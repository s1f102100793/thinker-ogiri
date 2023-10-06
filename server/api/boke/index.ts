import type { DefineMethods } from 'aspida';
import type { BokeModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: BokeModel | BokeModel[] | null;
  };
  post: {
    reqBody: {
      bokeId: number | undefined;
      userId: string | undefined;
      text: string | undefined;
      image: string | undefined;
      like: number;
    };
    resBody: BokeModel;
  };
}>;
