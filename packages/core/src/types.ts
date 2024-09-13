export type MaybeOrPromise<T> = T | Promise<T>

export type Get = (key: string) => MaybeOrPromise<unknown>
export type Set = (key: string, value: unknown) => MaybeOrPromise<void>
export type Del = (key: string) => MaybeOrPromise<void>
export type GetMany = (keys: string[]) => MaybeOrPromise<unknown[]>
export type SetMany = (entries: [key: string, value: unknown][]) => MaybeOrPromise<void>
export type DelMany = (keys: string[]) => MaybeOrPromise<void>
export type Update = (
  key: string,
  updater: (oldValue: unknown | undefined) => unknown
) => MaybeOrPromise<void>

export interface CStorage<
  G extends Get | undefined = undefined,
  S extends Set | undefined = undefined,
  D extends Del | undefined = undefined,
  GM extends GetMany | undefined = undefined,
  SM extends SetMany | undefined = undefined,
  DM extends DelMany | undefined = undefined,
  U extends Update | undefined = undefined
> {
  get$: G
  set$: S
  del$: D

  getMany$: GM
  setMany$: SM
  delMany$: DM

  update$: U
}
