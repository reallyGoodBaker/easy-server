import { controllers, FunctionDesc, IContext, MethodCaller } from "./context"
import http from 'node:http'
import https from 'node:https'
import url from 'node:url'
import chalk from "chalk"
import type { ListenOptions } from 'net'
import type { Plugin } from "./plugins/type"

import QueryResolver from "./plugins/query"
import BodyResolver from "./plugins/body"
import { HeadersResolver } from "./plugins/headers"
import { ParameterResolver } from "./plugins/parameter"
import { PatternResolver } from "./plugins/pattern"
import { HttpStatus } from "./http-status"


const controllersMapping = new Map()

export function addController(cls: Function) {
    const ctx = controllers.getContext(cls.prototype)
    const instance = Reflect.construct(cls, [])
    const root = ctx.root

    controllersMapping.set(root, createHandler(instance, ctx))

    return server
}

async function handle(
    instance: any,
    method: FunctionDesc,
    reqUrl: url.UrlWithStringQuery,
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>,
    status: HttpStatus,
    patternResult?: RegExpExecArray | null,
) {
    if (method.addons.get('method') !== req.method?.toUpperCase()) {
        return status.notFound()
    }

    const caller = new MethodCaller(instance[method.name])

    loop: for (const plugin of pluginSet) {
        try {
            if (await plugin.call(null, instance, method, res, req, reqUrl, caller, patternResult)) {
                break loop
            }
        } catch {
            break loop
        }
    }

    const val = caller.call(instance)

    if (val === void 0) {
        //空响应体
        return status.emptyBody()
    }

    if (
        typeof val === 'string' ||
        val instanceof Buffer ||
        val instanceof Uint8Array
    ) {
        res.write(val)
    } else {
        try {
            res.write(JSON.stringify(val))
        } catch {
            res.write(String(val))
        }
    }
}

function createHandler(instance: any, ctx: IContext) {
    return async (
        urlPath: string,
        reqUrl: url.UrlWithStringQuery,
        req: http.IncomingMessage,
        res: http.ServerResponse<http.IncomingMessage>,
        status: HttpStatus,
    ) => {
        urlPath = urlPath.trim() || '/'
        const methods = ctx.methods().filter(m => {
            const { addons } = m
            const method = addons.get('method') ?? 'GET'

            if (method !== req.method?.toUpperCase()) {
                return false
            }

            let pathPattern = addons.get('path')

            if (typeof pathPattern === 'string') {
                return pathPattern === urlPath
            }

            return pathPattern.test(urlPath)
        })

        if (!methods.length) {
            return status.notFound()
        }

        const exactlyMatched = methods.find(m => m.addons.get('path') === urlPath)

        if (exactlyMatched) {
            return handle(instance, exactlyMatched, reqUrl, req, res, status)
        }

        const method = methods[0]
        const { addons } = method
        const pathPattern = addons.get('path') as RegExp
        const result = pathPattern.exec(urlPath)

        handle(instance, method, reqUrl, req, res, status, result)
    }
}

function initMessage(opt: ListenOptions) {
    const link = chalk.cyan(`http://${opt.host}:${opt.port}`)

    return `
    serve at: ${link}
    `
}

const defaultOpt = {
    port: 3000,
    host: '127.0.0.1',
}

export function listen(opt?: ListenOptions | number) {
    let _opt: ListenOptions = defaultOpt

    switch (typeof opt) {
        case 'number':
            _opt.port = opt
            break
    
        default:
            _opt = Object.assign(_opt, opt)
            break
    }

    http.createServer(async (req, res) => {
        const reqUrl = url.parse(req.url ?? '')
        const paths = reqUrl.pathname?.split('/').slice(1) ?? ['']
        const controllerName = paths?.shift()
        const controller = controllersMapping.get(controllerName)
        const status = new HttpStatus(res)

        if (!controller) {
            return status.notFound()
        }

        await controller.call(undefined, paths.join('/'), reqUrl, req, res, status)
        status.ok()
    }).listen(_opt, () => {
        console.log(initMessage(_opt))
    })
}

const pluginSet = new Set<Plugin>([
    HeadersResolver,
    QueryResolver,
    BodyResolver,
    ParameterResolver,
    PatternResolver,
])

export function addPlugin(plugin: Plugin) {
    pluginSet.add(plugin)

    return server
}

export const server = {
    addController,
    addPlugin,
    listen,
}

export default server