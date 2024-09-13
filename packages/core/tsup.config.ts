import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/main.ts",
    "src/driver/indexeddb.ts",
    "src/driver/local-storage.ts",
    "src/driver/memory.ts"
  ],
  format: ["esm"],
  target: "esnext",
  dts: true
})
