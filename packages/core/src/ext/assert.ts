export class AssertionError extends Error {
  readonly name = "AssertionError"
}

export function assert<T>(value: undefined | null | T, message = ""): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(message)
  }
}
