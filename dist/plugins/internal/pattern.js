"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternResolver = void 0;
const decorators_1 = require("../../decorators");
const PatternResolver = ({ method, caller, patternResult }) => {
    method.args.forEach(({ type }, index) => {
        if (type === decorators_1.PatternResult) {
            caller.setArgument(index, patternResult);
        }
    });
};
exports.PatternResolver = PatternResolver;
