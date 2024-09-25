import { Elysia } from "elysia";

const { PORT = 3000 } = process.env;

try {
    const app = new Elysia()
        .get("/", () => "🦊 Server is healthy")
        .listen(PORT);
    const { hostname, port } = app.server ?? {};

    if (!hostname || !port) {
        throw new Error("🦊 Error starting server");
    }

    console.log(`🦊 Server is running at ${hostname}:${port}`);
} catch (e) {
    const error = e as Error;
    console.error(error.message);
}
