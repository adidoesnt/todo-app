import { TaskSchema } from 'models/task';
import { TaskService } from 'service';

export const findAllTasks = () => {
    return TaskService.findAllTasks();
};

export const findTaskById = (id: string) => {
    return TaskService.findTaskById(id);
};

export const createTask = (task: TaskSchema) => {
    return TaskService.createTask(task);
};

export const updateTask = (id: string, task: TaskSchema) => {
    return TaskService.updateTask(id, task);
};

export const deleteTask = (id: string) => {
    return TaskService.deleteTask(id);
};
