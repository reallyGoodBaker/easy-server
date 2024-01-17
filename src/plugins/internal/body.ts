import { ArgDesc, FunctionDesc, IMethodCaller, JSONTypes } from "../../context"
import { Mapping } from "../../decorators/internal"
import { promiseResolvers } from "../../util/promise"
import { Plugin } from "../type"

function handleArgMapping(argDesc: ArgDesc[], json: any, caller: IMethodCaller) {
    for (const { name, index, type } of argDesc) {
        if (!JSONTypes.includes(type as JSONTypes)) {
            continue
        }

        if (name in json) {
            caller.setArgument(index, json[name])
        }
    }
}

function resolveReceivedBody(
    mapping: boolean,
    buffer: Buffer,
    method: FunctionDesc,
    caller: IMethodCaller
) {
    let data: any

    if (mapping) {
        try {
            data = JSON.parse(buffer.toString())
            handleArgMapping(method.args, data, caller)
        } catch {
            data = null
        }
    }

    method.args.forEach(({ index, type, extra }) => {
        if (extra !== 'body') {
            return
        }

        data = type === 'object' ? data
            : type === 'string' ? buffer.toString()
                : buffer

        caller.setArgument(index, data)
    })
}

export const BodyResolver: Plugin = async ({ method, req, caller }) => {
    const addons = method.addons
    const paramType = addons.get('paramType')

    if (paramType !== 'body') {
        return false
    }

    const { promise, resolve } = promiseResolvers<boolean>()
    const mapping = addons.get(Mapping)

    let buffer = Buffer.alloc(0)

    req.on('data', chunk => buffer = Buffer.concat([ buffer, chunk ]))
    req.on('end', () => {
        try {
            resolveReceivedBody(mapping, buffer, method, caller)
        } finally {
            resolve(false)
        }
    })

    return await promise
}

export default BodyResolver