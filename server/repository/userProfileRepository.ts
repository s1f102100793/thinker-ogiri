import type { OtherUserLikeModel, UserProfileModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { UserProfile } from '@prisma/client';
export const toUserProfileModel = (prismaUserProfile: UserProfile): UserProfileModel => ({
  userId: prismaUserProfile.userId,
  mailAddress: prismaUserProfile.mailaddress,
  location: prismaUserProfile.location,
  gender: prismaUserProfile.gender,
  totallike: prismaUserProfile.totallike,
  otherUserLike: prismaUserProfile.otherUserLike as OtherUserLikeModel[],
});

export const uploadUserProfile = async (userProfile: UserProfileModel) => {
  console.log('userProfile', userProfile);
  if (userProfile.mailAddress !== null && userProfile.mailAddress !== undefined) {
    console.log(userProfile.mailAddress);
    const prismaUserProfile = await prismaClient.userProfile.create({
      data: {
        userId: userProfile.userId,
        mailaddress: userProfile.mailAddress,
        location: userProfile.location,
        gender: userProfile.gender,
        totallike: userProfile.totallike,
        otherUserLike: userProfile.otherUserLike,
      },
    });
    return toUserProfileModel(prismaUserProfile);
  } else {
    console.log('userProfile.mailaddress is null');
    return null;
  }
};
