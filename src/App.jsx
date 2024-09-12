import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// layout
import RootLayoutStaff from "./layouts/RootLayoutStaff";
import RootLayoutMaster from "./layouts/RootLayoutMaster";

// pages
import Signin from "./pages/Auth/Signin";
import ErrorPage from "./pages/Error/ErrorPage"
import Logout from "./pages/Logout";

// staff pages
import StaffDashboard from "./pages/Staff/Dashboard/StaffDashboard";
import StaffProjects from "./pages/Staff/Projects/StaffProjects";
import StaffsList from "./pages/Staff/Staffs/StaffsList";
import StaffStatus from "./pages/Staff/Status/StaffStatus";
import StaffSettings from "./pages/Staff/Settings/StaffSettings";

// master pages
import MasterDashboard from "./pages/Master/Dashboard/MasterDashboard";

function App() {

  const [access, setAccess] = useState(window.localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(window.localStorage.getItem("refresh"));
  const [userType, setUserType] = useState(window.localStorage.getItem("userType"));


  const routes = createBrowserRouter(
    [
      access && refresh ? (
        userType === 'master' ?
        // MasterRootLayouts START
        {
          path: '/',
          element: <RootLayoutMaster />, // userType = master bo'lsa RootLayoutMaster ochiladi
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <MasterDashboard />
            }
          ]
        }
        // MasterRootLayouts END
        :
        // StaffRootLayouts START
        {
          path: '/',
          element: <RootLayoutStaff />, // userType = staff bo'lsa RootLayoutStaff ochiladi
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <StaffDashboard />
            }, 
            {
              path: 'staffs',
              element: <StaffsList />
            }, 
            {
              path: 'projects',
              element: <StaffProjects />
            }, 
            {
              path: 'status',
              element: <StaffStatus />
            }, 
            {
              path: 'settings',
              element: <StaffSettings />
            }, 
            {
              path: 'logout',
              element: <Logout />
            }
          ]
        }
        // StaffRootLayouts END
      ) : (
        {
          path: '/',
          element: <Signin setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />,
          errorElement: <ErrorPage />
        }
      )
      
    ]
  );

  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;