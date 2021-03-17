import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import("rollup").RollupOptions} */
const config = {
    input: "src/index.tsx",
    output: {
        file: "docs/index.js",
        format: "iife"
    },
    plugins: [
        nodeResolve(),
        commonjs({
            transformMixedEsModules: true
        }),
        replace({
            preventAssignment: true,
            values: {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            }
        }),
        typescript()
    ].concat(isProduction ? terser() : [])
};

// tslint:disable-next-line: no-default-export
export default config;
