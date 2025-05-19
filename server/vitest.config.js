/// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: [
            "tests/**/*.{test,spec}.{ts,tsx,js}",
            "src/**/*.{test,spec}.{ts,tsx,js}",
        ],
        environment: "node",
        clearMocks: true,
        globals: true,
    },
});
