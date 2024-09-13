import type { RStorage } from "./create-storage";
import type { Del } from "./types";
export declare function del<RS extends RStorage<any, any, any, any, Del, any, any, any, any>>(storage: RS, key: keyof RS["kv"]): Promise<void>;
