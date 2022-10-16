import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import { terser } from "rollup-plugin-terser"

export default [
    {
        input: './src/main.ts',
        output: {
            dir: 'dist',
            format: 'cjs',
            sourcemap: true,
            entryFileNames: '[name].js',
        },
        plugins: [
            terser(),
            resolve(),
            commonjs(),
            typescript(),
            copy({
                targets: [
                    {
                        src: 'dist/main.js',
                        dest: 'build'
                    },
                    {
                        src: 'dist/main.js.map',
                        dest: 'build',
                        rename: name => name + '.map.js',
                        transform: contents => `module.exports = ${contents.toString()};`
                    },
                ],
                hook: 'writeBundle',
                verbose: true
            }),
        ],
    }, {
        input: './src/main.ts',
        output: {
            dir: 'dist',
            format: 'esm',
            entryFileNames: '[name].esm.js',
        },
        plugins: [resolve(), commonjs(), typescript()],
    },
];