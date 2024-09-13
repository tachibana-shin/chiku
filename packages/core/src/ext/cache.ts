import type { RStorage } from "../create-storage"
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type { Get, Set, MaybeOrPromise } from "../types"
import { get, set } from "../main"

export interface CacheOptions<T> {
  /** @default 600_000 */
  expires?: number

  /** @default 0 */
  stale?: number

  get: T | (() => MaybeOrPromise<T>)
}
export async function cache<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, Get, Set, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Options extends CacheOptions<RS["kv"][Key]>
>(storage: RS, key: Key, options: Options) {
  let value = (await get(storage, key)) as
    | { _: boolean; value: RS["kv"][Key]; expires: number; stale: number }
    | undefined
  if (value && !("_" in value)) {
    value = { _: true, value, expires: -1, stale: -1 }
  }

  if (value && value.expires < Date.now()) value = undefined

  if (value === undefined) {
    // force await refresh value?

    value = {
      _: true,
      value:
        // biome-ignore lint/complexity/noBannedTypes: <explanation>
        typeof options.get === "function" ? await (options.get as Function)() : options.get,
      expires: options.expires ?? 600_000,
      stale: 0
    }
    await set(storage, key, value)
  } else {
    if (value.stale < Date.now()) {
      !(async () => {
        const value = {
          _: true,
          value:
            // biome-ignore lint/complexity/noBannedTypes: <explanation>
            typeof options.get === "function" ? await (options.get as Function)() : options.get,
          expires: options.expires ?? 600_000,
          stale: 0
        }
        void set(storage, key, value)
      })()
    }
  }

  return value.value
}
