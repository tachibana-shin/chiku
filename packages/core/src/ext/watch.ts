import type { RStorage } from "../create-storage"

export interface WatchOptions<Local extends boolean> {
  local?: Local
}
export function watch<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, any, any, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  fn: (newValue: RS["kv"][Key] | undefined) => void,
  options: WatchOptions<true>
) : () => void
export function watch<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<true, any, any, any, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  fn: (newValue: RS["kv"][Key] | undefined) => void,
  options?: WatchOptions<Local>
): () => void
export function watch<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<true, any, any, any, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  fn: (newValue: RS["kv"][Key] | undefined) => void,
  options?: WatchOptions<Local>
) {
  const handler = (
    event: MessageEvent<{
      key: Key
      value: unknown | undefined
    }>
  ) => {
    if (event.data.key === key) {
      fn(event.data.value)
    }
  }

  const delative = storage.fb.size === 0
  storage.fb.add(handler)
  if (options?.local) storage.lb.add(handler)

  if (delative)
    storage.bc.addEventListener("message", (event) => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      storage.fb.forEach((fn) => fn(event))
    })

  return () => {
    storage.fb.delete(handler)
  }
}
