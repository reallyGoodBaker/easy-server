"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./decorators/index");
const utf8_1 = require("./plugins/util/utf8");
const server_1 = __importDefault(require("./server"));
let MyResolver = class MyResolver {
    hello(name, age, job) {
        return `<h1>${name}<br/>${age}岁，是${job}</h1>`;
    }
    r(general = 'V', res) {
        res.write(`<h1>瑞克${general}</h1>`);
    }
    opt() { }
};
__decorate([
    (0, index_1.Get)(),
    index_1.Query
], MyResolver.prototype, "hello", null);
__decorate([
    (0, index_1.Get)(),
    index_1.Query,
    __param(1, index_1.Response)
], MyResolver.prototype, "r", null);
__decorate([
    (0, index_1.Options)(),
    (0, index_1.Headers)({ Allow: 'GET, OPTIONS' })
], MyResolver.prototype, "opt", null);
MyResolver = __decorate([
    (0, index_1.Controller)('api')
], MyResolver);
let StudentResolver = class StudentResolver {
    getAll() {
        return [
            {
                id: 39,
                name: '初音ミク',
                gender: 'female',
                age: 16
            },
            {
                id: 0,
                name: "The Fool",
                gender: "male",
                age: 0
            }
        ];
    }
    update(id, name, gender, age, body) {
        console.log(id, name, gender, age, body);
    }
    remove({ groups }) {
        console.log(groups);
    }
};
__decorate([
    (0, index_1.Get)(),
    index_1.Query
], StudentResolver.prototype, "getAll", null);
__decorate([
    (0, index_1.Post)(),
    index_1.Mapping,
    __param(0, (0, index_1.Param)('id', 'number')),
    __param(1, (0, index_1.Param)('name')),
    __param(2, (0, index_1.Param)('gender')),
    __param(3, (0, index_1.Param)('age', 'number')),
    __param(4, (0, index_1.Body)())
], StudentResolver.prototype, "update", null);
__decorate([
    (0, index_1.Delete)(/(?<id>.*)/),
    __param(0, index_1.PatternResult)
], StudentResolver.prototype, "remove", null);
StudentResolver = __decorate([
    (0, index_1.Controller)('student')
], StudentResolver);
server_1.default
    .addController(MyResolver)
    .addController(StudentResolver)
    .addPlugin(utf8_1.UTF8)
    .listen();
