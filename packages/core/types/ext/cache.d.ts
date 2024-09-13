import type { RStorage } from "../create-storage";
import type { Get, Set, MaybeOrPromise } from "../types";
export interface CacheOptions<T> {
    /** @default 600_000 */
    expires?: number;
    /** @default 0 */
    stale?: number;
    get: T | (() => MaybeOrPromise<T>);
}
export declare function cache<RS extends RStorage<any, any, Get, Set, any, any, any, any, any>, Key extends keyof RS["kv"], Options extends CacheOptions<RS["kv"][Key]>>(storage: RS, key: Key, options: Options): Promise<RS["kv"][Key]>;
