"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
class HttpStatus {
    res;
    constructor(res) {
        this.res = res;
    }
    notFound() {
        this.res.statusCode = 404;
        this.res.end();
    }
    emptyBody() {
        this.res.statusCode = 204;
        this.res.end();
    }
    ok() {
        this.res.statusCode = 200;
        this.res.end();
    }
}
exports.HttpStatus = HttpStatus;
