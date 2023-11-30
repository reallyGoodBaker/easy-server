"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternResolver = void 0;
const decorators_1 = require("../decorators");
const PatternResolver = (inst, method, res, req, url, caller, result) => {
    method.args.forEach(({ index, extra }) => {
        if (extra === decorators_1.PatternResult) {
            caller.setArgument(index, result);
        }
    });
};
exports.PatternResolver = PatternResolver;
