"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetResolver = void 0;
const node_querystring_1 = __importDefault(require("node:querystring"));
const convertor = {
    string: (v) => v,
    number: (v) => Number(v),
    boolean: (v) => !!v,
    object: (v) => Object.toString.call(v),
    null: () => null
};
function convertType(v, type) {
    if (Array.isArray(v)) {
        return v;
    }
    try {
        return JSON.parse(v);
    }
    catch (_) {
        return convertor[type](v);
    }
}
const GetResolver = (inst, method, res, req, reqUrl) => {
    const addons = method.addons;
    const reqDataType = addons.get('paramType');
    if (reqDataType === 'query') {
        const queryObj = node_querystring_1.default.parse(reqUrl.query ?? '');
        const argsInvoke = [];
        method.args.forEach(({ index, name, type }) => {
            argsInvoke[index] = convertType(queryObj[name] ?? '', type);
        });
        res.write(inst[method.name].apply(inst, argsInvoke));
        return true;
    }
    return false;
};
exports.GetResolver = GetResolver;
exports.default = exports.GetResolver;
