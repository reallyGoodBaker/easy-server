export interface Entity extends Function {
    singletons: Map<Function, any>
}

export const Entity: Entity = (singleton = false) => (target: Function) => {
    //@ts-ignore
    target.isEntity = { singleton }
}

Entity.singletons = new Map<Function, any>()