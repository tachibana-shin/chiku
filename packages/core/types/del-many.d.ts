import type { RStorage } from "./create-storage";
import type { DelMany } from "./types";
export declare function delMany<RS extends RStorage<any, any, any, any, any, any, any, DelMany, any>, Keys extends (keyof RS["kv"])[]>(storage: RS, keys: [...Keys]): Promise<void>;
