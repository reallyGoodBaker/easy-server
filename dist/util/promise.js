"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseResolvers = void 0;
function promiseResolvers() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        //@ts-ignore
        promise, resolve, reject
    };
}
exports.promiseResolvers = promiseResolvers;
