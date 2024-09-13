import { del } from "./del"
import { createStorage, createStore, type RStorage } from "./create-storage"

describe("del function", () => {
  const mockStorage = createStorage(createStore(), { del$: vi.fn() })

  it("calls storage.del with the correct key", async () => {
    const key = "testKey"
    await del(mockStorage, key)
    expect(mockStorage.del$).toHaveBeenCalledTimes(1)
    expect(mockStorage.del$).toHaveBeenCalledWith(key)
  })

  it("returns the result of storage.del", async () => {
    const result = "testResult"
    mockStorage.del$.mockResolvedValue(result)
    const actualResult = await del(mockStorage, "testKey")
    expect(actualResult).toBe(result)
  })

  it("throws an error if storage.del throws an error", async () => {
    const error = new Error("testError")
    mockStorage.del$.mockRejectedValue(error)
    await expect(del(mockStorage, "testKey")).rejects.toThrow(error)
  })

  it("handles non-existent key", async () => {
    const key = "nonExistentKey"
    mockStorage.del$.mockResolvedValue(undefined)
    const actualResult = await del(mockStorage, key)
    expect(actualResult).toBeUndefined()
  })
})
