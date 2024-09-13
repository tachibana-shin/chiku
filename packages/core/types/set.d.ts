import type { RStorage } from "./create-storage";
import type { Set } from "./types";
export declare function set<RS extends RStorage<any, any, any, Set, any, any, any, any, any>>(storage: RS, key: keyof RS["kv"], value: RS["kv"][keyof RS["kv"]]): Promise<void>;
