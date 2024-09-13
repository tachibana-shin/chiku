import type {  RStorage } from "chiku"

export function useStorage<
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
export function useStorage<
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
export function useStorage<
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

}