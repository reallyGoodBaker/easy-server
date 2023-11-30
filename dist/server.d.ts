/// <reference types="node" />
import type { ListenOptions } from 'net';
import type { Plugin } from "./plugins/type";
export declare function addController(cls: Function): {
    addController: typeof addController;
    addPlugin: typeof addPlugin;
    listen: typeof listen;
};
export declare function listen(opt?: ListenOptions | number): void;
export declare function addPlugin(plugin: Plugin): {
    addController: typeof addController;
    addPlugin: typeof addPlugin;
    listen: typeof listen;
};
export declare const server: {
    addController: typeof addController;
    addPlugin: typeof addPlugin;
    listen: typeof listen;
};
export default server;
