// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type { CStorage, Del, DelMany, Get, Set, GetMany, SetMany, Update } from "./types"

export interface Options<
  Sync extends boolean,
  G extends Get | undefined,
  S extends Set | undefined,
  D extends Del | undefined,
  GM extends GetMany | undefined,
  SM extends SetMany | undefined,
  DM extends DelMany | undefined,
  U extends Update | undefined
> extends CStorage<G, S, D, GM, SM, DM, U> {
  sync?: Sync
}
export interface RStorage<
  Sync extends boolean,
  KV extends Record<string, unknown>,
  G extends Get | undefined = undefined,
  S extends Set | undefined = undefined,
  D extends Del | undefined = undefined,
  GM extends GetMany | undefined = undefined,
  SM extends SetMany | undefined = undefined,
  DM extends DelMany | undefined = undefined,
  U extends Update | undefined = undefined
> extends Options<Sync, G, S, D, GM, SM, DM, U> {
  id: string

  bc: Sync extends true ? BroadcastChannel : undefined
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  fb: Sync extends true ? globalThis.Set<Function> : undefined
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  lb: globalThis.Set<Function>

  kv: KV
}
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type IStore<KV extends Record<string, unknown>> = {}
export function createStore<KV extends Record<string, unknown>>() {
  return undefined as unknown as IStore<KV>
}
export function createStorage<
  KV extends Record<string, unknown>,
  G extends Get | undefined,
  S extends Set | undefined,
  D extends Del | undefined,
  GM extends GetMany | undefined,
  SM extends SetMany | undefined,
  DM extends DelMany | undefined,
  U extends Update | undefined,
  Sync extends boolean = false
>(store: IStore<KV>, options: Partial<Options<Sync, G, S, D, GM, SM, DM, U>>) {
  const storage = options as RStorage<Sync, KV, G, S, D, GM, SM, DM, U>
  storage.id = Math.random().toString(36)
  if (options.sync) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ;(storage as RStorage<true, any>).bc = new BroadcastChannel(storage.id)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ;(storage as RStorage<true, any>).fb = new Set()
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ;(storage as RStorage<true, any>).lb = new Set()
  return storage
}
