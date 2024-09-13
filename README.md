**Chiku** (蓄) is a lightweight storage management library designed for handling simple storage operations with multiple storage types, such as IndexedDB, localStorage, and sessionStorage. It provides a consistent API for storing, retrieving, and deleting data across different storage mechanisms, with built-in support for key-value operations, batch operations, and data locking.

### Features:

- **Simple API**: Provides functions like `get`, `set`, `del`, `getMany`, `setMany`, and `delMany` for seamless interaction with storage systems.
- **Multi-storage Support**: Works with IndexedDB, localStorage, sessionStorage, or any custom storage you define.
- **Data Locking**: Includes `lock` and `free` methods for managing access to resources across different processes or tabs.
- **Batch Operations**: Perform batch operations efficiently with `getMany`, `setMany`, and `delMany`.
- **Customizable**: Allows for easy customization and extension to other storage solutions.

**蓄** ("chiku") in Japanese represents "accumulation" or "storage", reflecting the purpose of this library: to provide efficient, easy-to-use tools for data storage and management.

Perfect for both client-side and server-side environments.

### Get staring:

#### Create storage

Please note at this step, I think tree shaking is essential so different functions need to install other functions
List:

- `get$(key: string) => MaybePromise<T>` Permission `read` value
- `set$(key: string, value: T) => MaybePromise<void>` Permission `write` value
- `del$(key: string) => MaybePromise<void>` Permission `delete` value
-
- `getMany$(keys: string[]) => MaybePromise<T[]>` Function get multiple values
- `setMany$(entries: [string, T][]) => MaybePromise<void>` Function set multiple values
- `delMany$(keys: string[]) => MaybePromise<void>` Function delete multiple values
-
- `update$(fn: (value: unknown) => MaybePromise<T>) => MaybePromise<T>` Function lock storage

```typescript
import { createStorage, createStore, get, assert } from "chiku"
import { get$, set$, del$, getMany$, setMany$, delMany$, update$ } from "chiku/driver/indexeddb"

const storage = createStorage(
  createStore<{
    counter: boolean
    name: string
  }>(),
  { get$, set$, del$, getMany$, setMany$, delMany$, update$ }
)
```

#### get(storage, key: string)
Function `get` value from `storage`
```typescript
const value = await get(storage, "counter")
// value is `number | undefined`
```

#### getMany(storage, keys: string[])
Function `getMany` value from `storage`
```typescript
const values = await getMany(storage, ["counter", "name"])
values.forEach(value => assert(value))

// values is `[number, string]`
```

### set(storage, key: string, value: T)
Function `set` value to `storage`
```typescript
await set(storage, "counter", 10)
```

### setMany(storage, entries: [key: string, value: T][])
Function `setMany` value to `storage`
```typescript
await setMany(storage, [
  ["counter", 10],
  ["name", "Tachibana Shin"]
])
```

### del(storage, key: string)
Function `del` value from `storage`
```typescript
await del(storage, "counter")
```

### delMany(storage, keys: string[])
Function `delMany` value from `storage`
```typescript
await delMany(storage, ["counter", "name"])
```

### update(storage, key: string, fn: (value?: T) => T)
Function `update` value to `storage`
```typescript
await update(storage, "counter", (value = 0) => value + 1)
```

## Utils function
### assert(value: undefined | null | T, message?: string)
Function check `assert` value
```typescript
const value = await get(storage, "counter")
// value is `number | undefined`

assert(value)
// value is `number`

const values = await get(storage, ["counter", "name"])
// values is `[number | undefined, string | undefined]`

values.forEach(value => assert(value))
// values is `[number, string]`
```

### cache(storage, key: string, options: CacheOptions)
Function `cache` value to `storage`
```typescript
interface CacheOptions<T> {
  /** @default 600_000 */
  expires?: number

  /** @default 0 */
  stale?: number

  get: T | (() => MaybeOrPromise<T>)
}
```

#### Params
- `expires = 60s` The lifetime of this data, whether it needs to be refreshed or not
- `stale = 0` By default when this function is called if it has not expired the data will be updated in the background. If `stale` is still valid it will skip background data updates
- `get: T | (() => MaybeOrPromise<T>)` The value or function result value for update cache

#### Return
By default `get` and `getMany` will return their type. However, if it is not set then its return type is `T | undefined`. but because this function has the ability to get its own data, the return type of this function is always `T` without `assert`

```typescript
const value = await cache(storage, "name", async () => "Tachibana Shin")

// value is string
```

---

### `remember`

The `remember` function is used to retrieve a value from a given storage system. If the value is not present in the storage, the function will generate the value using a provided function `fn`, store the newly generated value, and then return it.

This method is particularly useful when caching or memoizing values that are expensive to compute, ensuring that the value is generated once and stored for future retrieval.

#### Parameters:
- **`storage: RS`**  
  The storage object that conforms to the `RStorage` interface. This object is responsible for holding key-value pairs (`kv`), where the values can be retrieved and stored using the `get` and `set` methods.

- **`key: Key`**  
  The key used to store and retrieve the value from the storage. It must be a valid key in the `kv` map of the provided storage.

- **`fn: () => MaybeOrPromise<RS["kv"][Key]>`**  
  A function that generates the value if it does not already exist in the storage. The function can either return the value directly (synchronously) or return a promise that resolves to the value (asynchronously).

#### Returns:
- **`Promise<RS["kv"][Key]>`**  
  The retrieved or newly generated value from the storage. If the value did not exist, it is generated, stored, and then returned.
- By default `get` and `getMany` will return their type. However, if it is not set then its return type is `T | undefined`. but because this function has the ability to get its own data, the return type of this function is always `T` without `assert`

#### Example:

```typescript
const value = await remember(storage, "counter", async () => {
  // Generate the value if it does not exist
  return await fetchUserSettingsFromAPI()
})

// value is number
```

#### How It Works:
1. The function attempts to retrieve a value associated with the provided `key` from the storage using the `get` method.
2. If the value does not exist (i.e., `undefined`), the provided `fn` function is called to generate the value.
3. The newly generated value is stored using the `set` method with the same `key`.
4. The function finally returns the retrieved or generated value.

#### Use Case:
This function is useful in scenarios where you want to avoid recalculating a value or re-fetching data unnecessarily if it has already been stored previously.


Here is the documentation for the `watch` function:

---

### `watch`

The `watch` function allows you to observe changes to a specific key in the storage system. When the value associated with the key is updated, a provided callback function (`fn`) is executed. This is useful for syncing storage data changes across multiple components, tabs, or windows.

This function has great power, it can track data even if changes occur in `Worker`, `ServiceWorker` or even `IFrame` and `other tab`

#### Parameters:

- **`storage: RS`**  
  The storage object that conforms to the `RStorage` interface. The storage must have broadcasting and listener capabilities to handle change events for keys.

- **`key: Key`**  
  The key in the `kv` map of the storage object that you want to watch for changes.

- **`fn: (newValue: RS["kv"][Key] | undefined) => void`**  
  A callback function that gets executed whenever the value of the watched key changes. The `newValue` passed to the function is either the updated value or `undefined` if the value was removed or did not exist.

- **`options?: WatchOptions`**  
  An optional object to customize the behavior of the watcher.
  - **`local?: boolean`** (default: `false`)  
    If `true`, the watcher will also respond to local changes (within the same tab or window). If `false`, the watcher only responds to broadcasted changes (e.g., from other tabs or windows).

#### Returns:

- **`() => void`**  
  A cleanup function that can be called to stop watching for changes. This removes the associated event listener and ensures no further callbacks are invoked.

#### Example:

```typescript
const stopWatching = watch(storage, "counter", (newValue) => {
  console.log("Updated user preferences:", newValue)
})

// Later on, you can stop watching by calling the returned function
stopWatching()
```

#### How It Works:
1. **Event Handler Setup**:  
   An event handler is created to listen for messages related to changes to the specified `key`. When a change is detected, the callback function `fn` is triggered with the new value of the key or `undefined` if the value was removed.

2. **Storage Event Binding**:  
   Depending on the storage system, the event handler can listen to changes either locally (within the same browser tab) or across different tabs (through the BroadcastChannel API). If `local` is `true`, it listens to local changes as well.

3. **Event Broadcasting**:  
   The storage object manages a list of broadcast channels and handlers. When a value changes, the change event is broadcasted, and the corresponding handlers are invoked to execute the callback.

4. **Cleanup**:  
   The function returns a cleanup function that allows you to stop watching for changes. This removes the handler from the storage's list of listeners.

#### Use Case:
This function is useful when you need to synchronize data changes between multiple views, components, or browser contexts. For example, when multiple tabs need to stay updated with the latest user preferences or other shared state.