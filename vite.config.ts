import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

export default ({ mode }: UserConfig) => {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  process.env = { ...process.env, ...loadEnv(mode!, process.cwd()) }; // mode is not null as UserConfig is an interface with all optional types

  return defineConfig({
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {
          icon: true
        }
      })
    ],

    define: {
      global: "globalThis",
      "process.env": process.env
    }
  });
};
