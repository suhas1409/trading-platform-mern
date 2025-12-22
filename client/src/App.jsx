import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';

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
