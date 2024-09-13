import { createStorage, createStore, getMany, setMany, delMany } from "./main"
import { setMany$, getMany$, delMany$ } from "./drivers/memory"

describe("del-many", () => {
  const store = createStorage(
    createStore<{
      counter: number
      name: string
    }>(),
    { setMany$, getMany$, delMany$ }
  )

  test("should delete many", async () => {
    await setMany(store, [
      ["counter", 10],
      ["name", "Shin"]
    ])

    expect(await getMany(store, ["counter", "name"])).toEqual([10, "Shin"])

    await delMany(store, ["counter", "name"])

    expect(await getMany(store, ["counter", "name"])).toEqual([undefined, undefined])
  })
})
