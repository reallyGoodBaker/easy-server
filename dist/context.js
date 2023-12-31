"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodCaller = exports.controllers = exports.Context = exports.ArgTypes = exports.JSONTypes = void 0;
function Setter(getter, setter) {
    return new Proxy({
        get value() {
            return getter.call(undefined);
        },
        set(k, v) {
            return setter.call(undefined, k, v);
        },
    }, {
        get(t, p) {
            return t[p];
        },
        set() { return false; }
    });
}
exports.JSONTypes = ["string", "number", "boolean", "null", "object"];
exports.ArgTypes = [...exports.JSONTypes, "response", "request", "buffer", "stream"];
class Context {
    root = '/';
    method(name) {
        let m;
        if (!(m = this.getMethod(name))) {
            m = { args: [], isAsync: false, name, addons: new Map() };
            this._methods.set(name, m);
        }
        return Setter(() => m, (k, v) => m[k] = v);
    }
    methods() {
        return Array.from(this._methods.values());
    }
    _methods = new Map();
    setMethod(name, desc) {
        this._methods.set(name, desc);
    }
    getMethod(name) {
        return this._methods.get(name);
    }
}
exports.Context = Context;
const _controllers = new Map();
const createContext = (target) => {
    const ctx = new Context();
    _controllers.set(target, ctx);
    return ctx;
};
const delContext = (target) => {
    _controllers.delete(target);
};
const getContext = (target) => {
    let ctx;
    if (ctx = _controllers.get(target)) {
        return ctx;
    }
    return createContext(target);
};
exports.controllers = {
    getContext, delContext, keys() {
        return _controllers.keys();
    }
};
class MethodCaller {
    method;
    #args = [];
    constructor(method) {
        this.method = method;
    }
    setArgument(index, arg) {
        this.#args[index] = arg;
        return this;
    }
    async call(thisArg) {
        return await this.method.apply(thisArg, this.#args);
    }
}
exports.MethodCaller = MethodCaller;
