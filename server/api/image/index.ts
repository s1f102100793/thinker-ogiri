import type { DefineMethods } from 'aspida';
import type { ImageResponseModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    resBody: ImageResponseModel | null;
  };
}>;
