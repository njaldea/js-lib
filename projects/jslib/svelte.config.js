import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-vercel";

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: [vitePreprocess()],
    extensions: [".svelte", ".md"],
    kit: {
        adapter: adapter({ runtime: "edge" }),
        files: {
            assets: "src/static"
        }
    }
};
