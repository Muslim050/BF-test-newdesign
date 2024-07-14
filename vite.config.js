<<<<<<< HEAD
// import path from 'path';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
//
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       'src': path.resolve(__dirname, './src'), // Убрали слэш в конце
//     },
//   },
//   server: {
//     port: 3000,
//   },
// });


import { fileURLToPath } from 'url';
import path from 'path'; // Add this line to import the path module
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

=======
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

>>>>>>> cf464ec (first commit)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
<<<<<<< HEAD
      'src': path.resolve(__dirname, './src'),
=======
      'src': path.resolve(__dirname, './src'), // Убрали слэш в конце
>>>>>>> cf464ec (first commit)
    },
  },
  server: {
    port: 3000,
  },
<<<<<<< HEAD
  build: {
    outDir: 'dist',
  },
});

=======
});
>>>>>>> cf464ec (first commit)
