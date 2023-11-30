"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Trace = exports.Options = exports.Connect = exports.Delete = exports.Put = exports.Head = exports.Post = exports.Get = void 0;
const internal_1 = require("./internal");
const Get = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'GET');
    addons.set('paramType', 'query');
});
exports.Get = Get;
const Post = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'POST');
    addons.set('paramType', 'body');
});
exports.Post = Post;
const Head = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'HEAD');
});
exports.Head = Head;
const Put = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'PUT');
    addons.set('paramType', 'body');
});
exports.Put = Put;
const Delete = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'DELETE');
});
exports.Delete = Delete;
const Connect = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'CONNECT');
});
exports.Connect = Connect;
const Options = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'OPTIONS');
});
exports.Options = Options;
const Trace = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'TRACE');
});
exports.Trace = Trace;
const Patch = (path) => (0, internal_1.createMethodDecorator)(({ key }, ctx) => {
    const target = ctx.method(key).value;
    const addons = target.addons;
    if (typeof path === 'string') {
        path = path.trim();
    }
    addons.set('path', path || target.name);
    addons.set('method', 'PATCH');
    addons.set('paramType', 'body');
});
exports.Patch = Patch;
