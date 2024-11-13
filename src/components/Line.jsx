import { useEffect, useState } from "react";
// http
import http from "../services/http";
// react hot toast
import toast, { Toaster } from "react-hot-toast";
// nonuser img
import noneuser from "/img/noneuser.png";

const Line = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [activeProject, setActiveProject] = useState(JSON.parse(localStorage.getItem("activeProject")));
  const [formData, setFormData] = useState({ projectName: "", projectDeadline: "", });
  const [membersInfo, setMembersInfo] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState( activeProject.members ? activeProject.members : "" );
  
  const getProjectsList = () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}` };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        setProjectsList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getProjectsList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createProject = (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}` };
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
          console.log(response.data);
          getProjectsList();
          setFormData({
            projectName: "",
            projectDeadline: "",
          });
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
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}` }
    http
      .get("users/staff/", { headers })
      .then((response) => { setMembersInfo(response.data.results); })
      .catch((error) => {
        toast.error("Something went wrong :(");
        console.log(error.response.data);
      });
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const submitSelectedUsers = (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`}
    toast.promise(
      http.patch(
        `projects/${activeProject.id}/`,
        { members: selectedUsers, },
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

  return (
    <>
      <div className="bg-custom-green-5 h-[60px] w-full rounded-[15px] flex mb-[20px]">
        <div className="h-full w-full flex items-center ml-[10px] relative">
          <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
            <i className="bi bi-calendar2-week font-medium"></i>
            <p className="ml-[10px]">{activeProject.deadline}</p>
          </div>

          <div className="dropdown text-custom-green-dark">
            <div
              tabIndex={0}
              role="button"
              className="border bg-custom-green-30 text-custom-green-dark px-2 py-1 rounded-[10px] m-1"
            >
              <i className="bi bi-folder2-open"></i> &nbsp; {activeProject.name}{" "}
              &nbsp; <i className="bi bi-caret-down"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
            >
              <li
                onClick={() =>
                  document.getElementById("new_project").showModal()
                }
                className="bg-custom-green-15 rounded-[10px] mb-[10px] text-custom-green-dark font-semibold hover:bg-custom-green-dark hover:text-white transition-all duration-300"
              >
                <button>
                  <i className="bi bi-plus-lg flex justify-center items-center"></i>{" "}
                  <span className="whitespace-nowrap">Add new project</span>
                </button>
              </li>
              {/* All Project list ===============> start */}
              {projectsList.map((project) => (
                <li
                  key={project.id}
                  onClick={() => {
                    setActiveProject(project);
                    setSelectedUsers(project.members);
                    localStorage.setItem(
                      "activeProject",
                      JSON.stringify(project)
                    );
                  }}
                >
                  <button className="whitespace-nowrap hover:bg-custom-green-15">
                    {" "}
                    <i className="bi bi-folder flex justify-center items-center"></i>{" "}
                    &nbsp; {project.name}
                  </button>
                </li>
              ))}
              {/* All Project list ===============> end */}
            </ul>
          </div>
        </div>

        <div className="flex h-full w-full p-2 items-center justify-end">
          <button
            onClick={() =>
              document.getElementById("addedUsersList").showModal()
            }
          >
            <div className="flex justify-end ">
              <div className="flex -space-x-4 w-full">
                {activeProject.members && activeProject.members.length !== 0 ? (
                  activeProject.members.map((memberId) => {
                    const member = membersInfo.find((m) => m.id === memberId);

                    return member ? (
                      <div key={member.id} className="bg-white rounded-full">
                        <img
                          src={member.image ? member.image : noneuser} // Use the image URL from the member's info
                          alt={`${member.first_name} ${member.last_name}`}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      </div>
                    ) : null;
                  })
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex justify-center items-center">
                    <span className="text-[12px] font-semibold text-custom-green-80">
                      <i className="bi bi-people text-[15px]"></i>
                    </span>
                  </div>
                )}
                {/* <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex justify-center items-center">
                  <span className="text-[12px] font-semibold text-custom-green-80">
                    +2
                  </span>
                </div> */}
              </div>
            </div>
          </button>

          <div className="w-0.5 h-6 bg-custom-green-60 mx-1"></div>

          <button
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center right-3 p-2"
            onClick={() => document.getElementById("adduser").showModal()}
          >
            <i className="bi bi-plus text-[24px] text-custom-green-80"></i>
          </button>
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
                    className={`form-control rounded-md px-1 my-2 ${
                      selectedUsers.includes(user.id)
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
                        className="checkbox checkbox-success"
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
              {activeProject.members && activeProject.members.length !== 0 ? (
                activeProject.members.map((userId, index) => {
                  // Find the member info by matching the id
                  const user = membersInfo.find((m) => m.id === userId);

                  return user ? (
                    <div
                      key={index}
                      className={`${
                        selectedUsers.includes(user.id)
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
                  ) : null; // If user not found, return null
                })
              ) : (
                <div className="grid grid-cols-1 text-center p-10 text-custom-green-80 select-none">
                  <i className="bi bi-people text-[35px]"></i>
                  <p className="text-[18px]">
                    No Staff has been selected for Project yet.
                  </p>
                </div>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

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
  );
};

export default Line;
