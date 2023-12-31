export declare function promiseResolvers<T>(): {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void | undefined;
    reject: (reason?: any) => void | undefined;
};
