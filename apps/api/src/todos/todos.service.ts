import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { todos } from './todos.entity';
import { todoDto } from './todos.dto';

@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(todos)
    private todosRepository: Repository<todos>,
  ) {}

  async getAll(): Promise<todos[]> {
  return await this.todosRepository.find();
  }

  async getById(id: string): Promise<todos> {
    const todo = await this.todosRepository.findOne(id);
    if(!todo){
        throw new NotFoundException(`todo with id ${id} doesn't exist`);
    }
    return todo;
   
  }

  createTodo(body:todoDto){
    const todo = this.todosRepository.create(body)
    const results = this.todosRepository.save(todo)
    return results;
  }

  async removeTodo(id: string): Promise<void | string>{
    const todo = await this.todosRepository.findOne(
        id
    )
            if(!todo){
            throw new NotFoundException(`todo with id ${id} doesn't exist`);
           }
            await this.todosRepository.delete(id);
        return 'Deletion Successfull!'
      
  }
    async markComplete(id: string){
      const todo = await this.todosRepository.findOne(
        id
    )
    if(!todo){
        throw new NotFoundException('todo with this id doesn\'t exist')
    }
      return await this.todosRepository.save({...todo, status: true})
    }
  
  async updateTodo(id: string, body: todoDto): Promise<todos>{
    const todo = await this.todosRepository.findOne(
        id
    )
    if(!todo){
        throw new NotFoundException('todo with this id doesn\'t exist')
    }
    this.todosRepository.merge(todo, body)
    const results = await this.todosRepository.save(todo)
    return results;
  }
}