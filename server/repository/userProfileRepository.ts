import type {
  OtherUserLikeModel,
  UpdateOtherUserLikeModel,
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
    const existingUserIdProfile = await prismaClient.userProfile.findFirst({
      where: { userId: userProfile.userId },
    });

    const existingMailProfile = await prismaClient.userProfile.findFirst({
      where: { mailAddress: userProfile.mailAddress },
    });

    const errorMessages = [];
    if (existingUserIdProfile) {
      errorMessages.push('The userId is already taken.');
    }
    if (existingMailProfile) {
      errorMessages.push('The mailAddress is already taken.');
    }

    if (errorMessages.length > 0) {
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

export const getMyProfile = async (mailAddress: string): Promise<UserProfileModel | null> => {
  console.log('mailAddress', mailAddress);
  const myProfile = await prismaClient.userProfile.findFirst({
    where: {
      mailAddress,
    },
  });

  if (!myProfile) {
    return null;
  }
  console.log(myProfile);
  return toUserProfileModel(myProfile);
};

export const getUserProfile = async (userId: string): Promise<UserProfileModel | null> => {
  const myProfile = await prismaClient.userProfile.findFirst({
    where: {
      userId,
    },
  });

  if (!myProfile) {
    return null;
  }

  return toUserProfileModel(myProfile);
};

export const updateMyProfile = async (
  UpdateOtherUserLike: UpdateOtherUserLikeModel
): Promise<UserProfileModel> => {
  const currentProfile = await prismaClient.userProfile.findUnique({
    where: {
      userId: UpdateOtherUserLike.userId,
    },
  });

  if (currentProfile === null) {
    throw new Error('Profile not found');
  }

  if (currentProfile.otherUserLike === null) {
    throw new Error('ProfileOtherUserLike not found');
  }

  const currentOtherUserLikeList: OtherUserLikeModel[] =
    currentProfile.otherUserLike as OtherUserLikeModel[];

  const existingLikeIndex = currentOtherUserLikeList.findIndex(
    (like) => like.bokeId === UpdateOtherUserLike.otherUserLike.bokeId
  );

  if (existingLikeIndex !== -1) {
    currentOtherUserLikeList[existingLikeIndex].like = UpdateOtherUserLike.otherUserLike.like;
  } else {
    currentOtherUserLikeList.push(UpdateOtherUserLike.otherUserLike);
  }

  const updatedProfile = await prismaClient.userProfile.update({
    where: {
      userId: UpdateOtherUserLike.userId,
    },
    data: {
      otherUserLike: currentOtherUserLikeList,
    },
  });

  return toUserProfileModel(updatedProfile);
};
