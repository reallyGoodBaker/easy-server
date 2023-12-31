import { PatternResult } from "../../decorators"
import { Plugin } from "../type"

export const PatternResolver: Plugin = ({ method, caller, patternResult }) => {
    method.args.forEach(({ type }, index) => {
        if (type === PatternResult) {
            caller.setArgument(index, patternResult)
        }
    })
}