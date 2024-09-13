import type { RStorage } from "./create-storage"
import { emitChange } from "./emit-change"
import type { SetMany } from "./types"

export async function setMany<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, any, any, any, any, SetMany, any, any>,
  Entries extends [keyof RS["kv"], RS["kv"][keyof RS["kv"]]][]
>(storage: RS, entries: Entries): Promise<void> {
  await storage.setMany$(entries as [string, unknown][])

  // biome-ignore lint/complexity/noForEach: <explanation>
  entries.forEach(([key, value]) => emitChange(storage, key, value))
}
