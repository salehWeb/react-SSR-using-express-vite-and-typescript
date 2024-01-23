const logTransformer = {
  name: 'capture-modules',
  transform(_: string, id: string) {
    console.log('Transforming module:', id);
    return null;
  }
};

import { UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      ...devConfig,
      ssr: {
        external: ["express"]
      },
    };
  }

  return devConfig;
});

const devConfig: UserConfig = {
  plugins: [react(), logTransformer],
  build: {
    ssrEmitAssets: true,
    rollupOptions: {
      input: "./src/entry-client.tsx",
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks: undefined,
      },
    },
    cssMinify: "esbuild"
  },
};
