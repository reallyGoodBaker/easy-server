type Setter<T> = {
    readonly value: T
    set<K extends keyof T>(k: K, v: T[K]): void
}

function Setter<T>(getter: () => T, setter: <K extends keyof T>(k: K, v: T[K]) => void): Setter<T> {
    return new Proxy({
        get value() {
            return getter.call(undefined)
        },
        set<K extends keyof T>(k: K, v: T[K]) {
            return setter.call(undefined, k, v)
        },
    }, {
        get(t, p: 'value' | 'set') {
            return t[p]
        },
        set() { return false }
    })
}

export interface IContext {
    root: string
    setMethod(name: string, desc: FunctionDesc): void
    getMethod(name: string): FunctionDesc | undefined
    method(name: string): Setter<FunctionDesc>
    methods(): FunctionDesc[]
}

export interface FunctionDesc {
    name: string
    isAsync: boolean
    args: ArgDesc[]
    addons: Map<string | Function, any>
}

export type JSONTypes = "string" | "number" | "boolean" | "null" | "object"
export const JSONTypes: JSONTypes[] = ["string", "number", "boolean", "null", "object"]

export type ArgTypes = JSONTypes | 'response' | 'request' | 'buffer' | 'stream' | Function
export const ArgTypes: ArgTypes[] = [...JSONTypes, "response", "request", "buffer", "stream"]

export interface ArgDesc {
    name: string
    index: number
    type: ArgTypes
    extra?: any
}

export class Context implements IContext {
    
    root: string = '/'

    method(name: string): Setter<FunctionDesc> {
        let m: FunctionDesc | undefined

        if (!(m = this.getMethod(name))) {
            m = { args: [], isAsync: false, name, addons: new Map() } as FunctionDesc
            this._methods.set(name, m)
        }

        return Setter(
            () => m as FunctionDesc,
            (k, v) => (<FunctionDesc>m)[k] = v
        )
    }

    methods(): FunctionDesc[] {
        return Array.from(this._methods.values())
    }

    private _methods = new Map<string, FunctionDesc>()

    setMethod(name: string, desc: FunctionDesc): void {
        this._methods.set(name, desc)
    }

    getMethod(name: string): FunctionDesc | undefined{
        return this._methods.get(name)
    }
    
}

const _controllers = new Map<any, IContext>()
const createContext = (target: any) => {
    const ctx = new Context()
    _controllers.set(target, ctx)
    return ctx
}
const delContext = (target: any) => {
    _controllers.delete(target)
}
const getContext = (target: any) => {
    let ctx: IContext | undefined
    if (ctx = _controllers.get(target)) {
        return ctx
    }

    return createContext(target)
}
export const controllers = {
    getContext, delContext, keys() {
        return _controllers.keys()
    }
}

export interface IMethodCaller {
    setArgument(index: number, arg: any): this
    call(thisArg: any): any
}

export class MethodCaller implements IMethodCaller {

    #args: any[] = []
    
    constructor(
        private method: Function
    ) {}

    setArgument(index: number, arg: any): this {
        this.#args[index] = arg

        return this
    }

    async call(thisArg: any) {
        return await this.method.apply(thisArg, this.#args)
    }

}