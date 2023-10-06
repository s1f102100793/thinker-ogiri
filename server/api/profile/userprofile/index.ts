import type { DefineMethods } from 'aspida';
import type { UserProfileModel } from 'commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { userId: string };
    resBody: UserProfileModel | null;
  };
}>;
