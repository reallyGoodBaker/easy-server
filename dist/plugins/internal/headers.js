"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadersResolver = void 0;
const internal_1 = require("../../decorators/internal");
const HeadersResolver = ({ method, res }) => {
    const addons = method.addons;
    if (addons.has(internal_1.Headers)) {
        let headers = addons.get(internal_1.Headers) ?? {};
        for (const [k, v] of Object.entries(headers)) {
            res.setHeader(k, v);
        }
    }
};
exports.HeadersResolver = HeadersResolver;
