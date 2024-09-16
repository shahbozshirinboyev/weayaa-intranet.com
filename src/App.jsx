import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import http from "./services/http";
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
import ControlStaffs from "./pages/Master/Staffs/ControlStaffs";
import MasterProjects from "./pages/Master/Projects/MasterProjects";
import MasterStatus from "./pages/Master/Status/MasterStatus";
import MasterSettings from "./pages/Master/Settings/MasterSettings";

function App() {

  // Token refresh start
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        (localStorage.getItem('access')) ?
        http.post("token/refresh/", {
            'refresh' : localStorage.getItem('refresh')
          })
          .then((newtoken) => {
            localStorage.setItem('access', newtoken.data.access)
            console.log('Token yangilandi')
          })
          .catch(() => {
            toast.error("Yangi 'token' olib bo'lmadi :(");
          })
          :
          toast.error("Token mavjud emas :(");
      }, 200000);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // Token refresh start

  const [access, setAccess] = useState(window.localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(window.localStorage.getItem("refresh"));
  const [userType, setUserType] = useState(window.localStorage.getItem("userType"));


  const routes = createBrowserRouter(
    [
      access && refresh && userType ? (
        userType === 'master' ?
        // MasterRootLayouts START
        {
          path: '/',
          element: <RootLayoutMaster setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />, // userType = master bo'lsa RootLayoutMaster ochiladi
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <MasterDashboard />
            }, 
            {
              path: 'staffs',
              element: <ControlStaffs />
            }, 
            {
              path: 'projects',
              element: <MasterProjects />
            }, 
            {
              path: 'status',
              element: <MasterStatus />
            }, 
            {
              path: 'settings',
              element: <MasterSettings />
            }, 
            {
              path: 'logout',
              element: <Logout setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />
            }
          ]
        }
        // MasterRootLayouts END
        :
        // StaffRootLayouts START
        {
          path: '/',
          element: <RootLayoutStaff setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />, // userType = staff bo'lsa RootLayoutStaff ochiladi
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
              element: <Logout setAccess={setAccess} setRefresh={setRefresh} setUserType={setUserType} />
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