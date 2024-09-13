**@chiku/vue** is a Vue.js plugin designed to seamlessly integrate the powerful storage capabilities of the **Chiku** (蓄) library into Vue applications. It provides easy-to-use, reactive storage management tools that work with various storage types, such as IndexedDB, localStorage, and sessionStorage, while preserving Vue's reactive data flow.

### Features:

- **Vue Integration**: Fully compatible with Vue's reactivity system, allowing you to manage stored data within your Vue components.
- **Declarative API**: Use intuitive methods like `useStorage` to interact with storage in a Vue-friendly way.
- **Multiple Storage Types**: Supports IndexedDB, localStorage, sessionStorage, and custom storage solutions, making it flexible for various use cases.
- **Reactive Data**: Automatically updates components when storage data changes, ensuring your UI is always in sync.
- **Data Locking**: Includes data locking mechanisms (`lock`, `free`) to prevent race conditions across multiple components or tabs.
- **Batch Operations**: Efficiently handle batch storage operations using `getMany`, `setMany`, and `delMany`.

**@chiku/vue** empowers Vue developers to manage local or remote storage effortlessly, improving data persistence and synchronization in your Vue applications.

### Documents:

Here is the documentation for the `useStorage` function:

---

### `useStorage`

The `useStorage` function is a Vue composable that allows you to bind reactive variables to a storage key. It retrieves a value from the specified storage, updates the reactive variable when the value changes, and stores the value back when the variable is updated. This composable is useful for keeping data in sync between Vue components and storage systems like IndexedDB, localStorage, or sessionStorage.

#### Function Overloads:

1. **When `Set` is not available in storage (Readonly)**:

   ```typescript
   useStorage<RS, Key, Local>(
     storage: RS,
     key: Key,
     defaultValue?: MaybeRefOrGetter<RS["kv"][Key] | undefined>,
     options?: WatchOptions<Local>
   ): ReadonlyRef<RS["kv"][Key]>
   ```

2. **When `Set` is available in storage (Read/Write)**:
   ```typescript
   useStorage<RS, Key, Local>(
     storage: RS,
     key: Key,
     defaultValue?: MaybeRefOrGetter<RS["kv"][Key] | undefined>,
     options?: WatchOptions<Local>
   ): Ref<RS["kv"][Key]>
   ```

#### Parameters:

- **`storage: RS`**  
  The storage object that conforms to the `RStorage` interface. This object handles both retrieval (`get`) and updating (`set`, if available) of values stored with key-value pairs.

- **`key: Key`**  
  The key of the value you want to store and retrieve from the `kv` map in the storage system.

- **`defaultValue: MaybeRefOrGetter<RS["kv"][Key] | undefined>`** _(Optional)_  
  The default value to use if the value for the specified key is not found in the storage. It can either be a static value or a reactive reference.

- **`options: WatchOptions<Local>`** _(Optional)_  
  Additional options for the watcher.
  - **`local?: boolean`**: Determines whether changes should be watched locally within the current browser tab or across multiple tabs/windows using the `BroadcastChannel`.

#### Returns:

- **`ReadonlyRef<RS["kv"][Key]>`**  
  When the storage does not support setting values (`Set` is `undefined`), the returned reference will be readonly, making it reactive but unmodifiable in the current scope.

- **`Ref<RS["kv"][Key]>`**  
  When the storage supports setting values, the returned reference will be a standard Vue `Ref` that allows reading and writing to the value.

#### How It Works:

1. The function first retrieves the value associated with the `key` from the storage using the `get` function. If no value is found, it defaults to `defaultValue`.
2. A watcher is set up to observe changes to the specified key in the storage. When the key's value changes (whether locally or across tabs depending on the options), the reactive variable is updated.
3. If the storage supports setting values (i.e., it implements the `set` method), any changes to the reactive variable are automatically reflected in the storage.
4. When the component is unmounted, the watcher is cleaned up to avoid memory leaks.

#### Example:

```typescript
import { createStorage, createStore } from "chiku"

import { useStorage } from "@chiku/vue"

// Use localStorage to store and retrieve user preferences
const storage = createStorage(
  createStore<{
    theme: "light" | "dark"
  }>(),
  { sync: true, set$, get$ }
)
const theme = useStorage(storage, "theme", "dark" { local: true })

// Now `theme` is reactive, and any changes will be saved to localStorage and sync on all tab.
```

#### Watch Options:

- **`local?: boolean`**
  - `true`: Watches for changes locally, within the current tab.
  - `false`: Watches for changes across multiple tabs/windows using the `BroadcastChannel`.

#### Use Case:

This composable is ideal for applications that require syncing state between storage systems and Vue components, such as saving user preferences, form data, or other persistent states that need to remain reactive in the UI. It ensures that any change to the storage is reflected in the component and vice versa.
