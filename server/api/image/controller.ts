import { createImage } from '$/repository/imagesRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async () => ({ status: 201, body: await createImage() }),
}));
