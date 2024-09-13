// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { type Get, get, type RStorage, set, type Set, watch, type WatchOptions } from "chiku"
import { type MaybeRefOrGetter, ref, toValue, type Ref, onUnmounted, watchEffect, nextTick } from "vue"

export interface ReadonlyRef<T> {
  readonly value: Readonly<T>
}
export function useStorage<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, Get, undefined, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  defaultValue: MaybeRefOrGetter<RS["kv"][Key] | undefined>,
  options: WatchOptions<true>
): ReadonlyRef<RS["kv"][Key]>
export function useStorage<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<true, any, Get, undefined, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  defaultValue?: MaybeRefOrGetter<RS["kv"][Key]>,
  options?: WatchOptions<Local>
): ReadonlyRef<RS["kv"][Key]>
export function useStorage<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, Get, Set, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  defaultValue: MaybeRefOrGetter<RS["kv"][Key] | undefined>,
  options: WatchOptions<true>
): Ref<RS["kv"][Key]>
export function useStorage<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<true, any, Get, Set, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  defaultValue?: MaybeRefOrGetter<RS["kv"][Key]>,
  options?: WatchOptions<Local>
): Ref<RS["kv"][Key]>

export function useStorage<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<true, any, Get, any, any, any, any, any, any>,
  Key extends keyof RS["kv"],
  Local extends boolean
>(
  storage: RS,
  key: Key,
  defaultValue?: MaybeRefOrGetter<RS["kv"][Key]>,
  options?: WatchOptions<Local>
): ReadonlyRef<RS["kv"][Key]> | Ref<RS["kv"][Key]> {
  let disableUpdate = true
  const value = ref<RS["kv"][Key]>(toValue(defaultValue))
  get(storage, key)
    .then((value$) => {
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      value$ !== undefined && (value.value = value$ ?? value.value)
    })
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    .finally(() => void (disableUpdate = false))

  const watcher = watch(
    storage,
    key,
    async (value$) => {
      disableUpdate = true
      value.value = await value$() ?? value.value
      await nextTick()
      disableUpdate = false
    },
    options
  )
  onUnmounted(watcher)

  if (storage.set$) {
    watchEffect(() => !disableUpdate && set(storage, key, toValue(value)))
  }

  return value
}
