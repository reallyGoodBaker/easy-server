import { Plugin } from "./type"

export const ParameterResolver: Plugin = (inst, method, res, req, url, caller) => {
    method.args.forEach(({ index, type }) => {
        if (type === 'request') {
            caller.setArgument(index, req)
        }

        if (type === 'response') {
            caller.setArgument(index, res)
        }
    })
}