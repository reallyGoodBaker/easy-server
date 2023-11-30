import { createMethodDecorator } from "./internal"

export const Get = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'GET')
    addons.set('paramType', 'query')
})

export const Post = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'POST')
    addons.set('paramType', 'body')
})

export const Head = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'HEAD')
})

export const Put = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'PUT')
    addons.set('paramType', 'body')
})

export const Delete = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'DELETE')
})

export const Connect = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'CONNECT')
})

export const Options = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'OPTIONS')
})

export const Trace = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'TRACE')
})

export const Patch = (path?: string | RegExp) => createMethodDecorator(({ key }, ctx) => {
    const target = ctx.method(key).value
    const addons = target.addons

    if (typeof path === 'string') {
        path = path.trim()
    }

    addons.set('path', path || target.name)
    addons.set('method', 'PATCH')
    addons.set('paramType', 'body')
})