import './index.css'
import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import NotFound from "./pages/NotFound";
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));

export const Router = () => {
    return (
        <Routes>
            <Route index element={
                <Suspense fallback={<h1>loading...</h1>}>
                    <Home />
                </Suspense>
            } />
            <Route path="/1" element={<Page1 />} />
            <Route path="/2" element={<Page2 />} />
            <Route path="/3" element={<Page3 />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

