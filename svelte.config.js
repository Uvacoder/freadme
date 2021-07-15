import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
/** @type {import('@sveltejs/kit').Config} */
const config = {
    "extensions": [".svelte", ...mdsvexConfig.extensions],

    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',
        // ssr: false,
        files: { 
            hooks: '/src/hooks/index.js',
        },
        vite: () => ({
            resolve: {
                alias: {
                    '$style': '/src/lib/style',
                    '$components': '/src/lib/components',
                    '$utils': '/src/lib/utils',
                    '$data': '/src/lib/data',
                    '$services': '/src/lib/services',
                    '$stores': '/src/lib/stores',
                }
            }
        }),
	},
    preprocess: [mdsvex(mdsvexConfig)],
};

export default config;
