"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossOriginResolver = void 0;
const cross_origin_1 = require("../../decorators/cross-origin");
const CrossOriginResolver = ({ method, res, req }) => {
    const { addons } = method;
    const corsConf = addons.get(cross_origin_1.Cors);
    const corsFilterConf = addons.get(cross_origin_1.CorsFilter);
    if (corsFilterConf && !checkCorsFilterConf(corsFilterConf, req)) {
        return false;
    }
    if (corsConf) {
        setCorsHeaders(corsConf, res);
    }
};
exports.CrossOriginResolver = CrossOriginResolver;
function toArray(obj) {
    if (Array.isArray(obj)) {
        return obj;
    }
    return obj.split(',').map(item => item.trim());
}
function checkCorsFilterConf(corsFilterConf, req) {
    let { origin, requestHeaders, requestMethod } = corsFilterConf;
    const _headers = req.headers;
    requestHeaders = toArray(requestHeaders);
    if (origin !== '*') {
        if (!_headers.origin || origin !== _headers.origin) {
            return false;
        }
    }
    if (requestHeaders[0] !== '*') {
        const _reqHeaders = (_headers["access-control-request-headers"] ?? '')
            .split(',')
            .map(item => item.trim());
        if (!isSubset(_reqHeaders, requestHeaders)) {
            return false;
        }
    }
    if (requestMethod !== '*') {
        const _reqMethod = _headers["access-control-request-method"];
        if (!_reqMethod || requestMethod !== _reqMethod) {
            return false;
        }
    }
    return true;
}
function setCorsHeaders(corsConf, res) {
    res.setHeader('Access-Control-Allow-Origin', corsConf.allowOrigin);
    res.setHeader('Access-Control-Allow-Methods', corsConf.allowMethods);
    res.setHeader('Access-Control-Allow-Headers', corsConf.allowHeaders);
    res.setHeader('Access-Control-Max-Age', corsConf.maxAge);
    res.setHeader('Access-Control-Allow-Credentials', corsConf.allowCredentials.toString());
    res.setHeader('Access-Control-Expose-Headers', corsConf.exposeHeaders);
}
