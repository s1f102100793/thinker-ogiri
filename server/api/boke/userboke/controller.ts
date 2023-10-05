import { getUserIdBoke } from '$/repository/imagesRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({ status: 201, body: await getUserIdBoke(body.userId) }),
}));
