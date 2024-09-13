import type { RStorage } from "./create-storage";
import type { SetMany } from "./types";
export declare function setMany<RS extends RStorage<any, any, any, any, any, any, SetMany, any, any>, Entries extends [keyof RS["kv"], RS["kv"][keyof RS["kv"]]][]>(storage: RS, entries: Entries): Promise<void>;
