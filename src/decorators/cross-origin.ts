import { createMethodDecorator } from './internal';

export interface CrossOriginConf {
    allowOrigin?: string | string[]
    allowMethods?: string | string[]
    allowHeaders?: string | string[]
    allowCredentials?: boolean
    exposeHeaders?: string | string[]
    maxAge?: number
}

export interface CrossOriginFilterConf {
    origin?: string
    requestMethod?: string
    requestHeaders?: string | string[]
}

const defaultCrossOriginFilterConf: CrossOriginFilterConf = {
    origin: "*",
    requestMethod: "*",
    requestHeaders: "*"
}

const defaultCrossOriginConf: CrossOriginConf = {
    allowMethods: "*",
    allowHeaders: "*",
    allowCredentials: true,
    exposeHeaders: "*",
    maxAge: 86400,
    allowOrigin: "*"
}

export const Cors = (corsConf: CrossOriginConf) => createMethodDecorator(({ key }, ctx) => {
    const { addons } = ctx.method(key).value

    addons.set(Cors, Object.assign({}, defaultCrossOriginConf, corsConf))
})

export const CorsFilter = (corsFilterConf: CrossOriginFilterConf) => createMethodDecorator(({ key }, ctx) => {
    const { addons } = ctx.method(key).value

    addons.set(CorsFilter, Object.assign({}, defaultCrossOriginFilterConf, corsFilterConf))
})