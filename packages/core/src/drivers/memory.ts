// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type { Set, Del, DelMany, Get, GetMany, SetMany, Update } from "../types"

const memory: Record<string, unknown> = Object.create(null)

export const get$: Get = (key) => {
  return memory[key]
}
export const set$: Set = (key: string, value: unknown) => {
  memory[key] = value
}
export const del$: Del = (key: string) => {
  delete memory[key]
}
export const getMany$: GetMany = (keys: string[]) => {
  return keys.map((key) => memory[key])
}
export const setMany$: SetMany = (entries: [key: string, value: unknown][]) => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  entries.forEach(([key, value]) => void (memory[key] = value))
}
export const delMany$: DelMany = (keys: string[]) => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  keys.forEach((key) => delete memory[key])
}
export const update$: Update = (
  key: string,
  updater: (oldValue: unknown | undefined) => unknown
) => {
  const oldValue = memory[key]
  memory[key] = updater(oldValue)
}
