"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterResolver = void 0;
const ParameterResolver = ({ method, res, req, caller }) => {
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
