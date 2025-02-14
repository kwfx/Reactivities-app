import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ActivitiyDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import App from "../layout/App";
import Home from "../../features/home/Home";
import { ActivityFormModal } from "../../features/activities/form/ActivityFormModal";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "activities",
        element: <ActivitiyDashboard></ActivitiyDashboard>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
