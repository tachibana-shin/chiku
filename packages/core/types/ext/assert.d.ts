export declare class AssertionError extends Error {
    readonly name = "AssertionError";
}
export declare function assert<T>(value: undefined | null | T, message?: string): asserts value is T;
