"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS = exports.UTF8 = void 0;
const UTF8 = (_, __, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
};
exports.UTF8 = UTF8;
const CORS = (inst, method, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(method);
};
exports.CORS = CORS;
