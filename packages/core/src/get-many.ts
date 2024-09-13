import type { RStorage } from "./create-storage"
import type { GetMany } from "./types"

export async function getMany<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  RS extends RStorage<any, any, any, any, any, GetMany, any, any, any>,
  Keys extends (keyof RS["kv"])[]
>(
  storage: RS,
  keys: [...Keys] // Spread tuple to keep exact types
): Promise<{
  [K in keyof Keys]: Keys[K] extends keyof RS["kv"] ? RS["kv"][Keys[K]] | undefined : never
}> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return storage.getMany$(keys as string[]) as unknown as any
}
