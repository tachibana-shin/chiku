// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type { Set, Del, DelMany, Get, GetMany, SetMany, Update } from "../types"

export const get$: Get = (key) => {
  return localStorage.getItem(key)
}
export const set$: Set = (key: string, value: unknown) => {
  localStorage.setItem(key, value as string)
}
export const del$: Del = (key: string) => {
  localStorage.removeItem(key)
}
export const getMany$: GetMany = (keys: string[]) => {
  return keys.map((key) => localStorage.getItem(key))
}
export const setMany$: SetMany = (entries: [key: string, value: unknown][]) => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  entries.forEach(([key, value]) => localStorage.setItem(key, value as string))
}
export const delMany$: DelMany = (keys: string[]) => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  keys.forEach((key) => localStorage.removeItem(key))
}
export const update$: Update = (
  key: string,
  updater: (oldValue: unknown | undefined) => unknown
) => {
  const oldValue = localStorage.getItem(key)
  const newValue = updater(oldValue)
  localStorage.setItem(key, newValue as string)
}
