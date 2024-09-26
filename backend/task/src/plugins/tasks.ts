import { TaskController } from 'controller';
import { t, Elysia } from 'elysia';
import { TaskStatus } from 'models/task';

export const tasks = new Elysia({
    prefix: '/tasks',
}).group('/tasks', (app) =>
    app
        .get('/health', () => '🦊 Task router is healthy!')
        .get('/', () => TaskController.findAllTasks())
        .get('/:id', ({ params: { id } }) => TaskController.findTaskById(id))
        .delete('/:id', ({ params: { id } }) => TaskController.deleteTask(id))
        .guard({
            body: t.Object({
                name: t.String(),
                description: t.String(),
                deadline: t.Date(),
                status: t.Enum(TaskStatus),
                userUUID: t.String(),
            }),
        })
        .post('/', ({ body }) => TaskController.createTask(body))
        .put('/:id', ({ params: { id }, body }) =>
            TaskController.updateTask(id, body),
        ),
);
