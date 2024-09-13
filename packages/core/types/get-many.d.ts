import type { RStorage } from "./create-storage";
import type { GetMany } from "./types";
export declare function getMany<RS extends RStorage<any, any, any, any, any, GetMany, any, any, any>, Keys extends (keyof RS["kv"])[]>(storage: RS, keys: [...Keys]): Promise<{
    [K in keyof Keys]: Keys[K] extends keyof RS["kv"] ? RS["kv"][Keys[K]] | undefined : never;
}>;
