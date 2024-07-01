import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./assets/views/Login.jsx";
import NotFound from "./assets/views/NotFound.jsx";
import DefaultLayout from "./assets/component/DefaultLayout.jsx";
import GuestLayout from "./assets/component/GuestLayout.jsx";
import Users from "./assets/views/Users.jsx";
import DashboardLayout from "./assets/views/DashboardLayout.jsx";
import SignUp from "./assets/views/SignUp.jsx";
import UserForm from "./assets/views/UserForm.jsx";
import Category from "./assets/views/Category.jsx";
 
import Invoice from "./assets/views/invoice.jsx";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/category",
        element: <Category />,
      },

      {
        path: "/invoice",
        element: <Invoice/>,
      },
      
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
