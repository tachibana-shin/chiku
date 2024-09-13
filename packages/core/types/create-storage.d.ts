import type { CStorage, Del, DelMany, Get, Set, GetMany, SetMany, Update } from "./types";
export interface Options<Sync extends boolean, G extends Get | undefined, S extends Set | undefined, D extends Del | undefined, GM extends GetMany | undefined, SM extends SetMany | undefined, DM extends DelMany | undefined, U extends Update | undefined> extends CStorage<G, S, D, GM, SM, DM, U> {
    sync?: Sync;
}
export interface RStorage<Sync extends boolean, KV extends Record<string, unknown>, G extends Get | undefined = undefined, S extends Set | undefined = undefined, D extends Del | undefined = undefined, GM extends GetMany | undefined = undefined, SM extends SetMany | undefined = undefined, DM extends DelMany | undefined = undefined, U extends Update | undefined = undefined> extends Options<Sync, G, S, D, GM, SM, DM, U> {
    id: string;
    bc: Sync extends true ? BroadcastChannel : undefined;
    fb: Sync extends true ? globalThis.Set<Function> : undefined;
    lb: Sync extends true ? globalThis.Set<Function> : undefined;
    kv: KV;
}
export type IStore<KV extends Record<string, unknown>> = {};
export declare function createStore<KV extends Record<string, unknown>>(): IStore<KV>;
export declare function createStorage<KV extends Record<string, unknown>, G extends Get | undefined, S extends Set | undefined, D extends Del | undefined, GM extends GetMany | undefined, SM extends SetMany | undefined, DM extends DelMany | undefined, U extends Update | undefined, Sync extends boolean = false>(store: IStore<KV>, options: Partial<Options<Sync, G, S, D, GM, SM, DM, U>>): RStorage<Sync, KV, G, S, D, GM, SM, DM, U>;
