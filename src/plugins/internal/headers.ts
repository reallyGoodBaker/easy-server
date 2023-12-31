import { Plugin } from "../type"

export const HeadersResolver: Plugin = ({ method, res }) => {
    const addons = method.addons

    if (addons.has('headers')) {
        let headers = addons.get('headers') ?? {}
        for (const [k, v] of Object.entries<string>(headers)) {
            res.setHeader(k, v)
        }
    }
}