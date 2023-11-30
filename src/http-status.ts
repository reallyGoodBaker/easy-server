import { IncomingMessage, ServerResponse } from 'node:http'

export class HttpStatus {
    constructor(
        private res: ServerResponse<IncomingMessage>
    ) {}

    notFound() {
        this.res.statusCode = 404
        this.res.end()
    }
    
    emptyBody() {
        this.res.statusCode = 204
        this.res.end()
    }
    
    ok() {
        this.res.statusCode = 200
        this.res.end()
    }
}