const functionMatcher = /(?:function)?\s*\((.*)\)\s*\{/
const multilineComment = /\/\*.*\*\//g
const singlelinComment = /\/\/.*\r/g
const asyncIdentifier = /^async\s*(.*)/g

export function deconstruct(func: Function) {
    let str = func.toString()
        .replace(multilineComment, '')
        .replace(singlelinComment, '')

    let isAsync = str.startsWith('async')

    if (isAsync) {
        str = str.replace(asyncIdentifier, '$1').trim()
    }

    const [ _, _args = '' ] = (functionMatcher.exec(str) ?? [])
    const args = _args.split(',').map(v => v.split('=')[0].trim())

    return {
        isAsync,
        args,
    }
}