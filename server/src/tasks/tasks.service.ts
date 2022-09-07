import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskForm } from 'src/dto/task.dot';
import { Task, TaskDocument } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getTasks() {
    const tasks = await this.taskModel.find({});

    return { data: tasks };
  }

  async createTask(task: TaskForm) {
    try {
      const taskFound = await this.taskModel.findOne({
        title: task.title,
      });

      if (taskFound)
        throw new HttpException('La tarea ya existe.', HttpStatus.BAD_REQUEST);

      const createdTask = await this.taskModel.create({
        title: task.title,
        description: task.description,
      });
      return { message: 'Tarea creada con éxito.', data: createdTask };
    } catch (error) {
      throw new HttpException(
        'Error al crear la tarea.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTask(id: string) {
    const taskFound = await this.taskModel.findById(id);
    if (!taskFound)
      throw new HttpException('La tarea no existe.', HttpStatus.NOT_FOUND);

    const deletedTask = await this.taskModel.findByIdAndDelete(id);

    return { message: 'Tarea eliminada con éxito.', data: deletedTask };
  }

  async updateTask(id: string, task: TaskForm) {
    const taskFound = await this.taskModel.findById(id);
    if (!taskFound)
      throw new HttpException('La tarea no existe.', HttpStatus.NOT_FOUND);

    const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });

    return { message: 'Tarea actualizada con éxito.', data: updatedTask };
  }
}
