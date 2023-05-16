import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CheckOut from "../pages/CheckOut/CheckOut";
import Booking from "../pages/Bookings/Booking";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/checkout/:id',
            element: <PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>,
            loader: ({params}) => fetch(`https://car-doctor-server-bay-seven.vercel.app/services/${params.id}`)
        },
        {
          path: 'bookings',
          element: <PrivateRoutes><Booking></Booking></PrivateRoutes>
        }
      ]
    },
  ]);

  export default router;