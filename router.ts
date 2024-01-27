import { Request, Response } from 'express';

interface IRoute {
    head?: () => Promise<(args?: object) => JSX.Element>
    loader?: () => Promise<(req: Request, res: Response) => Promise<object>>
    Page: () => Promise<(args?: object) => JSX.Element>
}

const routes = {
    '/': {
        Page: () => import('./app/pages/Home').then(x => x.default),
        loader: () => import('./app/loaders/home').then(x => x.default),
        head: () => import('./app/pages/Home').then(x => x.head)
    },
    '/1': {
        Page: () => import('./app/pages/Page1').then(x => x.default),
    },
    '/2': {
        Page: () => import('./app/pages/Page2').then(x => x.default),
    },
    '/3': {
        Page: () => import('./app/pages/Page3').then(x => x.default),
    },
    '*': {
        Page: () => import('./app/pages/NotFound').then(x => x.default)
    }
};

const router = (url: string): IRoute => {
    if (url.endsWith("/") && url.length > 1) url = url.slice(0, url.length - 1)
    const importRoute = routes[url] || routes["*"]

    return importRoute;
}

export default router;
