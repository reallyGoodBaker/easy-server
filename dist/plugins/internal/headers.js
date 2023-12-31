"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadersResolver = void 0;
const HeadersResolver = ({ method, res }) => {
    const addons = method.addons;
    if (addons.has('headers')) {
        let headers = addons.get('headers') ?? {};
        for (const [k, v] of Object.entries(headers)) {
            res.setHeader(k, v);
        }
    }
};
exports.HeadersResolver = HeadersResolver;
