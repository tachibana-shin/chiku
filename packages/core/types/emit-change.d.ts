import type { RStorage } from "./create-storage";
export declare function emitChange<RS extends RStorage<true, any, any, any, any, any, any, any, any>, Key extends keyof RS["kv"]>(storage: RS, key: Key, value: RS["kv"][Key]): void;
