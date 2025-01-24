import { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { onDragEnd } from "../helpers/onDragEnd";
import TaskFoother from "./TaskFoother";
import TaskHeader from "./TaskHeader";
import CreateTask from "../components/CreateTask";
import http from "../services/http";
import toast, { Toaster } from "react-hot-toast";
import noneuser from "/img/noneuser.png";
import TaskFileControl from "./TaskFileControl";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";
import TaskChat from "./TaskChat/TaskChat";
import { Fragment } from "react";

function TaskManagement() {
  const [divWidth, setDivWidth] = useState("100%");
  const divRef = useRef(null);
  const [task, setTask] = useState([])

  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        setDivWidth(`${divRef.current.offsetWidth}px`);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    updateWidth(); // Komponent yuklanganda kenglikni olish

    return () => {
      if (divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
    };
  }, []);


  const [divRefNameProject, setDivRefNameProject] = useState("100%");
  const divRefName = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (divRefName.current) {
        setDivRefNameProject(`${divRefName.current.offsetWidth}px`);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (divRefName.current) {
      resizeObserver.observe(divRefName.current);
    }

    updateWidth();

    return () => {
      if (divRefName.current) {
        resizeObserver.unobserve(divRefName.current);
      }
    };
  }, []);

  const userType = localStorage.getItem("userType");
  const [projectsList, setProjectsList] = useState([]);

  // console.log(projectsList)

  const [activeProject, setActiveProject] = useState(
    JSON.parse(localStorage.getItem("activeProject"))
  );
  const [formData, setFormData] = useState({
    projectName: "",
    projectDeadline: "",
  });
  const [membersInfo, setMembersInfo] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(
    activeProject.members ? activeProject.members : []
  );
  // line variables end

  const getProjectsList = () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`, };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        const responseData = response.data;
        const filteredProjects = responseData.filter((project) => project.is_archived === false);
        setProjectsList(filteredProjects);
        if (response.data.length === 0) {
          setActiveProject([]);
          localStorage.setItem("activeProject", JSON.stringify([]));
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getProjectsList();
    // console.log(projectsList)
  }, []);

  // Delete Project function
  const [selectProjectInfo, setSelectProjectInfo] = useState([]);

  const handleDeleteProject = (id) => {
    // console.log(id);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(http.delete(`projects/${id}/`, { headers }), {
      loading: "Deleting ...",
      success: (response) => {
        console.log(response);
        getProjectsList();
        document.getElementById("deleteProjectModal").close();
        if (id === activeProject.id) {
          setActiveProject([]);
          localStorage.setItem("activeProject", JSON.stringify([]));
        }
        return <b>Delete :)</b>;
      },
      error: (error) => {
        console.log(error.response.data);
        return <b>Error :(</b>;
      },
    });
  };
  const [editProjectInfo, setEditProjectInfo] = useState({
    name: "",
    deadline: "",
  });
  useEffect(() => {
    setEditProjectInfo({
      name: selectProjectInfo.name || "",
      deadline: selectProjectInfo.deadline || "",
    });
  }, [selectProjectInfo]);
  const inputHandleProjectInfo = (e) => {
    setEditProjectInfo({
      ...editProjectInfo,
      [e.target.name]: e.target.value,
    });
  };
  const ProjectInfoEdit = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(
      http.patch(
        `projects/${selectProjectInfo.id}/`,
        {
          name: editProjectInfo.name,
          deadline: editProjectInfo.deadline,
        },
        { headers }
      ),
      {
        loading: "Changing ...",
        success: (response) => {
          // console.log(response.data);
          getProjectsList();
          document.getElementById("edit_project").close();
          return <b>Done :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  const moveProjectToArchive = (id) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`, };
    toast.promise(
      http.patch(`projects/${selectProjectInfo.id}/`,
        { is_archived: true, },
        { headers }
      ),
      {
        loading: "Changing ...",
        success: (response) => {
          // console.log(response.data);
          getProjectsList();
          document.getElementById("archiveProjectModal").close();
          if (id === activeProject.id) {
            setActiveProject([]);
            localStorage.setItem("activeProject", JSON.stringify([]));
          }
          return <b>Done :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createProject = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(
      http.post(
        `projects/`,
        {
          name: formData.projectName,
          deadline: formData.projectDeadline,
        },
        { headers }
      ),
      {
        loading: "Adding ...",
        success: (response) => {
          // console.log(response.data);
          getProjectsList();
          setFormData({ projectName: "", projectDeadline: "" });
          document.getElementById("new_project").close();
          return <b>Add :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get("users/staff/", { headers })
      .then((response) => {
        const results = response.data;
        const staffMembers = results.filter(
          (member) => member.user_type === "staff"
        );
        setMembersInfo(staffMembers);
      })
      .catch((error) => {
        toast.error("Something went wrong :(");
        console.log(error.response.data);
      });
  }, [activeProject]);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const submitSelectedUsers = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(
      http.patch(
        `projects/${activeProject.id}/`,
        { members: selectedUsers },
        { headers }
      ),
      {
        loading: "Adding ...",
        success: (response) => {
          console.log(response.data);
          getProjectsList();
          document.getElementById("adduser").close();
          return <b>Add :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  useEffect(() => {
    const activeProjectCheck = JSON.parse(
      localStorage.getItem("activeProject")
    );
    const projectId = activeProjectCheck ? activeProjectCheck.id : null;
    if (projectId !== null) {
      const activeProject = projectsList.find(
        (project) => project.id === projectId
      );
      if (activeProject) {
        setActiveProject(activeProject);
      }
    }
  }, [projectsList]);
  // line functios end

  // ===========> Get ActiveProjectTasks List START <=========== //
  const [activeProjectTasks, setActiveProjectTasks] = useState([]);
  const [columns, setColumns] = useState({
    to_do: {
      name: "To Do",
      items: [],
    },
    in_progress: {
      name: "In Progress",
      items: [],
    },
    review: {
      name: "Review",
      items: [],
    },
    complete: {
      name: "Complete",
      items: [],
    },
  });
  const getActiveProjectTasks = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    // `activeProject` mavjudligini tekshirish
    if (!activeProject || !activeProject.id) {
      // console.error("Active project is not selected or invalid.");
      return; // Agar `activeProject` noto'g'ri bo'lsa, funksiyani to'xtatish
    }
    const activeProjectId = activeProject ? activeProject.id : null;

    if (activeProjectId !== null) {
      http
        .get(`projects/${activeProjectId}/tasks/`, { headers })
        .then((response) => {
          const tasks = response.data;
          // console.log(response.data)
          const updatedBoard = {
            to_do: { ...columns.to_do, items: [] },
            in_progress: { ...columns.in_progress, items: [] },
            review: { ...columns.review, items: [] },
            complete: { ...columns.complete, items: [] },
          };
          tasks.forEach((task) => {
            if (task.status === "todo") {
              updatedBoard.to_do.items.push(task);
            } else if (task.status === "in_progress") {
              updatedBoard.in_progress.items.push(task);
            } else if (task.status === "verification") {
              updatedBoard.review.items.push(task);
            } else if (task.status === "completed") {
              updatedBoard.complete.items.push(task);
            }
          });
          // console.log(updatedBoard);
          setColumns(updatedBoard);
          setActiveProjectTasks(tasks);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  useEffect(() => { getActiveProjectTasks(); }, [activeProject]);
  // ===========> Get ActiveProjectTasks List END <=========== //

  const renderContent = (content) => {
    // Yangi qatorlarni ajratish
    const lines = content.split('\n');

    return lines.map((line, lineIndex) => {
      // Har bir qatorni bo'shliqlarga bo'lish
      const words = line.split(' ');

      return (
        <Fragment key={lineIndex}>
          {words.map((word, wordIndex) => {
            const urlMatch = word.match(/(https?:\/\/[^\s]+)/g);
            if (urlMatch) {
              const url = urlMatch[0];
              const baseUrl = url.split('/').slice(0, 3).join('/'); // Asosiy URL
              const shortUrl = `${baseUrl}/...`; // Qisqartirilgan ko'rinish

              return (
                <Fragment key={`${lineIndex}-${wordIndex}`}>
                  <a href={url} className="text-sky-500" target="_blank" rel="noopener noreferrer">
                    {shortUrl}
                  </a>
                </Fragment>
              );
            }
            // Agar so'z bo'sh bo'lmasa, uni ko'rsatamiz
            if (word.trim()) {
              return (
                <Fragment key={`${lineIndex}-${wordIndex}`}>
                  {word}
                </Fragment>
              );
            }
            // Agar so'z bo'sh bo'lsa, hech narsa qaytarmaymiz
            return null;
          }).reduce((prev, curr) => [prev, ' ', curr])}
          <br /> {/* Har bir qator oxirida <br /> qo'shamiz */}
        </Fragment>
      );
    });
  };

  return (
    <div>
      {/* <Line /> START */}
      <>
        <div className="bg-custom-green-5 h-[60px] max-h-5w-full rounded-[15px] flex gap-2 mb-[20px]">
          <div className="h-full w-full p-2 flex gap-2 items-center">
            {/* Deadline --- start */}
            <button className={`btn btn-sm ${activeProject.deadline ? "" : "hidden"} border-0 rounded-md w-[125px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white cursor-pointer`} >
              <i className="bi bi-calendar2-week font-medium"></i>
              <span className="whitespace-nowrap"> {activeProject.deadline} </span>
            </button>
            {/* Deadline --- end */}

            {/* Add new project --- start */}
            <button
              onClick={() => document.getElementById("new_project").showModal()}
              className={`${userType === "staff" || userType === "client" ? "hidden" : ""} w-[125px] btn btn-sm border-0 rounded-md bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white cursor-pointer`}
            >
              <i className="bi bi-plus-lg font-medium"></i>
              <span className="whitespace-nowrap">New Project</span>
            </button>
            {/* Add new project --- end  */}

            <div ref={divRef} className="relative w-full h-full">
              {/* {divWidth} */}
              <Swiper
                spaceBetween={10}
                slidesPerView={"auto"}
                freeMode={true}
                modules={[FreeMode, Mousewheel]}
                mousewheel={true}
                style={{ width: divWidth }}
                className={` absolute flex top-[6px] left-0 z-10`}
              >
                {projectsList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((project) => (
                  <SwiperSlide
                    key={project.id}
                    onClick={() => { setActiveProject(project); setSelectedUsers(project.members); localStorage.setItem("activeProject", JSON.stringify(project)); }}
                    className={`btn btn-sm border-0 rounded-md bg-custom-green-30 ${project.id === activeProject.id ? "bg-custom-green-dark text-white" : ""} w-auto text-custom-green-dark font-medium hover:bg-custom-green-80 hover:text-white cursor-pointer`}
                  >
                    <button className="flex gap-2">
                      <i className="bi bi-folder flex justify-center items-center"></i>
                      <span>{project.name}</span>
                    </button>
                    <button
                      onClick={() => { document.getElementById("edit_project").showModal(); setSelectProjectInfo(project); }}
                      className={`${userType === "staff" || userType === "client" ? "hidden" : ""} ml-3 border border-custom-green-60 w-[24px] h-[24px] flex justify-center items-center rounded-md hover:border-transparent hover:bg-sky-700 hover:text-white`}
                    >
                      <i className="bi bi-pencil flex justify-center items-center"></i>
                    </button>
                    <button
                      onClick={() => { document.getElementById("deleteProjectModal").showModal(); setSelectProjectInfo(project); }}
                      className={`${userType === "staff" || userType === "client" ? "hidden" : ""} border border-custom-green-60 w-[24px] h-[24px] flex justify-center items-center rounded-md hover:border-transparent hover:bg-red-700 hover:text-white`}
                    >
                      <i className="bi bi-trash flex justify-center items-center"></i>
                    </button>
                    <button
                      onClick={() => { document.getElementById("archiveProjectModal").showModal(); setSelectProjectInfo(project); }}
                      className={`${userType === "staff" || userType === "client" ? "hidden" : ""} border border-custom-green-60 w-[24px] h-[24px] flex justify-center items-center rounded-md hover:border-transparent hover:bg-gray-700 hover:text-white`}
                    >
                      <i className="bi bi-file-earmark-zip flex justify-center items-center"></i>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {activeProject.name && (
            <div className="h-full p-2 flex flex-shrink-0 items-center justify-end">
              {activeProject.members && activeProject.members.length !== 0 && (
                <div
                  onClick={() =>
                    document.getElementById("addedUsersList").showModal()
                  }
                >
                  <div className="flex justify-end items-center">
                    <div className="flex -space-x-4 w-full transition-all duration-300">
                      {activeProject.members.map((memberId) => {
                        const member = membersInfo.find(
                          (m) => m.id === memberId
                        );

                        return member ? (
                          <div
                            key={member.id}
                            className="bg-white rounded-full"
                          >
                            <img
                              src={member.image ? member.image : noneuser} // Use the image URL from the member's info
                              alt={`${member.first_name} ${member.last_name}`}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeProject.members &&
                activeProject.members.length !== 0 &&
                userType !== "staff" &&
                userType !== "client" && (
                  <div className="w-0.5 h-6 rounded-full bg-custom-green-60 mx-1"></div>
                )}

              {userType !== "staff" &&
                userType !== "client" &&
                activeProject.length !== 0 && (
                  <button
                    className="w-8 h-8 bg-custom-green-10 hover:bg-custom-green-dark text-custom-green-90  hover:text-white transition-all duration-300 rounded-full flex items-center justify-center right-3 p-2"
                    onClick={() =>
                      document.getElementById("adduser").showModal()
                    }
                  >
                    <i className="bi bi-plus text-[24px] flex justify-center items-center"></i>
                  </button>
                )}
            </div>
          )}
        </div>
        {/* Add User Modal */}
        <dialog id="adduser" className="modal">
          <Toaster />
          <div className="modal-box p-0">
            {/* Modal header Start */}
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
            >
              <span className="text-custom-green-dark font-bold">
                Add Staff for this Project
              </span>
              <div className="text-end">
                <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </button>
              </div>
            </form>
            {/* Modal header End */}

            <form action="" onSubmit={submitSelectedUsers}>
              <div className="p-4">
                {membersInfo.map((user) => (
                  <div
                    key={user.id}
                    className={`form-control rounded-md px-1 my-2 ${selectedUsers.includes(user.id)
                      ? "bg-custom-green-15"
                      : "bg-transparent"
                      }`}
                  >
                    <label className="cursor-pointer label">
                      <div className="flex">
                        <img
                          src={user.image || noneuser}
                          alt=""
                          className="w-[45px] h-[45px] object-cover rounded-full"
                        />
                        <div className="ml-4">
                          <p className="font-bold text-custom-green-dark">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-custom-green-60">
                            {user.speciality}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        className="checkbox border-custom-green-80 [--chkbg:theme(colors.custom-green-dark)] [--chkfg:white] checked:border-border-custom-green-dark"
                        onChange={() => handleUserSelect(user.id)}
                        checked={selectedUsers.includes(user.id)}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <button
                  type="submit"
                  className="w-full btn bg-custom-green-15 text-custom-green-dark border-transparent hover:text-white hover:bg-custom-green-dark transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* See User Modal */}
        <dialog id="addedUsersList" className="modal">
          <Toaster />
          <div className="modal-box p-0">
            {/* Modal header Start */}
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
            >
              <span className="text-custom-green-dark font-bold">
                Added Users List
              </span>
              <div className="text-end">
                <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </button>
              </div>
            </form>
            {/* Modal header End */}

            <div className="p-3">
              {activeProject.length !== 0 &&
                activeProject.members.map((userId, index) => {
                  const user = membersInfo.find((m) => m.id === userId);

                  return user ? (
                    <div
                      key={index}
                      className={`${selectedUsers.includes(user.id)
                        ? "bg-white"
                        : "bg-transparent"
                        }`}
                    >
                      <label className="label">
                        <div className="flex">
                          {/* Display user image */}
                          <img
                            src={user.image || noneuser}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-[45px] h-[45px] object-cover rounded-full"
                          />
                          <div className="ml-4">
                            {/* Display user first and last name */}
                            <p className="font-bold text-custom-green-dark">
                              {user.first_name} {user.last_name}
                            </p>
                            {/* Display user label */}
                            <p className="text-custom-green-60">{user.label}</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  ) : null;
                })}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* New Project Modal */}
        <dialog id="new_project" className="modal text-custom-green-dark">
          <Toaster />

          <div className="modal-box p-0">
            {/* Modal header Start */}
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
            >
              <span className="text-custom-green-dark font-bold">
                Add News Project
              </span>
              <div className="text-end">
                <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </button>
              </div>
            </form>
            {/* Modal header End */}

            <div className="p-4">
              <form
                action=""
                onSubmit={createProject}
                className="text-custom-green-dark"
              >
                <div className="mt-0">
                  <label className="w-full mt-2">
                    <span className="">Project name:</span>
                    <input
                      type="text"
                      name="projectName"
                      required
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="Title type here"
                      className="border border-custom-green-30 px-3 py-2 w-full placeholder:text-custom-green-60 rounded-md"
                    />
                  </label>
                </div>
                <div className="mt-2">
                  <label className="w-full">
                    <span className="">Project deadline:</span>
                    <input
                      type="date"
                      name="projectDeadline"
                      required
                      value={formData.projectDeadline}
                      onChange={handleChange}
                      placeholder="Title type here"
                      className="border border-custom-green-30 px-3 py-2 w-full placeholder:text-custom-green-60 rounded-md"
                    />
                  </label>
                </div>

                <button className="w-full mt-6 bg-custom-green-15 font-bold text-custom-green-dark py-2 rounded-[10px] hover:bg-custom-green-dark hover:text-white transition-all duration-300">
                  Save
                </button>
              </form>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
      {/* <Line /> END */}

      {activeProject.length === 0 ? (
        <>
          <div className="grid grid-cols-1 justify-center items-center text-custom-green-dark">
            <p
              className={`text-center text-2xl p-4 ${userType === "staff" ? "py-12" : ""
                }`}
            >
              <span className={`${projectsList.length === 0 ? "hidden" : ""}`}>
                <i className="bi bi-folder2-open block text-[65px] mb-2 text-custom-green-80"></i>
                <span>Please, select project.</span>
              </span>
              <span className={`${projectsList.length !== 0 ? "hidden" : ""}`}>
                <i className="bi bi-folder-x block text-[65px] mb-2 text-custom-green-80"></i>
                <span>You have no projects.</span>
              </span>
              <br />
              <span
                className={`text-red-700 text-[16px] ${userType === "staff" || userType === "client" ? "hidden" : ""
                  }`}
              >
                If you don't see any projects, you need to add a new project.
              </span>
            </p>
            {/* progress section -- hali ish bor */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4">
              {projectsList.map((project) => (
                <div
                  className={`flex justify-start items-center border border-custom-green-10 px-2 rounded-lg hover:bg-custom-green-15 ${userType === "staff" ? "py-2" : "py-0"}`}
                  key={project.id}
                >
                  <div
                    onClick={() => { setActiveProject(project); setSelectedUsers(project.members); localStorage.setItem("activeProject", JSON.stringify(project)); }}
                    className="flex-auto font-medium"
                  >
                    <button
                      className={`flex justify-start w-full items-center gap-2 my-[2px] ${project.id === activeProject.id ? "bg-custom-green-15" : ""}`}
                    >
                      <i className="bi bi-folder flex justify-center items-center"></i>
                      <div className="w-full relative flex">
                        <span ref={divRefName} className="whitespace-nowrap truncate text-ellipsis overflow-hidden text-start invisible w-full">{divRefNameProject}</span>
                        <span className="whitespace-nowrap absolute truncate text-ellipsis overflow-hidden text-start w-full">{project.name}</span>
                      </div>
                    </button>
                  </div>
                  <button onClick={() => { document.getElementById("edit_project").showModal(); setSelectProjectInfo(project); }} className={`${userType === "staff" || userType === "client" ? "hidden" : ""} border border-custom-green-10 w-[28px] px-4 py-2 flex justify-center items-center ml-4 m-1 rounded-md hover:border-transparent hover:bg-custom-green-dark hover:text-white transition-all duration-300`} > <i className="bi bi-pencil flex justify-center items-center"></i> </button>
                  <button onClick={() => { document.getElementById("deleteProjectModal").showModal(); setSelectProjectInfo(project); }} className={`${userType === "staff" || userType === "client" ? "hidden" : ""} border border-custom-green-10 w-[28px] px-4 py-2 flex justify-center items-center m-1 mr-0 rounded-md hover:border-transparent hover:bg-red-700 hover:text-white transition-all duration-300`} > <i className="bi bi-trash flex justify-center items-center"></i> </button>
                  <button onClick={() => { document.getElementById("archiveProjectModal").showModal(); setSelectProjectInfo(project); }} className={`${userType === "staff" || userType === "client" ? "hidden" : ""}  border border-custom-green-10 w-[28px] px-4 py-2 flex justify-center items-center m-1 mr-0 rounded-md hover:border-transparent hover:bg-gray-700 hover:text-white transition-all duration-300`} > <i className="bi bi-file-earmark-zip flex justify-center items-center"></i> </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : activeProjectTasks.length === 0 ? (
        <>
          <div className="grid grid-cols-1 justify-center items-center mt-12">
            <p className="text-center text-[65px] text-custom-green-80">
              <i className="bi bi-list-task"></i>
            </p>
            <p className="text-center text-custom-green-dark font-medium text-lg">
              No tasks have been added to the project yet.
            </p>

            <div
              className={`${userType === "staff" || userType === "client" ? "hidden" : ""
                } w-[200px] rounded-lg border border-custom-green-10 mx-auto mt-4`}
            >
              <CreateTask getActiveProjectTasks={getActiveProjectTasks} />
            </div>
          </div>
        </>
      ) : (
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
          <div className="grid grid-cols-4 px-4 bg-custom-green-10 rounded-[15px] gap-4 min-w-[1400px]">
            {Object.entries(columns).map(([columnId, column], index) => (
              <div className="flex flex-col gap-2" key={columnId}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-col gap-3 items-center py-4 w-full" >
                      <div className="flex justify-between p-2 py-[10px] w-full bg-white rounded-lg shadow-sm text-custom-green-dark  text-[15px] font-extrabold">
                        {column.name}
                        <div className="bg-custom-green-30 text-center  text-custom-green-dark rounded-md">
                          <span className="px-2 py-1"> {column.items.length} </span>
                        </div>
                      </div>

                      {index === 0 && userType !== "staff" && (<CreateTask getActiveProjectTasks={getActiveProjectTasks} />)}

                      {column.items && column.items.map((task, index) => (
                        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            // Task START
                            <>
                              <div
                                ref={provided.innerRef}
                                {...(userType !== "client" ? provided.draggableProps : {})}
                                {...(userType !== "client" ? provided.dragHandleProps : {})}
                                className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-lg px-3 py-4"
                              >
                                <div className="w-full">
                                  <TaskHeader task={task} getActiveProjectTasks={getActiveProjectTasks} />
                                </div>

                                <div className="w-full flex items-start flex-col gap-1">
                                  <span className="text-[15.5px] font-medium text-custom-green-90"> {task.name} </span>
                                  <span className="text-[13.5px] text-custom-green-80 break-all"> {renderContent(task.description)} </span>
                                </div>

                                <div className="w-full">
                                  <TaskFileControl fileUrl={task.file} />
                                </div>

                                <div className="w-full flex items-center">
                                  {/* Chat button START */}
                                  <label htmlFor="task_chat" onClick={() => {
                                    try {
                                      setTask(task);
                                    } catch (error) {
                                      console.error("Error opening TaskChat modal:", error); // Log any errors
                                    }
                                  }}>
                                    <div className="flex">
                                      <div className="relative">
                                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center"><i className="bi bi-chat-text"></i></div>
                                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                                      </div>
                                    </div>
                                  </label>
                                  {/* Chat button END */}

                                  <TaskFoother getActiveProjectTasks={getActiveProjectTasks} selectedUsers={selectedUsers} task={task} membersInfo={membersInfo} />
                                </div>
                              </div>
                            </>
                            // Task END
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}

      <dialog id="deleteProjectModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-custom-green-dark text-center">
            Are you sure delete{" "}
            <span className="text-red-700">{selectProjectInfo.name}</span>?
          </h3>
          <div className="flex justify-center items-center gap-12 pt-10">
            <button
              onClick={() => {
                handleDeleteProject(selectProjectInfo.id);
              }}
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-red-700 hover:text-white border-transparent"
            >
              Yes
            </button>
            <button
              onClick={() =>
                document.getElementById("deleteProjectModal").close()
              }
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-custom-green-dark hover:text-white border-transparent"
            >
              No
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="archiveProjectModal" className="modal">
        <Toaster />
        <div className="modal-box">
          <h3 className="font-bold text-lg text-custom-green-dark text-center">
            Are you sure archive{" "}
            <span className="text-red-700">{selectProjectInfo.name}</span>?
          </h3>
          <div className="flex justify-center items-center gap-12 pt-10">
            <button
              onClick={() => { moveProjectToArchive(selectProjectInfo.id); }}
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-red-700 hover:text-white border-transparent"
            >
              Yes
            </button>
            <button
              onClick={() =>
                document.getElementById("archiveProjectModal").close()
              }
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-custom-green-dark hover:text-white border-transparent"
            >
              No
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="edit_project" className="modal text-custom-green-dark">
        <Toaster />

        <div className="modal-box p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Edit Project Info
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          <div className="p-4">
            <form onSubmit={ProjectInfoEdit} className="text-custom-green-dark">
              <div className="mt-0">
                <label className="w-full mt-2">
                  <span className="">Project name:</span>
                  <input
                    type="text"
                    name="name"
                    value={editProjectInfo.name}
                    onChange={inputHandleProjectInfo}
                    placeholder="Title type here"
                    className="border border-custom-green-30 px-3 py-2 w-full placeholder:text-custom-green-60 rounded-md"
                  />
                </label>
              </div>
              <div className="mt-2">
                <label className="w-full">
                  <span className="">Project deadline:</span>
                  <input
                    type="date"
                    name="deadline"
                    value={editProjectInfo.deadline}
                    onChange={inputHandleProjectInfo}
                    placeholder="Title type here"
                    className="border border-custom-green-30 px-3 py-2 w-full placeholder:text-custom-green-60 rounded-md"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-custom-green-15 font-bold text-custom-green-dark py-2 rounded-[10px] hover:bg-custom-green-dark hover:text-white transition-all duration-300"
              >
                Save
              </button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div>
        <TaskChat task={task} />
      </div>
    </div>
  );
}

export default TaskManagement;
