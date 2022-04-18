import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { todos } from './todos.entity';
import { TodosService } from './todos.service';
import { todoDto } from './todos.dto';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService){}
    @Get()
        getAll(){
        return this.todoService.getAll();
    }
    
    @Get(':id')
        async getById(@Param('id') id:string): Promise<todos | void>{
        return this.todoService.getById(id);    
    }

    @Post()
        createTodo(@Body() body: todoDto): Promise<todos>{
        return this.todoService.createTodo(body);
    }

    @Patch(':id')
        markComplete(@Param('id') id:string):Promise<void | todos>{
        return this.todoService.markComplete(id);
    }

    @Put(':id')
        updateTodo( @Body() body: todoDto, @Param('id') id:string):Promise<void | todos>{
        if(id && body){
            return this.todoService.updateTodo(id, body);
          }
    }

    @Delete(':id')
        deleteTodo(@Param('id') id:string):Promise<string | void> {
        return this.todoService.removeTodo(id);
    }
}
