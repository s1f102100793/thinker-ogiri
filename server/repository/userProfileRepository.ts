import type { OtherUserLikeModel, UserProfileModel } from '$/commonTypesWithClient/models';
import type { UserProfile } from '@prisma/client';
import type { JsonObject } from '@prisma/client/runtime/library';

// Helper function to check if a value is a JsonObject
const isJsonObject = (value: any): value is JsonObject => {
  return value !== null && typeof value === 'object';
};

// Helper function to convert any value to OtherUserLikeModel
const toOtherUserLikeModel = (item: any): OtherUserLikeModel | null => {
  if (isJsonObject(item) && typeof item.bokeId === 'number' && typeof item.like === 'number') {
    return {
      bokeId: item.bokeId,
      like: item.like,
    };
  }
  return null;
};

export const toUserProfileModel = (prismaUserProfile: UserProfile): UserProfileModel => ({
  userId: prismaUserProfile.userId,
  mailaddress: prismaUserProfile.mailaddress,
  location: prismaUserProfile.location,
  gender: prismaUserProfile.gender,
  totallike: prismaUserProfile.totallike,
  otherUserLike: Array.isArray(prismaUserProfile.otherUserLike)
    ? (prismaUserProfile.otherUserLike
        .map((item) => toOtherUserLikeModel(item))
        .filter((item) => item !== null) as OtherUserLikeModel[])
    : [],
});

export const createUserProfile = async (userProfile: UserProfileModel) => {
  console.log('userProfile', userProfile);
};
