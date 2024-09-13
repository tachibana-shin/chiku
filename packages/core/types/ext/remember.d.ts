import type { RStorage } from "../create-storage";
import type { Get, Set, MaybeOrPromise } from "../types";
/**
 * Retrieves a value from storage, and if it does not exist, generates it using the provided function and stores it.
 *
 * @param {RS} storage - The storage object to retrieve and store the value in.
 * @param {Key} key - The key to use when storing and retrieving the value.
 * @param {function} fn - A function that generates the value if it does not exist in storage.
 * @return {MaybeOrPromise<RS["kv"][Key]>} The retrieved or generated value.
 */
export declare function remember<RS extends RStorage<any, any, Get, Set, any, any, any, any, any>, Key extends keyof RS["kv"]>(storage: RS, key: Key, fn: () => MaybeOrPromise<RS["kv"][Key]>): Promise<RS["kv"][Key]>;
