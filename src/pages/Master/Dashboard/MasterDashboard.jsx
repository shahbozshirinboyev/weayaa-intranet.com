import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import http from "../../../services/http";
import { DateTime } from "luxon";
import { Fragment } from "react";
import noneuser from "/img/noneuser.png";

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
        // toast.error("Error :(");
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

  const renderContent = (content) => {
    // Yangi qatorlarni ajratish
    const lines = content.split("\n");

    return lines.map((line, lineIndex) => {
      // Har bir qatorni bo'shliqlarga bo'lish
      const words = line.split(" ");

      return (
        <Fragment key={lineIndex}>
          {words
            .map((word, wordIndex) => {
              const urlMatch = word.match(/(https?:\/\/[^\s]+)/g);
              if (urlMatch) {
                const url = urlMatch[0];
                const baseUrl = url.split("/").slice(0, 3).join("/"); // Asosiy URL
                const shortUrl = `${baseUrl}/...`; // Qisqartirilgan ko'rinish

                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>
                    <a
                      href={url}
                      className="text-sky-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortUrl}
                    </a>
                  </Fragment>
                );
              }
              // Agar so'z bo'sh bo'lmasa, uni ko'rsatamiz
              if (word.trim()) {
                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>{word}</Fragment>
                );
              }
              // Agar so'z bo'sh bo'lsa, hech narsa qaytarmaymiz
              return null;
            })
            .reduce((prev, curr) => [prev, " ", curr])}
          <br /> {/* Har bir qator oxirida <br /> qo'shamiz */}
        </Fragment>
      );
    });
  };

  return (
    <>
      <div className="bg-custom-green-10 h-[50px] w-full rounded-[10px] p-2 mb-[20px] flex justify-end items-center">
        <button
          onClick={() => {
            document.getElementById("add_new_news").showModal();
            dashboardUserInfo();
          }}
          className="btn btn-sm border-0 bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark"
        >
          <i className="bi bi-plus-lg flex justify-center items-center"></i>
          <span className="pr-1">Add Dashboard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cards map START */}
        {dashboards.map((dashboard) => (
          // {/* CARD 1 START */}
          <div
            key={dashboard.id}
            className="bg-custom-green-10 rounded-[10px] p-4 text-custom-green-dark relative group transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-center text-[16px] font-bold mb-4">
                  <span className="line-clamp-1">{dashboard.title}</span>
                  <div className="flex justify-center items-center text-white gap-3">
                    <button
                      onClick={() => {
                        editDashboard(dashboard.id);
                        document.getElementById("edit_news").showModal();
                      }}
                      className="btn btn-sm bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark border-0"
                    >
                      <i className="bi bi-pencil flex justify-center items-center"></i>
                    </button>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`my_delete_${dashboard.id}`)
                          .showModal()
                      }
                      className="btn btn-sm bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark border-0"
                    >
                      <i className="bi bi-trash3 flex justify-center items-center"></i>
                    </button>
                  </div>
                </div>

                <span className="text-justify h-full text-[15px] opacity-90 font-semibold">
                  {renderContent(dashboard.description)}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px] font-bold mt-4">
                <div className="flex justify-start items-center gap-2">
                  <img
                    src={dashboard.author.image || noneuser}
                    className="w-[25px] h-[25px] object-cover rounded-full"
                    alt={dashboard.author.first_name}
                  />
                  <span className="whitespace-nowrap">
                    {dashboard.author.first_name} {dashboard.author.last_name}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <i className="bi bi-calendar3"></i>
                  <span
                    className="tooltip"
                    data-tip={new Date(
                      dashboard.published_at
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  >
                    {dashboard.published_at.split("T")[0]}{" "}
                  </span>
                </div>
              </div>
            </div>

            {/* Delete Dashboard Modal START */}
            <dialog
              id={`my_delete_${dashboard.id}`}
              className="modal overflow-hidden"
            >
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
          <div className="modal-box !p-0 max-w-2xl">
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
            <div className="p-4">
            <div className="flex justify-between items-center gap-2 mb-2">
              <div className="flex items-center space-x-2 border border-custom-green-dark rounded-lg px-2 py-2 w-full">
                <img
                  src={editorDashAuthorImage || noneuser}
                  alt={editorDashAuthorFirstName}
                  className="w-[35px] h-[35px] object-cover rounded-full"
                />

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
              <div className="mb-2">
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

              <div className="mb-2">
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
                  rows="7"
                  required
                  className="w-full border border-custom-green-dark  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"
                ></textarea>
              </div>

              <button className="btn border-0 btn-md w-full bg-custom-green-10 text-custom-green-dark hover:text-white hover:bg-custom-green-dark">
                  <i className="bi bi-file-arrow-up text-[19px] "></i>
                Publish
              </button>
            </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* Edit Modal END */}
      </div>
      <dialog id="add_new_news" className="modal">
        <Toaster />
        <div className="modal-box !p-0 max-w-2xl">
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

          <div className="p-4">

            <div className="flex justify-between items-center gap-2 mb-2">
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
              <div className="mb-2">
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

              <div className="mb-2">
                <label
                  className="block text-custom-green-80 font-semibold mb-1"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  ref={newDashboardDescription}
                  id="description"
                  rows="7"
                  required
                  className="w-full border border-custom-green-30  rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-custom-green-dark text-custom-green-dark"
                ></textarea>
              </div>

              
              <button className="btn border-0 btn-md w-full bg-custom-green-10 text-custom-green-dark hover:text-white hover:bg-custom-green-dark">
                  <i className="bi bi-file-arrow-up text-[19px] "></i>
                Publish
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default MasterDashboard;
