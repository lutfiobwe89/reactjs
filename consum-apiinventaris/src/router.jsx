import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from './pages/Login'
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff";
import Stufftrash from "./pages/Stufftrash";
import User from "./pages/user"


export const router = createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/login', element: <Login />},
    {path: '/profile', element: <Profile />},
    {path: '/stuffs', element: <Stuff />},
    {path: '/stuffs/trash', element: <Stufftrash/>},
    {path: '/users', element: <User/>}

])
