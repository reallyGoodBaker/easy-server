"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsFilter = exports.Cors = void 0;
const internal_1 = require("./internal");
const defaultCrossOriginFilterConf = {
    origin: "*",
    requestMethod: "*",
    requestHeaders: "*"
};
const defaultCrossOriginConf = {
    allowMethods: "*",
    allowHeaders: "*",
    allowCredentials: true,
    exposeHeaders: "*",
    maxAge: 86400,
    allowOrigin: "*"
};
const Cors = (corsConf) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const { addons } = ctx.method(key).value;
    addons.set(exports.Cors, Object.assign({}, defaultCrossOriginConf, corsConf));
});
exports.Cors = Cors;
const CorsFilter = (corsFilterConf) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const { addons } = ctx.method(key).value;
    addons.set(exports.CorsFilter, Object.assign({}, defaultCrossOriginFilterConf, corsFilterConf));
});
exports.CorsFilter = CorsFilter;
