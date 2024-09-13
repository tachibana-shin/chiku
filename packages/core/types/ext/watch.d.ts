import type { RStorage } from "../create-storage";
export interface WatchOptions<Local extends boolean> {
    local?: Local;
}
export declare function watch<RS extends RStorage<any, any, any, any, any, any, any, any, any>, Key extends keyof RS["kv"], Local extends boolean>(storage: RS, key: Key, fn: (newValue: RS["kv"][Key] | undefined) => void, options: WatchOptions<true>): () => void;
export declare function watch<RS extends RStorage<true, any, any, any, any, any, any, any, any>, Key extends keyof RS["kv"], Local extends boolean>(storage: RS, key: Key, fn: (newValue: RS["kv"][Key] | undefined) => void, options?: WatchOptions<Local>): () => void;
