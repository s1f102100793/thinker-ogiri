import type { UpdateOtherUserLikeModel, UserProfileModel } from 'commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: UpdateOtherUserLikeModel;
    resBody: UserProfileModel;
  };
}>;
