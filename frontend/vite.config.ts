import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
  ],
  build: {
    charset: 'utf8',
    minify: 'esbuild', // Re-enable minification with esbuild
    rollupOptions: {
      output: {
        // Force new hash with timestamp
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        // Preserve Unicode characters
        generatedCode: {
          constBindings: true
        }
      }
    }
  },
  esbuild: {
    charset: 'utf8'
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
