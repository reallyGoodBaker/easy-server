"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTF8 = void 0;
const UTF8 = ({ res }) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
};
exports.UTF8 = UTF8;
