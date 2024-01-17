import { Plugin } from "../type"
import { Headers } from '../../decorators/internal'

export const HeadersResolver: Plugin = ({ method, res }) => {
    const addons = method.addons

    if (addons.has(Headers)) {
        let headers = addons.get(Headers) ?? {}
        for (const [k, v] of Object.entries<string>(headers)) {
            res.setHeader(k, v)
        }
    }
}