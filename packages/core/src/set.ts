import type { RStorage } from "./create-storage"
import { emitChange } from "./emit-change"
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type { Set } from "./types"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function set<RS extends RStorage<any, any, any, Set, any, any, any, any, any>>(
  storage: RS,
  key: keyof RS["kv"],
  value: RS["kv"][keyof RS["kv"]]
) {
  await storage.set$(key as string, value)
  emitChange(storage, key, value)
}
