import { Request, Response } from 'express';
import Home from './app/pages/Home';
import homeLoader, { homeHead } from './app/loaders/home';
import Page1 from './app/pages/Page1';
import Page2 from './app/pages/Page2';
import Page3 from './app/pages/Page3';
import NotFound from './app/pages/NotFound';

interface IRoute {
    Head?: (args?: object) => JSX.Element
    loader?: (req: Request, res: Response) => Promise<object>
    Page: (args?: object) => JSX.Element
}

const routes = {
    '/': {
        Page: Home,
        loader: homeLoader,
        Head: homeHead
    },
    '/1': {
        Page: Page1,
    },
    '/2': {
        Page: Page2,
    },
    '/3': {
        Page: Page3,
    },
    '*': {
        Page: NotFound
    }
};

const router = (url: string): IRoute => {
    if (url.endsWith("/") && url.length > 1) url = url.slice(0, url.length - 1)
    return routes[url] || routes["*"]
}

export default router;
