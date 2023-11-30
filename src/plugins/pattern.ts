import { PatternResult } from "../decorators"
import { Plugin } from "./type"

export const PatternResolver: Plugin = (inst, method, res, req, url, caller, result) => {
    method.args.forEach(({ index, extra }) => {
        if (extra === PatternResult) {
            caller.setArgument(index, result)
        }
    })
}