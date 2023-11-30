"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResolver = void 0;
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
const QueryResolver = (inst, method, res, req, reqUrl, caller) => {
    const addons = method.addons;
    const reqDataType = addons.get('paramType');
    if (reqDataType === 'query') {
        const queryObj = node_querystring_1.default.parse(reqUrl.query ?? '');
        method.args.forEach(({ index, name, type }) => {
            if (type in convertor) {
                const rawData = queryObj[name];
                if (rawData) {
                    //@ts-ignore
                    caller.setArgument(index, convertType(rawData, type));
                }
            }
        });
    }
};
exports.QueryResolver = QueryResolver;
exports.default = exports.QueryResolver;
