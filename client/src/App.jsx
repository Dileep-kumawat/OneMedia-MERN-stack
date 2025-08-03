import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import ErrorHandler from "./pages/ErrorHandler.jsx"
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/Auth.context.jsx';
import ProtectedRoute from './components/Protected.Route.jsx';
import PublicRoute from './components/Public.Route.jsx';
import { store } from './Store/store'
import { Provider } from 'react-redux'
import Messages from './pages/Messages.jsx'
import { SocketProvider } from './context/Socket.context.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    {
        path: "/signup",
        element: (
            <PublicRoute>
                <Signup />
            </PublicRoute>
        )
    },{
        path: "/messages",
        element: (
            <ProtectedRoute>
                <Messages />
            </ProtectedRoute>
        )
    }
]);

const App = () => {
    return (
        <>
            <AuthProvider>
                <Provider store={store}>
                    <SocketProvider>
                        <Toaster position="top-center" />
                        <RouterProvider router={router} />
                    </SocketProvider>
                </Provider>
            </AuthProvider>
        </>
    )
}

export default App
