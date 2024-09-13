import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/main.ts"],
  target: "esnext",
  dts: true
})