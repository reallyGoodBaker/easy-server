import { Plugin } from "../type"

export const UTF8: Plugin = ({ res }) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
}