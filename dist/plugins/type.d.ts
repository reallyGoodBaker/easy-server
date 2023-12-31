/// <reference types="node" />
/// <reference types="node" />
import { FunctionDesc, IMethodCaller } from "../context";
import http from 'node:http';
import url from 'node:url';
export interface PluginParams {
    inst: any;
    method: FunctionDesc;
    res: http.ServerResponse<http.IncomingMessage>;
    req: http.IncomingMessage;
    url: url.UrlWithStringQuery;
    caller: IMethodCaller;
    patternResult?: RegExpExecArray | null;
}
export interface Plugin {
    (params: PluginParams): boolean | void | Promise<boolean | void>;
}
