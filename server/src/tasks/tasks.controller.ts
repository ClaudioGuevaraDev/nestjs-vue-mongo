import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskForm } from 'src/dto/task.dot';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @HttpCode(200)
  getTasks() {
    return this.taskService.getTasks();
  }

  @Post()
  @HttpCode(201)
  createTask(@Body() task: TaskForm) {
    return this.taskService.createTask(task);
  }

  @Delete(':id')
  @HttpCode(200)
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTask(@Param('id') id: string, @Body() task: TaskForm) {
    return this.taskService.updateTask(id, task);
  }
}
