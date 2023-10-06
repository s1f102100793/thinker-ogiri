import type { DefineMethods } from 'aspida';
import type { UserProfileModel, UserProfileResponse } from 'commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: UserProfileModel;
    resBody: UserProfileResponse;
  };
}>;
