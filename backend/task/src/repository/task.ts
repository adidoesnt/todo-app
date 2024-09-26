import { Task, TaskSchema } from 'models/task';

export type FindTaskAttributes = Partial<TaskSchema>;

export const findTasks = (attributes?: FindTaskAttributes) => {
    return Task.find(attributes ?? {});
};

export const findTaskById = (id: string) => {
    return Task.findById(id);
};

export const createTask = (task: TaskSchema) => {
    return Task.create(task);
};

export const updateTask = (id: string, task: TaskSchema) => {
    return Task.findByIdAndUpdate(id, task);
};

export const deleteTask = (id: string) => {
    return Task.findByIdAndDelete(id);
};
