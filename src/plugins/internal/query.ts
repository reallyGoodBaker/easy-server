import type { Plugin } from '../type'
import type { JSONTypes } from "../../context"
import qstr from 'node:querystring'

const convertor = {
    string: (v: string) => v,
    number: (v: string) => Number(v),
    boolean: (v: string) => !!v,
    object: (v: string) => Object.toString.call(v),
    null: () => null
}

function convertType(v: string | string[], type: JSONTypes) {
    if (Array.isArray(v)) {
        return v
    }

    try {
        return JSON.parse(v)
    } catch (_) {
        return convertor[type](v)
    }
}

export const QueryResolver: Plugin = ({ method, url: reqUrl, caller }) => {
    const addons = method.addons
    const reqDataType = addons.get('paramType')

    if (reqDataType === 'query') {
        const queryObj = qstr.parse(reqUrl.query ?? '')
        method.args.forEach(({ index, name, type }) => {
            if (typeof type === 'function') {
                return
            }

            if (type in convertor) {
                const rawData = queryObj[name]
                
                if (rawData) {
                    //@ts-ignore
                    caller.setArgument(index, convertType(rawData, type))
                }
            }
        })
    }
}

export default QueryResolver