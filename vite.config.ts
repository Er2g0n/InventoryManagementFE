import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  // setting alias
  base: "./",
  build: {
    outDir: "build"
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  // end setting alias
  plugins: [react(), tailwindcss()],
  // tạo api backend đừng để bị cors  'Access-Control-Allow-Origin' header
  server: {
    proxy: {
      // Proxy all requests starting with /api to your backend
      "/api": {
        target: "http://localhost:64489",
        changeOrigin: true
        // Uncomment if your API doesn't have /api in the actual URL
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
