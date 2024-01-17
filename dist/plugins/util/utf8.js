"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTF8 = void 0;
const UTF8 = ({ res }) => {
    const contentType = (res.getHeader('Content-Type') ?? 'text/plain');
    const [mime] = contentType.split(/;\s*/g);
    res.setHeader('Content-Type', `${mime}; charset=utf-8`);
};
exports.UTF8 = UTF8;
