import { Plugin } from "../type"

export const UTF8: Plugin = ({ res }) => {
    const contentType = (res.getHeader('Content-Type') ?? 'text/plain') as string
    const [ mime ] = contentType.split(/;\s*/g)
    res.setHeader('Content-Type', `${mime}; charset=utf-8`)
}