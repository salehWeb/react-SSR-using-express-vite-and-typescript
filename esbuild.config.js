import { spawn } from 'child_process'
import * as esbuild from 'esbuild'
import fs from 'fs'

fs.rmSync("./build", { recursive: true, force: true })
fs.cpSync("./public/", "./build/client", { force: true, recursive: true })

const Promises = []
Promises.push(esbuild.build({
  entryPoints: ['./app/main.tsx'],
  splitting: true,
  bundle: true,
  format: "esm",
  logLevel: "info",
  platform: "browser",
  minify: true,
  minifyWhitespace: true,
  outdir: 'build/client'
}))

Promises.push(esbuild.build({
  entryPoints: ['./server.ts'],
  bundle: true,
  format: "esm",
  logLevel: "info",
  platform: "node",
  packages: "external",
  minify: true,
  minifyWhitespace: true,
  outdir: 'build'
}))

const childXX = spawn('npx', ['tailwindcss', '-i', './app/main.css', '-o', './build/client/main.css', '--minify']);
childXX.stdout.pipe(process.stdout)
childXX.stderr.pipe(process.stderr)

await Promise.all(Promises);
