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
  try {
    const existingUserProfile = await prismaClient.userProfile.findFirst({
      where: {
        OR: [{ userId: userProfile.userId }, { mailAddress: userProfile.mailAddress }],
      },
    });

    if (existingUserProfile) {
      const errorMessages = [];
      if (existingUserProfile.userId === userProfile.userId) {
        errorMessages.push('The userId is already taken.');
      }
      if (existingUserProfile.mailAddress === userProfile.mailAddress) {
        errorMessages.push('The mailAddress is already taken.');
      }
      return { userProfile: null, error: errorMessages.join(' ') };
    }

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
  } catch (err) {
    console.error('An internal server error occurred:', err);
    return { userProfile: null, error: 'An internal server error occurred.' };
  }
};
