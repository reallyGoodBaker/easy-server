import {
    Get, Query, Controller, Post, Param,
    Mapping, Body, Delete, PatternResult, Response, Headers, Options,
} from './decorators/index'
import { UTF8 } from './plugins/util/utf8'
import server from './server'
import { IncomingMessage, ServerResponse } from 'node:http'


@Controller('api')
class MyResolver {

    @Get()
    @Query
    hello(name: string, age: number, job: string) {
        return `<h1>${name}<br/>${age}岁，是${job}</h1>`
    }

    @Get()
    @Query
    r(
        general = 'V',
        @Response res: ServerResponse<IncomingMessage>,
    ) {
        res.write(`<h1>瑞克${general}</h1>`)
    }

    @Options()
    @Headers({ Allow: 'GET, OPTIONS' })
    opt() {}

}

@Controller('student')
class StudentResolver {
    @Get()
    @Query
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
        ]
    }

    @Post()
    @Mapping
    update(
        @Param('id', 'number') id: number,
        @Param('name') name: string,
        @Param('gender') gender: string,
        @Param('age', 'number') age: number,
        @Body() body: any
    ) {
        console.log(id, name, gender, age, body)
    }

    @Delete(/(?<id>.*)/)
    remove(
        @PatternResult { groups }: RegExpExecArray
    ) {
        console.log(groups)
    }
}

server
    .addController(MyResolver)
    .addController(StudentResolver)
    .addPlugin(UTF8)
    .listen({
        port: 3000,
        host: '127.0.0.1',
    })