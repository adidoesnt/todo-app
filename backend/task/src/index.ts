import { Elysia } from 'elysia';
import { Database } from 'utils/database';
import { Env, getEnv } from 'utils/env';
import { swagger } from '@elysiajs/swagger';

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
