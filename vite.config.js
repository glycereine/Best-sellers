import { defineConfig } from 'vite';
import cssnano from 'cssnano';

export default defineConfig({
  build: {
    minify: 'terser',  // Минификация JS и CSS
    cssCodeSplit: true, // Разделение CSS по файлам
    outDir: 'dist', // Папка для сборки
    assetsDir: '', // Вывод ассетов без вложенных папок
  },
  server: {
    open: true,  // Открытие браузера при запуске
    watch: {
      usePolling: true,  // Для Windows (чтобы изменения отслеживались корректно)
    },
  },
});