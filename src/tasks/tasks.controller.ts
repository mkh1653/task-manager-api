import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status } = createTaskDto;
    return this.taskService.createTask(title, description, status);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateData);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
