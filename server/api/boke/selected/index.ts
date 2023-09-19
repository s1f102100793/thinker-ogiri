import type { DefineMethods } from 'aspida';
import type { BokeModel } from '../../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { bokeId: number };
    resBody: BokeModel;
  };
}>;
