import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller'; 
import { todos } from './todos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([todos]), ],
  providers: [TodosService],
  controllers: [TodosController],
})
export class todosModule {}