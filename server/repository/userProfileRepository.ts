import type {
  OtherUserLikeModel,
  UserProfileModel,
  UserProfileResponse,
} from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { UserProfile } from '@prisma/client';
export const toUserProfileModel = (prismaUserProfile: UserProfile): UserProfileModel => ({
  userId: prismaUserProfile.userId,
  mailAddress: prismaUserProfile.mailAddress,
  location: prismaUserProfile.location,
  gender: prismaUserProfile.gender,
  totallike: prismaUserProfile.totallike,
  otherUserLike: prismaUserProfile.otherUserLike as OtherUserLikeModel[],
});

export const uploadUserProfile = async (
  userProfile: UserProfileModel
): Promise<UserProfileResponse> => {
  console.log('userProfile', userProfile);
  try {
    if (userProfile.mailAddress !== null && userProfile.mailAddress !== undefined) {
      console.log(userProfile.mailAddress);
      const prismaUserProfile = await prismaClient.userProfile.create({
        data: {
          userId: userProfile.userId,
          mailAddress: userProfile.mailAddress,
          location: userProfile.location,
          gender: userProfile.gender,
          totallike: userProfile.totallike,
          otherUserLike: userProfile.otherUserLike,
        },
      });
      return { userProfile: toUserProfileModel(prismaUserProfile), error: null };
    } else {
      console.log('userProfile.mailaddress is null');
      return { userProfile: null, error: 'Mail address is null or undefined' };
    }
  } catch (err) {
    const error = err as { code: string; meta?: { target?: string[] } };

    if (error.meta?.target?.includes('userId') ?? false) {
      return { userProfile: null, error: 'The userId is already taken.' };
    } else if (error.meta?.target?.includes('mailAddress') ?? false) {
      return { userProfile: null, error: 'The mail address is already taken.' };
    } else {
      console.log(error);
      return { userProfile: null, error: 'An internal server error occurred.' };
    }
  }
};
