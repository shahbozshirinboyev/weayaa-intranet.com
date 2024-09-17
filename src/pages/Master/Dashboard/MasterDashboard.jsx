import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

// API
import http from "../../../services/http";

// Date - Luxon
import { DateTime } from "luxon";

function MasterDashboard() {

  const [dashboards, setDashboards] = useState([]);

  const newDashboardTitle = useRef(null);
  const newDashboardDescription = useRef(null);

  const [userFirstName, setUserFirstName] = useState(null)
  const [userLastName, setUserLastName] = useState(null)
  const [userImage, setUserImage] = useState(null)

  const dashboardUserInfo = () =>  {
    http.get("users/profile/", {
      headers: {'Authorization': `Bearer ${localStorage.getItem('access')}`}
    })
    .then((r) => {
      toast.success("Xabar yaratuvchi ma'lumotlari yuklandi :)");
      setUserFirstName(r.data.first_name)
      setUserLastName(r.data.last_name)
      setUserImage(r.data.image)
    })
    .catch((error) => {
      toast.error("Xabar yaratuvchi ma'lumotlari yuklanmadi :(");
    });
  }

  const createNewDashboard = (e) => {
    e.preventDefault();
    document.getElementById("add_new_news").close();
    http
      .post("users/announcements/", {
        "title": newDashboardTitle.current.value,
        "description": newDashboardDescription.current.value
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((results) => {
        newDashboardTitle.current.value = '';
        newDashboardDescription.current.value = '';
        toast.success("Dashboard yuklandi :)");
        // console.log(results);
        http
      .get("users/announcements/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((dashboads) => {
        // toast.success("Dashboardga ma'lumotlar yuklandi!");
        setDashboards(dashboads.data.results);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Dashboard ma'lumotlari olinmadi :(");
      });

      })
      .catch((error) => {
        toast.error("Dashboardga yuklashda xatolik :(");
      });
  }
  
  useEffect(() => {
    http
      .get("users/announcements/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((dashboads) => {
        toast.success("Dashboardga ma'lumotlar yuklandi!");
        setDashboards(dashboads.data.results);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Dashboard ma'lumotlari olinmadi :(");
      });
  }, []);

  const deleteDashboard = (id) => {
    http
      .delete(`users/announcements/${id}/`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }, })
      .then((result) => {
        toast('Delete :(', { icon: '🗑️' });
        // setDashboards(result);
        // kod takrorlanayabdi START
        http
        .get("users/announcements/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        })
        .then((dashboads) => {
          // toast.success("Dashboardga ma'lumotlar yuklandi!");
          setDashboards(dashboads.data.results);
        })
        .catch((error) => {
          console.log(error);
          // toast.error("Dashboard ma'lumotlari olinmadi :(");
        });
        // kod takrorlanayabdi END
      })
      .catch((error) => {
        console.log(error);
        toast.error("Dashboardni o'chirishda muammo paydo bo'ldi :(");
      });
  }

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
           {/* Card Hover Section Start */}
           <div className="absolute w-full h-full inset-x-0 top-0 rounded-[20px] bg-custom-green-60 text-center hidden group-hover:block transition-all duration-300 ease-in-out">
          <div className="flex justify-center items-center h-full text-white">
            <button className="w-[70px] h-[70px] rounded-[10px] mx-[40px] bg-custom-green-dark text-[20px] hover:text-[25px] hover:border-[2px] transition-all duration-75 ease-in-out">
              <i className="bi bi-pencil"></i>
            </button>

            <button onClick={() => {deleteDashboard(dashboard.id)}} className="w-[70px] h-[70px] rounded-[10px] mx-[40px] bg-custom-green-dark text-[20px] hover:text-[25px] hover:border-[2px] transition-all duration-75 ease-in-out">
              <i className="bi bi-trash3"></i>
            </button>
          </div>
          </div>
          {/* Card Hover Section End */}
        </div>
        // {/* CARD 1 END */}
      ))}
      {/* Cards map END */}

      {/* Add new card start */}
      <button
        className="group bg-custom-green-10 hover:bg-custom-green-15 transition-all rounded-[20px] cursor-pointer border-[3px] border-dashed border-custom-green-60"
        onClick={() => {document.getElementById("add_new_news").showModal(); dashboardUserInfo()}}
      >
        <div className="flex items-center justify-center h-full w-full">
          <i className="bi bi-plus-circle text-[30px] group-hover:text-[35px] transition-all text-custom-green-60"></i>
        </div>
      </button>

      <dialog id="add_new_news" className="modal">
        <Toaster />
        <div className="modal-box !p-0">

          <div className="bg-custom-green-10 w-full p-4 rounded-t-lg flex  items-center border-b border-custom-green-dark">
            <h2 className="text-lg font-semibold text-custom-green-dark">Add News</h2>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-4 text-custom-green-dark">
                <i className="bi bi-x-lg"></i>
              </button>
            </form>
          </div>

          <div className=" mb-0 flex justify-between items-center my-4 gap-2 p-2">
            <div className="flex items-center space-x-2 border border-custom-green-dark rounded-lg px-2 py-2 w-full" >
              {
                userImage === null
                ?
                <i className="bi bi-person-circle text-[25px] text-custom-green-dark "></i>
                :
                <img src={userImage} alt={userFirstName} className="w-[35px] h-[35px] rounded-full" />
              }
             

              <div>
                <p className="text-xs text-custom-green-80 ">Publishing by:</p>
                <p className="font-semibold text-custom-green-dark">{userFirstName} {userLastName}</p>
              </div>

            </div>

            <div className="flex items-center space-x-2 border border-custom-green-dark rounded-lg px-2 py-2 w-full ">
            <i className="bi bi-calendar-week text-custom-green-dark text-[19px]  border  border-custom-green-dark rounded-full px-2 py-1 "></i>

              <div>
                <p className="text-xs text-custom-green-80">Publishing date:</p>
                <p className="font-semibold text-custom-green-dark">Today: {DateTime.now().toFormat("d MMM yyyy")}</p>
              </div>

            </div>
          </div>

          <form action="" onSubmit={createNewDashboard}>

          <div className="mb-0 p-2">
            <label className="block text-custom-green-80 font-semibold mb-1" htmlFor="title">Title:</label>
            <input ref={newDashboardTitle} id="title" type="text" required className="w-full border font-bold border-custom-green-dark rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark" />
          </div>

          <div className="mb-0 p-2">
            <label className="block text-custom-green-80 font-semibold mb-1" htmlFor="description">Description:</label>
            <textarea ref={newDashboardDescription} id="description" rows="4" required className="w-full border border-custom-green-dark  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"></textarea>
          </div>

          <div className="flex justify-end p-2">
            <button className="text-white font-semibold py-3 w-full  rounded-lg bg-custom-green-90 hover:bg-custom-green-dark flex items-center justify-center space-x-2">
            <i className="bi bi-file-arrow-up text-[19px] "></i>
              <span>Publish</span>
            </button>
          </div>
          </form>

        </div>
      </dialog>

      {/* Add new card end */}

    </div>
  );
}

export default MasterDashboard;
