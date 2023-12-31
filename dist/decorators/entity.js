"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Entity = (singleton = false) => (target) => {
    //@ts-ignore
    target.isEntity = { singleton };
};
exports.Entity = Entity;
exports.Entity.singletons = new Map();
