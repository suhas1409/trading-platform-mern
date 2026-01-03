import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { Profile } from "./pages/profile/profile";
import { Layout } from "./pages/layout/layout";
export const App = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path:"/",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )
          },
          {
            path:"/profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )
          },
        ]
      },
      {
        path:"/login",
        element: <Login/>
      }, 
      {
        path: "/register",
        element: <Register />
      }
    ])
    return (
      <RouterProvider router={router}/>
    );
}
