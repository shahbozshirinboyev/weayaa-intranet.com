import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import http from "../services/http";

const TaskHeader = ({ task, getActiveProjectTasks }) => {
  // console.log(task)
  const [taskInfo, setTaskInfo] = useState({
    id: "",
    file: "",
    fileName: "",
    fileType: "",
    name: "",
    deadline: "",
    description: "",
  });

  useEffect(() => {
    setTaskInfo({
      id: task.id,
      file: task.file,
      fileName: task?.file?.split("/").pop(),
      fileType: task?.file?.split(".").pop().toUpperCase(),
      name: task.name,
      deadline: task.deadline,
      description: task.description,
    });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskInfo({ ...taskInfo, [name]: value });
  };

  const handleFile = (e) => {
    setTaskInfo((prevState) => ({
      ...prevState,
      file: e.target.files[0],
      fileName: e.target.files[0].name,
      fileType: e.target.files[0].name?.split(".").pop().toUpperCase(),
    }));
  };

  const removeFile = () => {
    setTaskInfo((prevState) => ({
      ...prevState,
      file: "",
      fileName: "",
      fileType: "",
    }));
  };

  const TaskInfoEdit = (e) => {
    e.preventDefault();

    // Header konfiguratsiyasi
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    // FormData yaratish
    const formData = new FormData();
    formData.append("name", taskInfo.name);
    formData.append("deadline", taskInfo.deadline);
    formData.append("description", taskInfo.description);

    if (taskInfo.file instanceof File || taskInfo.file === "") {
      formData.append("file", taskInfo.file);
    }

    console.log(taskInfo.file);

    toast.promise(
      http.patch(`projects/tasks/${taskInfo.id}/`, formData, { headers }),
      {
        loading: "Changing ...",
        success: (response) => {
          getActiveProjectTasks();
          document.getElementById(`editTaskModal${taskInfo.id}`).close();
          return <b>Done :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  const userType = localStorage.getItem("userType");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteTask = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(http.delete(`projects/tasks/${id}/`, { headers }), {
      loading: "Deleting...",
      success: (response) => {
        getActiveProjectTasks();
        return <b>Delete :)</b>;
      },
      error: (error) => {
        console.log(error.response);
        return <b>Error :(</b>;
      },
    });
  };

  const showTaskId = () => {
    console.log("task ID: " + task.id);
    console.log(task);
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center bg-custom-green-15 text-custom-green-dark text-sm font-semibold px-2 py-1 rounded-md">
            <i className="bi bi-calendar-week mr-2 flex justify-center items-center"></i>
            <span>{task.deadline}</span>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="h-full px-0 text-custom-green-dark"
          >
            <i
              className={`bi bi-three-dots-vertical flex justify-center items-center ${
                isOpen ? "-rotate-90" : "rotate-0"
              } transition-all duration-300`}
            ></i>
          </button>
          {isOpen && (
            <ul className="dropdown-content text-[14px] menu text-custom-green-dark bg-base-100 rounded-md z-[1] w-[160px] p-1 border shadow-md border-custom-green-5 absolute mt-1 right-0 gap-1">
              <li>
                <button
                  onClick={showTaskId}
                  className="hover:bg-custom-green-dark text-custom-green-dark btn btn-sm justify-start border-0 hover:text-white"
                >
                  <i className="bi bi-fire flex justify-center items-center"></i>
                  <span>Important Task</span>
                </button>
              </li>
              <li
                className={`${
                  userType === "staff" || userType === "client" ? "hidden" : ""
                }`}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById(`editTaskModal${task.id}`)
                      .showModal()
                  }
                  className={`hover:bg-custom-green-dark text-custom-green-dark btn btn-sm justify-start border-0 hover:text-white`}
                >
                  <i className="bi bi-pencil flex justify-center items-center"></i>
                  <span>Edit</span>
                </button>
              </li>
              <li
                className={`${
                  userType === "staff" || userType === "client" ? "hidden" : ""
                }`}
              >
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                  className={`hover:bg-red-700 text-custom-green-dark hover:text-white btn btn-sm justify-start border-0`}
                >
                  <i className="bi bi-trash flex justify-center items-center"></i>
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <dialog id={`editTaskModal${task.id}`} className="modal">
        <Toaster />
        <div className="modal-box p-0 max-w-xl">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Edit Task Info (ID: {task.id})
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <>
            <form onSubmit={TaskInfoEdit}>
              <div className="flex flex-col gap-3 px-5 py-4 text-custom-green-dark z-50">
                <div className="flex gap-4">
                  <label
                    className={`w-[200px] py-3 flex justify-center items-center rounded-lg cursor-pointer bg-custom-green-15 text-custom-green-80 ${
                      taskInfo.file === null || taskInfo.file === ""
                        ? "hover:bg-custom-green-dark hover:text-white"
                        : ""
                    } transition-all duration-150`}
                  >
                    <input
                      className="hidden"
                      id="file-upload"
                      accept="*/*"
                      type="file"
                      // multiple
                      // accept=".jpg,.png,.rar,.zip"
                      onChange={handleFile}
                    />

                    <div
                      className={`flex flex-col items-center justify-center ${
                        taskInfo.file === null || taskInfo.file === ""
                          ? ""
                          : "hidden"
                      }`}
                    >
                      <i className="bi bi-cloud-arrow-up-fill text-2xl"></i>
                      <p className="text-xs text-center">
                        <span className="font-semibold">
                          Choose file to upload
                        </span>
                        <br />
                        <span>Supported any formats</span>
                      </p>
                    </div>

                    <div
                      className={`${
                        taskInfo.file === null || taskInfo.file === ""
                          ? "hidden"
                          : ""
                      } relative flex justify-center items-center h-full mx-3 bg-white rounded-md`}
                    >
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          removeFile();
                        }}
                        className="absolute -right-2 -top-2 bg-white hover:bg-red-100 w-[25px] h-[25px] border border-red-100 rounded-full p-1 flex justify-center items-center text-[10px]"
                      >
                        ❌
                      </span>
                      {/* <ul className="flex justify-center items-center"> */}
                      <li className="text-sm text-gray-700 flex flex-col justify-center items-center mx-2 relative gap-1">
                        <span className="font-bold text-custom-green-90 text-[12px] absolute">
                          {taskInfo?.fileType}
                        </span>
                        <i className="bi bi-file-earmark text-[65px] text-custom-green-90"></i>
                        <span className="line-clamp-1 text-custom-green-dark font-semibold">
                          {taskInfo?.fileName}
                        </span>
                      </li>
                      {/* </ul> */}
                    </div>
                  </label>

                  <div>
                    <label className="w-full">
                      <span className="text-custom-green-80 font-medium text-[14px]">
                        Task title
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={taskInfo.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
                      />
                    </label>

                    <label className="w-full">
                      <span className="text-custom-green-80 font-medium text-[14px]">
                        Task deadline
                      </span>
                      <input
                        type="date"
                        name="deadline"
                        required
                        value={taskInfo.deadline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
                      />
                    </label>
                  </div>
                </div>

                <label className="w-full ">
                  <span className="text-custom-green-80 font-medium text-[14px]">
                    Task description
                  </span>
                  <textarea
                    name="description"
                    required
                    value={taskInfo.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
                    rows={4}
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="w-full rounded-md h-9 bg-custom-green-dark text-blue-50 font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default TaskHeader;
