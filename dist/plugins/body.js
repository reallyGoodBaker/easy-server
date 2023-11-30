"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyResolver = void 0;
const context_1 = require("../context");
const promise_1 = require("../util/promise");
function handleArgMapping(argDesc, json, caller) {
    for (const { name, index, type } of argDesc) {
        if (!context_1.JSONTypes.includes(type)) {
            continue;
        }
        if (name in json) {
            caller.setArgument(index, json[name]);
        }
    }
}
function resolveReceivedBody(mapping, buffer, method, caller) {
    let data;
    if (mapping) {
        try {
            data = JSON.parse(buffer.toString());
            handleArgMapping(method.args, data, caller);
        }
        catch {
            data = null;
        }
    }
    method.args.forEach(({ index, type, extra }) => {
        if (extra !== 'body') {
            return;
        }
        data = type === 'object' ? data
            : type === 'string' ? buffer.toString()
                : buffer;
        caller.setArgument(index, data);
    });
}
const BodyResolver = async (inst, method, res, req, url, caller) => {
    const addons = method.addons;
    const paramType = addons.get('paramType');
    if (paramType !== 'body') {
        return false;
    }
    const { promise, resolve } = (0, promise_1.promiseResolvers)();
    const mapping = addons.get('@Mapping');
    let buffer = Buffer.alloc(0);
    req.on('data', chunk => buffer = Buffer.concat([buffer, chunk]));
    req.on('end', () => {
        try {
            resolveReceivedBody(mapping, buffer, method, caller);
        }
        finally {
            resolve(false);
        }
    });
    return await promise;
};
exports.BodyResolver = BodyResolver;
exports.default = exports.BodyResolver;
