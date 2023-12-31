import { getBoke, uploadBoke } from '$/repository/imagesRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await getBoke(undefined) }),
  post: async ({ body }) => ({
    status: 201,
    body: await uploadBoke(body.bokeId, body.userId, body.text, body.image, body.like),
  }),
}));
