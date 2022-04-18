import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todosModule } from '../todos/todos.module';
import { todos } from '../todos/todos.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'test_db',
      entities: [todos],
      synchronize: true,
    }), 
    todosModule
  ],
  providers: [todosModule],
})
export class AppModule {}
