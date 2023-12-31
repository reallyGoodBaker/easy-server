import { IContext, controllers, JSONTypes } from "../context"
import { deconstruct } from "../func"

interface ParamData {
    readonly target: Object
    readonly key: string
    readonly index: number
}

export const createParamDecorator = (
    executor: (data: ParamData, ctx: IContext) => void
) => {
    return <ParameterDecorator> ((
        target: Object,
        key: string,
        index: number
    ) => {
        const data = { target, key, index }
        const ctx = controllers.getContext(target)
        
        executor.call(undefined, data, ctx)
    })
}

interface MethodData<T> {
    readonly target: Object
    readonly key: string
    readonly descriptor: TypedPropertyDescriptor<T>
}

export const createMethodDecorator = (
    executor: (data: MethodData<Function>, ctx: IContext) => void
) => {
    return <MethodDecorator> ((
        target: Object,
        key: string,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        executor.call(
            undefined,
            { target, key, descriptor },
            controllers.getContext(target)
        )
    })
}

export const Param = (name: string, type: JSONTypes = 'string') => createParamDecorator((data, ctx) => {
    const { key, index } = data
    const methodSetter = ctx.method(key)
    const prevArgs = methodSetter.value.args
    const arg = prevArgs.find(({ index: i }) => i == index)

    if (arg) {
        arg.index = index
        arg.type = type
        arg.name = name
    } else {
        prevArgs.push({ name, index, type })
    }
})

export const Query = createMethodDecorator((data, ctx) => {
    const { key, descriptor } = data
    const methodSetter = ctx.method(key)
    const prevArgs = methodSetter.value.args

    if (!descriptor.value) {
        return
    }

    const { isAsync, args } = deconstruct(descriptor.value)
    const ignoreIndex = prevArgs.map(v => v.index)

    methodSetter.set('isAsync', isAsync)
    args.forEach((v, i) => {
        if (ignoreIndex.includes(i)) {
            return
        }

        prevArgs.push({
            name: v,
            index: i,
            type: 'string'
        })
    })
})

export const Controller = (path: string = '/') => {
    return (target: Function) => {
        controllers.getContext(target.prototype).root = path
    }
}

export const Headers = (headers: any) => createMethodDecorator(({ key }, ctx) => {
    const addons = ctx.method(key).value.addons

    addons.set('headers', headers)
})

export const Response = createParamDecorator((param, ctx) => {
    const { key, index } = param
    const method = ctx.method(key)
    const args = method.value.args

    args.push({ index, name: 'response', type: 'response'})
})

export const Request = createParamDecorator((param, ctx) => {
    const { key, index } = param
    const method = ctx.method(key)
    const args = method.value.args

    args.push({ index, name: 'request', type: 'request'})
})

export const Body = (
    type: 'object' | 'string' | 'buffer' = 'object'
) => createParamDecorator(({ key, index }, ctx) => {
    const method = ctx.method(key)
    const args = method.value.args

    args.push({ name: 'body', type, index, extra: 'body' })
})

export const Mapping = createMethodDecorator(({ key }, ctx) => {
    const addons = ctx.method(key).value.addons

    addons.set('@Mapping', true)
})

export const PatternResult = createParamDecorator(({ key, index }, ctx) => {
    const method = ctx.method(key)
    const args = method.value.args

    args.push({ name: 'patternResult', type: PatternResult, index })
})