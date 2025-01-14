import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(
    title: string,
    description: string,
    status: TaskStatus,
  ): Promise<Task> {
    const newTask = this.tasksRepository.create({ title, description, status });
    return this.tasksRepository.save(newTask);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if(!task){
      throw new NotFoundException('Not found task')
    }
    return task;
  }

  async updateTask(id: string, updateData: Partial<Task>): Promise<Task> {
    const task = await this.getTaskById(id);

    const { title, description, status } = updateData;

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    if (status) {
      task.status = status;
    }

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    this.tasksRepository.delete(id);
  }
}
