import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html")
			},
		},
	},
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: false,
		hmr: {
			protocol: 'ws',
			host: 'localhost',
			port: 5173
		}
	}
});
