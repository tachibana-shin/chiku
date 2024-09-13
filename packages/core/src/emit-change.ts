import type { RStorage } from "./create-storage"

export function emitChange<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<true, any, any, any, any, any, any, any, any>,
  Key extends keyof RS["kv"]
>(storage: RS, key: Key, value: RS["kv"][Key]) {
  if (typeof value === "object") storage.bc?.postMessage({ key })
  else storage.bc?.postMessage({ key, value })
  // biome-ignore lint/complexity/noForEach: <explanation>
  storage.lb?.forEach((fn) => fn({ data: { key, value } }))
}
