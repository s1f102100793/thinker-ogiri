import type { BokeModel } from 'commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      userId: string;
    };
    resBody: BokeModel[];
  };
}>;
