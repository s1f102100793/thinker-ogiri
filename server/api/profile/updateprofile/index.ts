import type { DefineMethods } from 'aspida';
import type { UpdateOtherUserLikeModel, UserProfileModel } from 'commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: UpdateOtherUserLikeModel;
    resBody: UserProfileModel;
  };
}>;
