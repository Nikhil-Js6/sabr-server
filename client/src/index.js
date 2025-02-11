import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccessPage from './components/AccessPage';
import Home from './pages/Home';
import Error from './pages/Error';
import Visits from './pages/Visits';
import './index.css';

const userId = localStorage.getItem("userId");
const access = userId?.split("_")[0] !== "NewUser";
console.log(access);


const router = createBrowserRouter([
    {
        path: "/",
        element: <AccessPage/>
    },
    {
        path: "/home",
        element: access ? <Home /> : <Error />
    },
    {
        path: "/error",
        element: <Error />
    },
    {
        path: "/visits",
        element: <Visits />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);