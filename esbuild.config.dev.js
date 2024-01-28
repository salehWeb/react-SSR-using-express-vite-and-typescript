import * as esbuild from 'esbuild'
import { spawn } from 'child_process'
import fs from 'fs';

fs.cpSync("./public/", "./build/client", { force: true, recursive: true })

const clientCtx = await esbuild.context({
    entryPoints: ['./app/main.tsx'],
    splitting: true,
    bundle: true,
    keepNames: true,
    assetNames: "[name]",
    chunkNames: "[name]",
    format: "esm",
    logLevel: "info",
    platform: "browser",
    outdir: 'build/client'
})


const childXX = spawn('npx', ['tailwindcss', '-i', './app/main.css', '-o', './build/client/main.css', '--watch']);
childXX.stdout.pipe(process.stdout)
childXX.stderr.pipe(process.stderr)

let childProcess;

const Handler = () => {
    if (childProcess) childProcess.kill();
    try {
        childProcess = spawn('node', ['./build/server.js']);
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
    } catch (error) {
        console.log("error from server: ", error)
        process.exit(1)
    }
}


const serverCtx = await esbuild.context({
    plugins: [{
        name: 'restart',
        setup(build) {
            build.onEnd(result => {
                console.log(`build ended with ${result.errors.length} errors`);
                Handler()
            })
        },
    }],
    entryPoints: ['./server.ts'],
    bundle: true,
    format: "esm",
    logLevel: "info",
    platform: "node",
    packages: "external",
    outdir: 'build'
})

await serverCtx.watch()
await clientCtx.watch()
