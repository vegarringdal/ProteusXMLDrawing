import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            root: "./src",
            define: {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                APP_VERSION: `"${require("./package.json").version}"`
            },
            publicDir: path.resolve("./public"),
            plugins: [react()],
            server: {
                port: 3000
            },
            base: "./",
            build: {
                assetsDir: "./",
                target: "es2015",
                emptyOutDir: true,
                outDir: "./dist"
            }
        };
    } else {
        // command === 'build'
        return {
            root: "./src",
            define: {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                APP_VERSION: `"${require("./package.json").version}"`
            },
            publicDir: path.resolve("./public"),
            plugins: [react()],
            base: "./",
            build: {
                assetsDir: "./",
                target: "es2015",
                emptyOutDir: true,
                outDir: "../docs"
            }
        };
    }
});
