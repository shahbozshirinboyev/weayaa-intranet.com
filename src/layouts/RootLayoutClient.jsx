import { Outlet } from "react-router-dom";
import CustomerNavbar from "../pages/Customer/Navbar/CustomerNavbar";

function RootLayoutClient() {
  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex-none">
        <CustomerNavbar />
      </div>

      <div className="flex-grow mx-5 mb-5 overflow-hidden overflow-y-auto">
        <Outlet />
      </div>
    </section>
  );
}

export default RootLayoutClient;
