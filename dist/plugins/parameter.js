"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterResolver = void 0;
const ParameterResolver = (inst, method, res, req, url, caller) => {
    method.args.forEach(({ index, type }) => {
        if (type === 'request') {
            caller.setArgument(index, req);
        }
        if (type === 'response') {
            caller.setArgument(index, res);
        }
    });
};
exports.ParameterResolver = ParameterResolver;
