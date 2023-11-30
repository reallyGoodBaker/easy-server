declare type Setter<T> = {
    readonly value: T;
    set<K extends keyof T>(k: K, v: T[K]): void;
};
declare function Setter<T>(getter: () => T, setter: <K extends keyof T>(k: K, v: T[K]) => void): Setter<T>;
export interface IContext {
    root: string;
    setMethod(name: string, desc: FunctionDesc): void;
    getMethod(name: string): FunctionDesc | undefined;
    method(name: string): Setter<FunctionDesc>;
    methods(): FunctionDesc[];
}
export interface FunctionDesc {
    name: string;
    isAsync: boolean;
    args: ArgDesc[];
    addons: Map<string, any>;
}
export declare type JSONTypes = "string" | "number" | "boolean" | "null" | "object";
export declare const JSONTypes: JSONTypes[];
export declare type ArgTypes = JSONTypes | 'response' | 'request' | 'buffer' | 'stream';
export declare const ArgTypes: ArgTypes[];
export interface ArgDesc {
    name: string;
    index: number;
    type: ArgTypes;
    extra?: any;
}
export declare class Context implements IContext {
    root: string;
    method(name: string): Setter<FunctionDesc>;
    methods(): FunctionDesc[];
    private _methods;
    setMethod(name: string, desc: FunctionDesc): void;
    getMethod(name: string): FunctionDesc | undefined;
}
export declare const controllers: {
    getContext: (target: any) => IContext;
    delContext: (target: any) => void;
    keys(): IterableIterator<any>;
};
export interface IMethodCaller {
    setArgument(index: number, arg: any): this;
    call(thisArg: any): any;
}
export declare class MethodCaller implements IMethodCaller {
    #private;
    private method;
    constructor(method: Function);
    setArgument(index: number, arg: any): this;
    call(thisArg: any): any;
}
export {};
