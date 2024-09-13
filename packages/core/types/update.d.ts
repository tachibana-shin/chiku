import type { RStorage } from "./create-storage";
import type { MaybeOrPromise, Update } from "./types";
export declare function update<RS extends RStorage<any, any, any, any, any, any, any, any, Update>, Key extends keyof RS["kv"]>(storage: RS, key: Key, updater: (value?: RS["kv"][Key]) => MaybeOrPromise<RS["kv"][Key]>): Promise<RS["kv"][Key]>;
