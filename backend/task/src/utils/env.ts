export enum Env {
    DEV = 'dev',
    PROD = 'prod',
}

export const getEnv = () => {
    const env = process.env.NODE_ENV ?? '';
    return env.toLowerCase();
};
