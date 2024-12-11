import React from "react";
import CustomerNavbar from "./Navbar/CustomerNavbar";
import NoProject from "./NoProject";
import ProjectsList from "./ProjectsList";

function CustomerDashboard() {
  return (
    <section className="w-full h-screen border-4 border-red-700 flex flex-col">
      <div className="flex-none">
        <CustomerNavbar />
      </div>

      <div className="flex-grow mx-5 mb-5 border border-sky-500 overflow-hidden overflow-y-auto">
        <ProjectsList />
        {/* <NoProject /> */}
      </div>
    </section>
  );
}

export default CustomerDashboard;
