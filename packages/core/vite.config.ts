import { defineConfig, type PluginOption } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"]
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json"
    }) as PluginOption
  ]
})
