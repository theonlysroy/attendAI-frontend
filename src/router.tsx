import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login";
import AdminLogin from "@/pages/Auth/AdminLogin";
import Dashboard from "./pages/Student/Dashboard";
import Routine from "@/pages/Student/Routine";
import StudentLayout from "./pages/Student/StudentLayout";
import Attendance from "./pages/Student/Attendance";
import Report from "./pages/Student/Report";
import Notices from "./pages/Student/Notices";
import ResetPass from "./pages/Auth/ResetPass";
import DashPage from "./pages/Dashboard/DashPage";
import Register from "./pages/Auth/Register";
import DownloadID from "./pages/Student/DownloadID";
import NoticeDetails from "./pages/Student/NoticeDetails";
import Profile from "./pages/Student/Profile";
import Landing from "./pages/Home/Landing";
import Logout from "./pages/Student/Logout";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <DashPage />,
  },
  // Layout 1 (Home page layout)
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "auth",
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "resetpass",
            element: <ResetPass />,
          },
          {
            path: "admin",
            element: <AdminLogin />,
          },
        ],
      },
    ],
  },
  // Layout 2 (Secured routes layout)
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "routine",
        element: <Routine />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "notices",
        element: <Notices />,
      },
      {
        path: "notices/:noticeId",
        element: <NoticeDetails />,
      },
      {
        path: "idcard",
        element: <DownloadID />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

export { router };
