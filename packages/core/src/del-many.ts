import type { RStorage } from "./create-storage"
import type { DelMany } from "./types"

export async function delMany<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, any, any, any, any, any, DelMany, any>,
  Keys extends (keyof RS["kv"])[]
>(
  storage: RS,
  keys: [...Keys] // Spread tuple to keep exact types
) {
  return storage.delMany$(keys as string[])
}
