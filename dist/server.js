"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.addPlugin = exports.listen = exports.addController = void 0;
const context_1 = require("./context");
const node_http_1 = __importDefault(require("node:http"));
const node_https_1 = __importDefault(require("node:https"));
const node_url_1 = __importDefault(require("node:url"));
const chalk_1 = __importDefault(require("chalk"));
const query_1 = __importDefault(require("./plugins/internal/query"));
const body_1 = __importDefault(require("./plugins/internal/body"));
const headers_1 = require("./plugins/internal/headers");
const parameter_1 = require("./plugins/internal/parameter");
const pattern_1 = require("./plugins/internal/pattern");
const http_status_1 = require("./http-status");
const cross_origin_1 = require("./plugins/internal/cross-origin");
const controllersMapping = new Map();
function addController(cls) {
    const ctx = context_1.controllers.getContext(cls.prototype);
    const instance = Reflect.construct(cls, []);
    const root = ctx.root;
    controllersMapping.set(root, createHandler(instance, ctx));
    return exports.server;
}
exports.addController = addController;
async function handle(instance, method, reqUrl, req, res, status, patternResult) {
    if (method.addons.get('method') !== req.method?.toUpperCase()) {
        return status.notFound();
    }
    const caller = new context_1.MethodCaller(instance[method.name]);
    loop: for (const plugin of pluginSet) {
        try {
            if (await plugin.call(null, {
                inst: instance,
                method,
                res,
                req,
                url: reqUrl,
                caller,
                patternResult
            })) {
                break loop;
            }
        }
        catch {
            break loop;
        }
    }
    const val = await caller.call(instance);
    if (val === undefined) {
        //空响应体
        return status.emptyBody();
    }
    if (typeof val === 'string' ||
        val instanceof Buffer ||
        val instanceof Uint8Array) {
        res.write(val);
    }
    else {
        try {
            res.write(JSON.stringify(val));
        }
        catch {
            res.write(String(val));
        }
    }
}
function createHandler(instance, ctx) {
    return async (urlPath, reqUrl, req, res, status) => {
        urlPath = urlPath.trim() || '/';
        const methods = ctx.methods().filter(m => {
            const { addons } = m;
            const method = addons.get('method') ?? 'GET';
            if (method !== req.method?.toUpperCase()) {
                return false;
            }
            let pathPattern = addons.get('path');
            if (typeof pathPattern === 'string') {
                return pathPattern === urlPath;
            }
            return pathPattern.test(urlPath);
        });
        if (!methods.length) {
            return status.notFound();
        }
        const exactlyMatched = methods.find(m => m.addons.get('path') === urlPath);
        if (exactlyMatched) {
            return await handle(instance, exactlyMatched, reqUrl, req, res, status);
        }
        const method = methods[0];
        const { addons } = method;
        const pathPattern = addons.get('path');
        const result = pathPattern.exec(urlPath);
        await handle(instance, method, reqUrl, req, res, status, result);
    };
}
const defaultInitMessage = (link) => `\n  serve at: ${link}\n`;
function initMessage(opt) {
    const link = chalk_1.default.cyan(`http://${opt.host}:${opt.port}`);
    return defaultInitMessage(link);
}
const defaultOpt = {
    port: 3000,
    host: 'localhost',
};
const defaultServerOpt = {};
function listen(opt) {
    let _opt = defaultOpt;
    let _sOpt = Object.assign({}, opt?.serverOptions, defaultServerOpt);
    switch (typeof opt) {
        case 'number':
            _opt.port = opt;
            break;
        default:
            _opt = Object.assign(_opt, opt);
            break;
    }
    const httpModule = (_sOpt.key ? node_https_1.default : node_http_1.default);
    httpModule.createServer(_sOpt, async (req, res) => {
        const reqUrl = node_url_1.default.parse(req.url ?? '');
        const paths = reqUrl.pathname?.split('/').slice(1) ?? [''];
        const controllerName = paths?.shift();
        const controller = controllersMapping.get(controllerName);
        const status = new http_status_1.HttpStatus(res);
        if (!controller) {
            return status.notFound();
        }
        await controller.call(undefined, paths.join('/'), reqUrl, req, res, status);
        status.ok();
    }).listen(_opt, () => {
        console.log(initMessage(_opt));
    });
}
exports.listen = listen;
const pluginSet = new Set([
    headers_1.HeadersResolver,
    cross_origin_1.CrossOriginResolver,
    query_1.default,
    body_1.default,
    parameter_1.ParameterResolver,
    pattern_1.PatternResolver,
]);
function addPlugin(plugin) {
    pluginSet.add(plugin);
    return exports.server;
}
exports.addPlugin = addPlugin;
exports.server = {
    addController,
    addPlugin,
    listen,
};
exports.default = exports.server;
