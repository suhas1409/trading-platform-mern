import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { Watchlist } from './components/watchlist/Watchlist';

export const App = () => {
    const router = createBrowserRouter([
          {
            path:"/",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )
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
