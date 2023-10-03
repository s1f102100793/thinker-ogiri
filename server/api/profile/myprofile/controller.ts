import { getMyProfile } from '$/repository/userProfileRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => {
    console.log(body);
    const result = await getMyProfile(body.mailAddress);
    return { status: 201, body: result };
  },
}));
