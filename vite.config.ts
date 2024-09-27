import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const PORT = `${env.VITE_CLIENT_PORT}`;

    return {
        plugins: [react()],
        server: {
            port: PORT,
        },
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: './src/__tests__/setup.js',
            coverage: {
                provider: 'v8',
                reporter: ['text'],
                include: ['src'],
                exclude: ['src/main.tsx'],
            },
        },
    };
});
