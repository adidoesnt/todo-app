import { t, Elysia } from 'elysia';
import { Database } from 'utils/database';
import { Env, getEnv } from 'utils/env';
import { swagger } from '@elysiajs/swagger';
import { TaskController } from 'controller';
import { TaskStatus } from 'models/task';

const { PORT = 3000 } = process.env;

try {
    await Database.connectDB();
} catch (e) {
    const error = e as Error;
    console.error(error.message);
}

try {
    const app = new Elysia()
        .use(swagger())
        .get('/', () => '🦊 Server is healthy!')
        .get('/health', () => '🦊 Server is healthy!')
        .group('/tasks', (app) =>
            app
                .get('/health', () => '🦊 Task router is healthy!')
                .get('/', () => TaskController.findAllTasks())
                .get('/:id', ({ params: { id } }) =>
                    TaskController.findTaskById(id),
                )
                .post('/', ({ body }) => TaskController.createTask(body), {
                    body: t.Object({
                        name: t.String(),
                        description: t.String(),
                        deadline: t.Date(),
                        status: t.Enum(TaskStatus),
                        userUUID: t.String(),
                    }),
                })
                .put(
                    '/:id',
                    ({ params: { id }, body }) =>
                        TaskController.updateTask(id, body),
                    {
                        params: t.Object({
                            id: t.String(),
                        }),
                        body: t.Object({
                            name: t.String(),
                            description: t.String(),
                            deadline: t.Date(),
                            status: t.Enum(TaskStatus),
                            userUUID: t.String(),
                        }),
                    },
                )
                .delete(
                    '/:id',
                    ({ params: { id } }) => TaskController.deleteTask(id),
                    {
                        params: t.Object({
                            id: t.String(),
                        }),
                    },
                ),
        )
        .listen(PORT);
    const { hostname, port } = app.server ?? {};

    if (!hostname || !port) {
        throw new Error('🦊 Error starting server.');
    }

    const baseUrl =
        getEnv() === Env.DEV
            ? `http://${hostname}:${port}`
            : `https://${hostname}:${port}`;
    console.log(`🦊 Server is running at ${baseUrl}`);
} catch (e) {
    const error = e as Error;
    await Database.disconnectDB();
    console.error(error.message);
}
