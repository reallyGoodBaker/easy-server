"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternResult = exports.Mapping = exports.Body = exports.Request = exports.Response = exports.Headers = exports.Controller = exports.Query = exports.Param = exports.createMethodDecorator = exports.createParamDecorator = void 0;
const context_1 = require("../context");
const func_1 = require("../func");
const createParamDecorator = (executor) => {
    return ((target, key, index) => {
        const data = { target, key, index };
        const ctx = context_1.controllers.getContext(target);
        executor.call(undefined, data, ctx);
    });
};
exports.createParamDecorator = createParamDecorator;
const createMethodDecorator = (executor) => {
    return ((target, key, descriptor) => {
        executor.call(undefined, { target, key, descriptor }, context_1.controllers.getContext(target));
    });
};
exports.createMethodDecorator = createMethodDecorator;
const Param = (name, type = 'string') => (0, exports.createParamDecorator)((data, ctx) => {
    const { key, index } = data;
    const methodSetter = ctx.method(key);
    const prevArgs = methodSetter.value.args;
    const arg = prevArgs.find(({ index: i }) => i == index);
    if (arg) {
        arg.index = index;
        arg.type = type;
        arg.name = name;
    }
    else {
        prevArgs.push({ name, index, type });
    }
});
exports.Param = Param;
exports.Query = (0, exports.createMethodDecorator)((data, ctx) => {
    const { key, descriptor } = data;
    const methodSetter = ctx.method(key);
    const prevArgs = methodSetter.value.args;
    if (!descriptor.value) {
        return;
    }
    const { isAsync, args } = (0, func_1.deconstruct)(descriptor.value);
    const ignoreIndex = prevArgs.map(v => v.index);
    methodSetter.set('isAsync', isAsync);
    args.forEach((v, i) => {
        if (ignoreIndex.includes(i)) {
            return;
        }
        prevArgs.push({
            name: v,
            index: i,
            type: 'string'
        });
    });
});
const Controller = (path = '/') => {
    return (target) => {
        context_1.controllers.getContext(target.prototype).root = path;
    };
};
exports.Controller = Controller;
const Headers = (headers) => (0, exports.createMethodDecorator)(({ key }, ctx) => {
    const addons = ctx.method(key).value.addons;
    addons.set('headers', headers);
});
exports.Headers = Headers;
exports.Response = (0, exports.createParamDecorator)((param, ctx) => {
    const { key, index } = param;
    const method = ctx.method(key);
    const args = method.value.args;
    args.push({ index, name: 'response', type: 'response' });
});
exports.Request = (0, exports.createParamDecorator)((param, ctx) => {
    const { key, index } = param;
    const method = ctx.method(key);
    const args = method.value.args;
    args.push({ index, name: 'request', type: 'request' });
});
const Body = (type = 'object') => (0, exports.createParamDecorator)(({ key, index }, ctx) => {
    const method = ctx.method(key);
    const args = method.value.args;
    args.push({ name: 'body', type, index, extra: 'body' });
});
exports.Body = Body;
exports.Mapping = (0, exports.createMethodDecorator)(({ key }, ctx) => {
    const addons = ctx.method(key).value.addons;
    addons.set('@Mapping', true);
});
exports.PatternResult = (0, exports.createParamDecorator)(({ key, index }, ctx) => {
    const method = ctx.method(key);
    const args = method.value.args;
    args.push({ name: 'patternResult', type: exports.PatternResult, index });
});
