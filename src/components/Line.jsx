import React, { useEffect, useState } from "react";

// http
import http from "../services/http";

// react hot toast
import toast from "react-hot-toast";

// ==================================================== >

import Avatar1 from "../../public/img/background.png";
import Avatar2 from "../../public/img/background.png";
import Avatar3 from "../../public/img/background.png";
import AddLineSecond from "./AddLineSecond";

const usersData = [
  {
    name: "Zerda Jursinova",
    role: "Front-end",
    image: "https://picsum.photos/id/1/300/300",
    id: 1,
  },
  {
    name: "Shahboz Shirinboyev",
    role: "Designer",
    image: "https://picsum.photos/id/2/300/300",
    id: 2,
  },
  {
    name: "Subhiddin Nuriddinov",
    role: "iOS Developer",
    image: "https://picsum.photos/id/3/300/300",
    id: 3,
  },
  {
    name: "Subhiddin Ergasher",
    role: "Designer",
    image: "https://picsum.photos/id/4/300/300",
    id: 4,
  },
  {
    name: "Oktamjon Dilbarov",
    role: "Back-End",
    image: "https://picsum.photos/id/5/300/300",
    id: 5,
  },
];

const avatars = [
  { id: 1, imgSrc: Avatar1 },
  { id: 2, imgSrc: Avatar2 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
  { id: 3, imgSrc: Avatar3 },
];

const Line = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [activeProject, setActiveProject] = useState(JSON.parse(localStorage.getItem("activeProject")));

  const getProjectsList = () => {
    toast.promise(
      http.get(`projects/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      }),
      {
        loading: "Loading ...",
        success: (response) => {
          setProjectsList(response.data);
          // setActiveProject(response.data[0]);
          console.log(response.data);
          return <b>Success :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);

          return <b>Error :(</b>;
        },
      }
    );
  };
  useEffect(() => {
    getProjectsList();
  }, []);

  const [formData, setFormData] = useState({
    projectName: "",
    projectDeadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createProject = (e) => {
    e.preventDefault();
    toast.promise(
      http.post(
        `projects/`,
        {
          name: formData.projectName,
          deadline: formData.projectDeadline,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      ),
      {
        loading: "Adding ...",
        success: (response) => {
          console.log(response.data);
          getProjectsList();
          return <b>Add :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);

          return <b>Error :(</b>;
        },
      }
    );
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formattedDate = new Date().toLocaleDateString();

  return (
    <>
      <div className="bg-custom-green-5 h-[60px] w-full rounded-[15px] flex mb-[20px] text-[14px]">
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
                  <i className="bi bi-plus-lg flex justify-center items-center"></i> Add new project
                </button>
              </li>
              {/* All Project list ===============> start */}
              {projectsList.map((project, index) => (
                <li
                  key={project.id}
                  onClick={() => {
                    setActiveProject(project);
                    localStorage.setItem("activeProject", JSON.stringify(project))
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
                {activeProject.members && activeProject.members.length !== 0 ? avatars.map((avatar) => (
                  <img
                    key={avatar.id}
                    src={avatar.imgSrc}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                )) : 
                <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex justify-center items-center">
                  <span className="text-[12px] font-semibold text-custom-green-80">
                    <i className="bi bi-people text-[15px]"></i>
                  </span>
                </div>}
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
          <div className="modal-box p-0">
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] flex items-center justify-between px-[20px] bg-custom-green-10 w-full"
            >
              <span className="text-custom-green-dark font-bold">
                Project Users{" "}
              </span>
              <button className="btn btn-sm border-0 btn-circle text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                ✕
              </button>
              <span className="sr-only">Close modal</span>
            </form>

            <div className="p-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`form-control rounded-md px-1 my-2 ${
                    selectedUsers.includes(user.id)
                      ? "bg-custom-green-30"
                      : "bg-transparent"
                  }`}
                >
                  <label className="cursor-pointer label">
                    <div className="flex">
                      <img
                        src={user.image}
                        alt=""
                        className="w-[45px] h-[45px] object-cover rounded-full"
                      />
                      <div className="ml-4">
                        <p className="font-bold text-custom-green-dark">
                          {user.name}
                        </p>
                        <p className="text-custom-green-60">{user.role}</p>
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
              <button className=" w-full btn bg-custom-green-15 text-custom-green-dark border-transparent hover:text-white hover:bg-custom-green-dark transition-all duration-300">
                Save
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* See User Modal */}
        <dialog id="addedUsersList" className="modal">
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
                activeProject.members.map((user, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedUsers.includes(user.id)
                        ? "bg-custom-green-30"
                        : "bg-transparent"
                    }`}
                  >
                    <label className="label">
                      <div className="flex">
                        <img
                          src=""
                          alt=""
                          className="w-[45px] h-[45px] object-cover rounded-full"
                        />
                        <div className="ml-4">
                          <p className="font-bold text-custom-green-dark">
                            shu
                          </p>
                          <p className="text-custom-green-60">{user.role}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))
              ) : (
                <div className=" grid grid-cols-1 text-center p-10 text-custom-green-80 select-none">
                  <i className="bi bi-people text-[35px]"></i>
                  <p className="text-[18px]">No Staff has been selected for Project yet.</p>
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
