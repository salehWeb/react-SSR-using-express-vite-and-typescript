interface IRoute {
    loader?: (req: Express.Request, res: Express.Response) => Promise<object>
    head?: (args?: object) => JSX.Element
    Page: (args?: object) => JSX.Element
}

const routes = {
    '/': () => import('./pages/Home'),
    '/1': () => import('./pages/Page1'),
    '/2': () => import('./pages/Page2'),
    '/3': () => import('./pages/Page3'),
};

const router = async (url: string): Promise<IRoute> => {
    if (url.endsWith("/") && url.length > 1) url = url.slice(0,url.length-1)
    // @ts-ignore
    const importRoute = routes[url] || (() => import('./pages/NotFound'));
    const route = await importRoute();

    return {
        Page: route.default as (args?: object) => JSX.Element,
        loader: route?.loader as (req: Express.Request, res: Express.Response) => Promise<object>,
        head: route?.head as () => JSX.Element
    };
}

export default router;
