import type { RStorage } from "./create-storage"
import type { Del } from "./types"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function del<RS extends RStorage<any, any, any, any, Del, any, any, any, any>>(
  storage: RS,
  key: keyof RS["kv"]
) {
  return storage.del$(key as string)
}
