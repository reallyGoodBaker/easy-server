/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'node:http';
export declare class HttpStatus {
    private res;
    constructor(res: ServerResponse<IncomingMessage>);
    notFound(): void;
    emptyBody(): void;
    ok(): void;
}
