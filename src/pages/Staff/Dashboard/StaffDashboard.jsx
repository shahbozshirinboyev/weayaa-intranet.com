import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import http from "../../../services/http";

function StaffDashboard() {
  const [dashboards, setDashboards] = useState([]);
  useEffect(() => {
    http
      .get("users/announcements/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((dashboad) => {
        toast.success("Dashboardga ma'lumotlar yuklandi!");
        setDashboards(dashboad.data.results);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Dashboard ma'lumotlari olinmadi :(");
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">

      {/* Cards map START */}
      {dashboards.map((dashboard) => (
        // {/* CARD 1 START */}
        <div key={dashboard.id} className="bg-custom-green-10 rounded-[20px] p-[15px] text-custom-green-dark relative border border-custom-green-30 group transition-all duration-300 ease-in-out">
          <h2 className="font-bold text-[18px]">
            {dashboard.title}
          </h2>
          <p className="text-justify text-[16px] opacity-90 font-medium pt-[25px] pb-[20px] mb-[25px]">
            {dashboard.description}
          </p>
          <div className="grid grid-cols-2 text-[14px] font-bold absolute inset-x-0 bottom-[15px] mx-[15px]">
            <div className="flex justify-start items-center">
              <span className="mr-[5px]">
                { 
                dashboard.author.image === null 
                ? 
                <i className="bi bi-person-circle text-[20px]"></i> 
                : 
                <img src={dashboard.author.image} className="rounded-full w-[25px] h-[25px]" alt={dashboard.author.first_name} />
                }
              </span>
              <span>
                {dashboard.author.first_name} {dashboard.author.last_name}
              </span>
            </div>
            <div className="text-end flex justify-end items-center">
              <span className="mr-[5px]">
                <i className="bi bi-calendar-week text-[20px]"></i>
              </span>
              <span className="tooltip" data-tip={new Date(dashboard.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}>
                {dashboard.published_at.split('T')[0]}
              </span>
            </div>
          </div>
        </div>
        // {/* CARD 1 END */}
      ))}
      {/* Cards map END */}
      
    </div>
  );
}

export default StaffDashboard;
