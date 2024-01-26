import * as esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { transform as lightningTransform } from 'lightningcss';
import tailwindConfig from "./tailwind.config.js"

fs.rmSync("./build", { recursive: true, force: true })
fs.cpSync("./public/", "./build/client", { force: true, recursive: true })

const Promises = []
Promises.push(esbuild.build({
  entryPoints: ['./client/main.tsx'],
  splitting: true,
  bundle: true,
  format: "esm",
  keepNames: true,
  assetNames: "[name]",
  chunkNames: "[name]",
  logLevel: "info",
  platform: "browser",
  sourcesContent: true,
  minify: true,
  minifyWhitespace: true,
  loader: {
    '.svg': 'file',
    '.server': 'ts'
  },
  outdir: 'build/client'
}))


Promises.push(esbuild.build({
  plugins: [
    {
      name: "xx",
      setup: (build) => {
        build.onResolve({ filter: /\/(.*)/ }, args => {
          const x = args.path.split("/")
          const q = x[x.length - 1];
          const y = q.split(".")
          if (y.length > 1 && !(y[1] === "ts" || y[1] === "tsx" || y[1] === "js" || y[1] === "jsx")) {
            const z = path.resolve("./", "build", "client", q);
            console.log("path is ", z)
            return { path: z, external: true }
          }
        })
      }
    }
  ],
  entryPoints: ['./server.ts'],
  splitting: true,
  bundle: true,
  keepNames: true,
  assetNames: "[name]",
  chunkNames: "[name]",
  format: "esm",
  logLevel: "info",
  platform: "node",
  packages: "external",
  minify: true,
  minifyWhitespace: true,
  loader: {
    '.svg': 'file',
    '.server': 'ts'
  },
  outdir: 'build'
}))


await Promise.all(Promises);

const INPUT_CSS_FILE = path.join('client', 'main.css');
const OUTPUT_CSS_FILE = path.join('build', INPUT_CSS_FILE);

const postcssInstance = postcss()
  .use(tailwindcss(tailwindConfig));

const cssFile = fs.openSync(INPUT_CSS_FILE, 'r');

try {
  const buf = fs.readFileSync(cssFile)
  const { css } = await postcssInstance.process(buf, { from: INPUT_CSS_FILE, to: OUTPUT_CSS_FILE })
  const { code } = lightningTransform({ code: Buffer.from(css), minify: true })
  fs.writeFileSync(OUTPUT_CSS_FILE, code)
} finally {
  fs.closeSync(cssFile);
}
