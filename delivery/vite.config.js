import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig(() => {
  return {
    plugins: [
      ViteImageOptimizer({
        /* pass your config */
      }),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer({})
        ],
      }
    }
  };
});