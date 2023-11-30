import { FunctionDesc, IMethodCaller } from "../context"
import http from 'node:http'
import url from 'node:url'

export interface Plugin {
    (
        instance: any,
        method: FunctionDesc,
        res: http.ServerResponse<http.IncomingMessage>,
        req: http.IncomingMessage,
        reqUrl: url.UrlWithStringQuery,
        caller: IMethodCaller,
        patternResult?: RegExpExecArray | null,
    ): boolean | void | Promise<boolean|void>
}