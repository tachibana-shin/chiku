import type { RStorage } from "./create-storage"
import { emitChange } from "./emit-change"
import type { MaybeOrPromise, Update } from "./types"

export async function update<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, any, any, any, any, any, any, Update>,
  Key extends keyof RS["kv"]
>(
  storage: RS,
  key: Key,
  updater: (value?: RS["kv"][Key]) => MaybeOrPromise<RS["kv"][Key]>
): Promise<RS["kv"][Key]> {
  const value = await storage.update$(key as string, updater)
  emitChange(storage, key, value)

  return value
}
