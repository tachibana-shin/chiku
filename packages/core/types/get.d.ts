import type { RStorage } from "./create-storage";
import type { Get } from "./types";
export declare function get<RS extends RStorage<any, any, Get, any, any, any, any, any, any>, Key extends keyof RS["kv"]>(storage: RS, key: Key): Promise<RS["kv"][Key] | undefined>;
