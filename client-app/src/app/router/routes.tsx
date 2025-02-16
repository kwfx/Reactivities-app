import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ActivitiyDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import App from "../layout/App";
import Home from "../../features/pages/Home";
import Activity from "../../features/pages/Activity";

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
      {
        path: "activities/:id",
        element: <Activity></Activity>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
