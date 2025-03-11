import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [svelte()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ["**/src-tauri/**"],
		},
	},
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		}
	},
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'v8', // Use 'v8' for built-in coverage
			reporter: ['text', 'lcov'], // Output formats
			include: ['src/util/**/*.ts'], // Only apply coverage enforcement to 'src/util/*'
			lines: 80,
			branches: 80,
			functions: 100,
			statements: 80,
			checkCoverage: true, // Enforce thresholds
		},
	},
}));
