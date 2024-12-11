import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// layout
import RootLayoutStaff from "./layouts/RootLayoutStaff";
import RootLayoutMaster from "./layouts/RootLayoutMaster";
import RootLayoutClient from "./layouts/RootLayoutClient";

// pages
import Signin from "./pages/Auth/Signin";
import ErrorPage from "./pages/Error/ErrorPage";

// staff pages
import StaffDashboard from "./pages/Staff/Dashboard/StaffDashboard";
import StaffProjects from "./pages/Staff/Projects/StaffProjects";
import StaffsList from "./pages/Staff/Staffs/StaffsList";
import StaffStatus from "./pages/Staff/Status/StaffStatus";
import StaffSettings from "./pages/Staff/Settings/StaffSettings";

// master pages
import MasterDashboard from "./pages/Master/Dashboard/MasterDashboard";
import ControlStaffs from "./pages/Master/Staffs/ControlStaffs";
import MasterProjects from "./pages/Master/Projects/MasterProjects";
import MasterStatus from "./pages/Master/Status/MasterStatus";
import MasterSettings from "./pages/Master/Settings/MasterSettings";

// client pages
import ProjectsList from "./pages/Customer/ProjectsList";
import ProjectStatus from "./pages/Customer/ProjectStatus";

function App() {
  const [access, setAccess] = useState(window.localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(window.localStorage.getItem("refresh"));
  const [userType, setUserType] = useState(window.localStorage.getItem("userType"));
  // const [userType, setUserType] = useState("client");

  const routes = createBrowserRouter([
    access && refresh && userType ? 
    // userType ? 
    userType === "master" ? 
          {
            path: "/",
            element: <RootLayoutMaster setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <MasterDashboard />,
              },
              {
                path: "staffs",
                element: <ControlStaffs />,
              },
              {
                path: "projects",
                element: <MasterProjects />,
              },
              {
                path: "status",
                element: <MasterStatus />,
              },
              {
                path: "settings",
                element: <MasterSettings />,
              },
            ],
          }
        : userType === "staff" ? 
          {
            path: "/",
            element: <RootLayoutStaff setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <StaffDashboard />,
              },
              {
                path: "staffs",
                element: <StaffsList />,
              },
              {
                path: "projects",
                element: <StaffProjects />,
              },
              {
                path: "status",
                element: <StaffStatus />,
              },
              {
                path: "settings",
                element: <StaffSettings />,
              },
            ],
          }
        : // userType === 'client' ?
          {
            path: "/",
            element: <RootLayoutClient setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <ProjectsList />
              },
              {
                path: "projectstatus",
                element: <ProjectStatus />
              },
            ],
          }
      : {
          path: "/",
          element: <Signin setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />,
          errorElement: <ErrorPage />,
        },
  ]);

  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;