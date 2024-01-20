import * as P from "./pages/Hello";
import * as N from "./pages/NotFound";
import type React from "react";
import * as reactDomServer from "react-dom/server";
import { App } from "./entry-server";
import express from "express";

interface IXX {
    default: React.FC<any>,
    preServe?: typeof P.preServe,
    head?: React.FC<any>,
}

const routes = {
    "/": P,
}

const servePage = async (req: express.Request) => {
    console.log(req.url)
    // @ts-ignore
    const page = (req.url in routes ? routes[req.url] : N) as IXX;
    const data = page.preServe ? await page.preServe(req) : undefined;
    const head = page.head ? <page.head {...data} /> : <></>
    const Outlet = <page.default {...data} />

    return <App Outlet={Outlet} Head={head} />
}

const serve = async (req: express.Request, res: express.Response) => {
    const stream = reactDomServer.renderToPipeableStream(await servePage(req), {
        bootstrapModules: ['./entry-client.js']
    });

    stream.pipe(res.setHeader('Content-Type', 'text/html; charset=utf-8').status(200))
};


export default serve
