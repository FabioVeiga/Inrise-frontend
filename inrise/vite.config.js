import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/', // Ensure this matches your deployment path
  plugins: [vue()],
});
