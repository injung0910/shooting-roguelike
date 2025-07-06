import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',             // 프로젝트 루트
  publicDir: 'public',   // public 폴더 사용
  server: {
    host: true,
    port: 5173
  }
});