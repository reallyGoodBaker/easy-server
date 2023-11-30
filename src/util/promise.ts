export function promiseResolvers<T>() {
    let resolve: (value: T | PromiseLike<T>) => void | undefined,
        reject: (reason?: any) => void | undefined


    const promise = new Promise<T>((res, rej) => {
        resolve = res
        reject = rej
    })

    return {
        //@ts-ignore
        promise, resolve, reject
    }
}