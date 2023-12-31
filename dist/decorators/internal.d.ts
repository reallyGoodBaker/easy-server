import { IContext, JSONTypes } from "../context";
interface ParamData {
    readonly target: Object;
    readonly key: string;
    readonly index: number;
}
export declare const createParamDecorator: (executor: (data: ParamData, ctx: IContext) => void) => ParameterDecorator;
interface MethodData<T> {
    readonly target: Object;
    readonly key: string;
    readonly descriptor: TypedPropertyDescriptor<T>;
}
export declare const createMethodDecorator: (executor: (data: MethodData<Function>, ctx: IContext) => void) => MethodDecorator;
export declare const Param: (name: string, type?: JSONTypes) => ParameterDecorator;
export declare const Query: MethodDecorator;
export declare const Controller: (path?: string) => (target: Function) => void;
export declare const Headers: (headers: any) => MethodDecorator;
export declare const Response: ParameterDecorator;
export declare const Request: ParameterDecorator;
export declare const Body: (type?: 'object' | 'string' | 'buffer') => ParameterDecorator;
export declare const Mapping: MethodDecorator;
export declare const PatternResult: ParameterDecorator;
export {};
