**@chiku/vue** is a Vue.js plugin designed to seamlessly integrate the powerful storage capabilities of the **Chiku** (蓄) library into Vue applications. It provides easy-to-use, reactive storage management tools that work with various storage types, such as IndexedDB, localStorage, and sessionStorage, while preserving Vue's reactive data flow.

### Features:
- **Vue Integration**: Fully compatible with Vue's reactivity system, allowing you to manage stored data within your Vue components.
- **Declarative API**: Use intuitive methods like `useStorage` to interact with storage in a Vue-friendly way.
- **Multiple Storage Types**: Supports IndexedDB, localStorage, sessionStorage, and custom storage solutions, making it flexible for various use cases.
- **Reactive Data**: Automatically updates components when storage data changes, ensuring your UI is always in sync.
- **Data Locking**: Includes data locking mechanisms (`lock`, `free`) to prevent race conditions across multiple components or tabs.
- **Batch Operations**: Efficiently handle batch storage operations using `getMany`, `setMany`, and `delMany`.

**@chiku/vue** empowers Vue developers to manage local or remote storage effortlessly, improving data persistence and synchronization in your Vue applications.