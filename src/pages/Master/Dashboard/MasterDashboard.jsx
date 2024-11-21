// React
import { useState, useEffect, useRef } from "react";
// React hot toast
import toast, { Toaster } from "react-hot-toast";
// API
import http from "../../../services/http";
// Date - Luxon
import { DateTime } from "luxon";

function MasterDashboard() {
  const [dashboards, setDashboards] = useState([]);
  const access = localStorage.getItem("access");
  const headers = { Authorization: `Bearer ${access}` };

  // Reusable function for fetching dashboards
  const fetchDashboards = () => {
    http
      .get("users/announcements/", { headers })
      .then((response) => {
        setDashboards(response.data.results);
        // toast.success("Dashboardga ma'lumotlar yuklandi :)");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error :(");
      });
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  const newDashboardTitle = useRef(null);
  const newDashboardDescription = useRef(null);

  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const dashboardUserInfo = () => {
    http
      .get("users/profile/", { headers })
      .then((response) => {
        // toast.success("Xabar yaratuvchi ma'lumotlari yuklandi :)");
        setUserFirstName(response.data.first_name);
        setUserLastName(response.data.last_name);
        setUserImage(response.data.image);
      })
      .catch((error) => {
        toast.error("Error :(");
        console.log(error);
      });
  };

  const createNewDashboard = (e) => {
    e.preventDefault();

    document.getElementById("add_new_news").close();

    toast.promise(
      http.post(
        "users/announcements/",
        {
          title: newDashboardTitle.current.value,
          description: newDashboardDescription.current.value,
        },
        { headers }
      ),

      {
        loading: "Adding ...",

        success: (response) => {
          console.log(response);

          newDashboardTitle.current.value = "";
          newDashboardDescription.current.value = "";
          fetchDashboards();

          return <b>Added News :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  const deleteDashboard = (id) => {
    http
      .delete(`users/announcements/${id}/`, { headers })
      .then((response) => {
        toast("Delete :(", { icon: "🗑️" });
        fetchDashboards();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Dashboardni o'chirishda muammo paydo bo'ldi :(");
      });
  };

  const [editorDashAuthorId, setEditorDashAuthorId] = useState("");
  const [editorDashAuthorFirstName, setEditorDashAuthorFirstName] =
    useState("");
  const [editorDashAuthorLastName, setEditorDashAuthorLastName] = useState("");
  const [editorDashAuthorImage, setEditorDashAuthorImage] = useState("");
  const [editorDashDate, setEditorDashDate] = useState("");
  const [editorDashTitle, setEditorDashTitle] = useState("");
  const [editorDashDescription, setEditorDashDescription] = useState("");

  const editDashboard = (id) => {
    const editDash = dashboards.find((item) => item.id === id);
    setEditorDashAuthorId(editDash.id);
    setEditorDashAuthorFirstName(editDash.author.first_name);
    setEditorDashAuthorLastName(editDash.author.last_name);
    setEditorDashAuthorImage(editDash.author.image);
    setEditorDashDate(editDash.published_at.split("T")[0]);
    setEditorDashTitle(editDash.title);
    setEditorDashDescription(editDash.description);
  };

  const editDashboardTitle = useRef(null);
  const editDashboardDescription = useRef(null);

  const editOldDashboard = (e) => {
    e.preventDefault();
    document.getElementById("edit_news").close();
    http
      .patch(
        `users/announcements/${editorDashAuthorId}/`,
        {
          title: editDashboardTitle.current.value,
          description: editDashboardDescription.current.value,
        },
        { headers }
      )
      .then((response) => {
        // editDashboardTitle.current.value ='';
        // editDashboardDescription.current.value ='';
        // fetchDashboards();
        toast.success("Dashboard yangilandi :)");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Dashboard yangilanmadi :(");
      });
  };

  return (
    <>
      <div className="bg-custom-green-5 h-[60px] w-full rounded-[15px] flex mb-[20px] justify-end">
        {/* Add new card start */}
        <button
          className="bg-custom-green-15 text-custom-green-dark hover:bg-custom-green-dark hover:text-white font-medium transition-all duration-300 flex justify-center items-center px-2 py-1 rounded-[10px] cursor-pointer mx-2 my-3"
          onClick={() => {
            document.getElementById("add_new_news").showModal();
            dashboardUserInfo();
          }}
        >
          <i className="bi bi-plus-lg flex justify-center items-center p-1"></i>{" "}
          &nbsp; <span className="pr-1">Add Dashboard</span>
        </button>

        <dialog id="add_new_news" className="modal">
          <Toaster />
          <div className="modal-box !p-0">
            {/* Modal header Start */}
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
            >
              <span className="text-custom-green-dark font-bold">Add News</span>
              <div className="text-end">
                <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </button>
              </div>
            </form>
            {/* Modal header End */}

            <div className="">
              <div className=" mb-0 flex justify-between items-center my-4 gap-2 p-2">
                <div className="flex items-center space-x-2 border border-custom-green-30 rounded-lg px-2 py-2 w-full">
                  {userImage === null ? (
                    <i className="bi bi-person-circle text-[25px] text-custom-green-dark "></i>
                  ) : (
                    <img
                      src={userImage}
                      alt={userFirstName}
                      className="w-[35px] h-[35px] object-cover rounded-full"
                    />
                  )}

                  <div>
                    <p className="text-xs text-custom-green-80 ">
                      Publishing by:
                    </p>
                    <p className="font-semibold text-custom-green-dark">
                      {userFirstName} {userLastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border border-custom-green-30 rounded-lg px-2 py-2 w-full ">
                  <i className="bi bi-calendar-week text-custom-green-dark text-[19px]  border  border-custom-green-dark rounded-full px-2 py-1 "></i>

                  <div>
                    <p className="text-xs text-custom-green-80">
                      Publishing date:
                    </p>
                    <p className="font-semibold text-custom-green-dark">
                      {DateTime.now().toFormat("d MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={createNewDashboard}>
                <div className="mb-0 p-2">
                  <label
                    className="block text-custom-green-80 font-semibold mb-1"
                    htmlFor="title"
                  >
                    Title:
                  </label>
                  <input
                    ref={newDashboardTitle}
                    id="title"
                    type="text"
                    required
                    className="w-full border font-bold border-custom-green-30 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"
                  />
                </div>

                <div className="mb-0 p-2">
                  <label
                    className="block text-custom-green-80 font-semibold mb-1"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <textarea
                    ref={newDashboardDescription}
                    id="description"
                    rows="4"
                    required
                    className="w-full border border-custom-green-30  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"
                  ></textarea>
                </div>

                <div className="flex justify-end p-2">
                  <button className="text-white font-semibold py-2 w-full  rounded-lg bg-custom-green-90 hover:bg-custom-green-dark flex items-center justify-center space-x-2">
                    <i className="bi bi-file-arrow-up text-[19px] "></i>
                    <span>Publish</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Add new card end */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {/* Cards map START */}
        {dashboards.map((dashboard) => (
          // {/* CARD 1 START */}
          <div
            key={dashboard.id}
            className="bg-custom-green-10 rounded-[20px] p-[15px] text-custom-green-dark relative group transition-all duration-300 ease-in-out"
          >
            <h2 className="font-bold text-[18px]">{dashboard.title}</h2>
            <p className="text-justify text-[16px] opacity-90 font-medium pt-[25px] pb-[20px] mb-[25px]">
              {dashboard.description}
            </p>
            <div className="grid grid-cols-2 text-[14px] font-bold absolute inset-x-0 bottom-[15px] mx-[15px]">
              <div className="flex justify-start items-center">
                <span className="mr-[5px]">
                  {dashboard.author.image === null ? (
                    <i className="bi bi-person-circle text-[20px]"></i>
                  ) : (
                    <img
                      src={dashboard.author.image}
                      className="rounded-full w-[25px] h-[25px] object-cover"
                      alt={dashboard.author.first_name}
                    />
                  )}
                </span>
                <span className="whitespace-nowrap">
                  {dashboard.author.first_name} {dashboard.author.last_name}
                </span>
              </div>
              <div className="text-end flex justify-end items-center">
                <span className="mr-[5px]">
                  <i className="bi bi-calendar-week text-[20px]"></i>
                </span>
                <span
                  className="tooltip"
                  data-tip={new Date(dashboard.published_at).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit", hour12: true }
                  )}
                >
                  {dashboard.published_at.split("T")[0]}
                </span>
              </div>
            </div>
            {/* Card Hover Section Start */}
            <div className="absolute w-full h-full inset-x-0 top-0 rounded-[20px] bg-custom-green-60 text-center hidden group-hover:block transition-all duration-300 ease-in-out">
              <div className="flex justify-center items-center h-full text-white">
                <button
                  onClick={() => {
                    editDashboard(dashboard.id);
                    document.getElementById("edit_news").showModal();
                  }}
                  className="w-[70px] h-[70px] rounded-[10px] mx-[40px] bg-custom-green-dark text-[20px] hover:text-[25px] hover:border-[2px] transition-all duration-75 ease-in-out"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  onClick={() => document.getElementById(`my_delete_${dashboard.id}`).showModal()}
                  className="w-[70px] h-[70px] rounded-[10px] mx-[40px] bg-custom-green-dark text-[20px] hover:text-[25px] hover:border-[2px] transition-all duration-75 ease-in-out"
                >
                  <i className="bi bi-trash3 flex justify-center items-center"></i>
                </button>
              </div>
            </div>
            {/* Card Hover Section End */}
            {/* Delete Dashboard Modal START */}
            <dialog id={`my_delete_${dashboard.id}`} className="modal overflow-hidden">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete</h3>
                <p className="py-4">
                  Are you sure you want to delete this news?
                </p>
                <div className="modal-action flex justify-center items-center">
                  <button
                    onClick={() => {
                      deleteDashboard(dashboard.id);
                    }}
                    className="btn w-[70px] hover:text-white hover:bg-custom-green-dark bg-custom-green-30 text-custom-green-dark"
                  >
                    Yes
                  </button>
                  <form method="dialog">
                    <button className="btn w-[70px] hover:text-white hover:bg-custom-green-dark bg-custom-green-30 text-custom-green-dark">
                      No
                    </button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            {/* Delete Dashboard Modal END */}
          </div>
          // {/* CARD 1 END */}
        ))}
        {/* Cards map END */}

        {/* Edit Modal START */}
        <dialog id="edit_news" className="modal">
          <Toaster />
          <div className="modal-box !p-0">
            {/* Modal header Start */}
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
            >
              <span className="text-custom-green-dark font-bold">
                Edit News
              </span>
              <div className="text-end">
                <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </button>
              </div>
            </form>
            {/* Modal header End */}

            <div className=" mb-0 flex justify-between items-center my-4 gap-2 p-2">
              <div className="flex items-center space-x-2 border border-custom-green-dark rounded-lg px-2 py-2 w-full">
                {editorDashAuthorImage === null ? (
                  <i className="bi bi-person-circle text-[25px] text-custom-green-dark "></i>
                ) : (
                  <img
                    src={editorDashAuthorImage}
                    alt={editorDashAuthorFirstName}
                    className="w-[35px] h-[35px] object-cover rounded-full"
                  />
                )}

                <div>
                  <p className="text-xs text-custom-green-80 ">
                    Publishing by:
                  </p>
                  <p className="font-semibold text-custom-green-dark">
                    {editorDashAuthorFirstName} {editorDashAuthorLastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 border border-custom-green-dark rounded-lg px-2 py-2 w-full ">
                <i className="bi bi-calendar-week text-custom-green-dark text-[19px]  border  border-custom-green-dark rounded-full px-2 py-1 "></i>

                <div>
                  <p className="text-xs text-custom-green-80">
                    Publishing date:
                  </p>
                  <p className="font-semibold text-custom-green-dark">
                    {editorDashDate}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={editOldDashboard}>
              <div className="mb-0 p-2">
                <label
                  className="block text-custom-green-80 font-semibold mb-1"
                  htmlFor="title"
                >
                  Title:
                </label>
                <input
                  ref={editDashboardTitle}
                  defaultValue={editorDashTitle}
                  id="title"
                  type="text"
                  required
                  className="w-full border font-bold border-custom-green-dark rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"
                />
              </div>

              <div className="mb-0 p-2">
                <label
                  className="block text-custom-green-80 font-semibold mb-1"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  ref={editDashboardDescription}
                  defaultValue={editorDashDescription}
                  id="description"
                  rows="4"
                  required
                  className="w-full border border-custom-green-dark  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"
                ></textarea>
              </div>

              <div className="flex justify-end p-2">
                <button className="text-white font-semibold py-3 w-full  rounded-lg bg-custom-green-90 hover:bg-custom-green-dark flex items-center justify-center space-x-2">
                  <i className="bi bi-file-arrow-up text-[19px] "></i>
                  <span>Republish</span>
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* Edit Modal END */}
      </div>
    </>
  );
}

export default MasterDashboard;
