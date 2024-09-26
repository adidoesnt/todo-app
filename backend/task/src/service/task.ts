import { TaskSchema } from 'models/task';
import { TaskRepository } from 'repository';

export const findAllTasks = () => {
    return TaskRepository.findTasks();
};

export const createTask = (task: TaskSchema) => {
    return TaskRepository.createTask(task);
};

export const findTasksByUserUUID = (userUUID: string) => {
    return TaskRepository.findTasks({ userUUID });
};

export const findTaskById = (id: string) => {
    return TaskRepository.findTaskById(id);
};

export const updateTask = (id: string, task: TaskSchema) => {
    return TaskRepository.updateTask(id, task);
};

export const deleteTask = (id: string) => {
    return TaskRepository.deleteTask(id);
};
