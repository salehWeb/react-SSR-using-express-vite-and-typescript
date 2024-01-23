import './index.css'


interface IRoute {
    loader?: (req: Express.Request) => Promise<Object>
    head?: (args?: Object) => JSX.Element
    Page: (args?: Object) => JSX.Element
}

const routes = {
    "/": './pages/Home',
    "/1": './pages/Page1',
    "/2": './pages/Page2',
    "/3": './pages/Page3',
}

const router = async (url: string): Promise<IRoute> => {
    // @ts-ignore
    const Page = url in routes ? routes[url] : "./pages/NotFound.tsx"
    const data = await import(/* @vite-ignore */ Page);

    if ("loader" in data) {
        console.log("we have loader")
    } else {
        console.log("no loader found")
    }

    if ("head" in data) {
        console.log("we have head")
    } else {
        console.log("no head found")
    }


    return {
        Page: data.default as (args?: Object) => JSX.Element,
        loader: data?.loader as (req: Express.Request) => Promise<Object>,
        head: data?.head as () => JSX.Element
    };
}

export default router;


