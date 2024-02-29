import Dashboard from "../pages/Dashboard";
import Sendmoney from "../pages/Sendmoney";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const Routes = ({ children }) => {
  const routes = [
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
  ];

  const protectedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/send",
          element: <Sendmoney />,
        },
      ],
    },
  ];
  const router = createBrowserRouter([...routes, ...protectedRoutes]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Routes;
