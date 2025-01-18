import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import http from "../services/http";

const TaskHeader = ({ task, getActiveProjectTasks }) => {

  const userType = localStorage.getItem("userType")
  const toggleDropdown = () => { setIsOpen(!isOpen); };
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
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}` };
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

  const showTaskId = () => { console.log("task ID: " + task.id); console.log(task); };

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
          <button onClick={toggleDropdown} className="h-full px-0 text-custom-green-dark">
            <i
              className={`bi bi-three-dots-vertical flex justify-center items-center ${isOpen ? "-rotate-90" : "rotate-0"
                } transition-all duration-300`}
            ></i>
          </button>
          {isOpen && (
            <ul className="dropdown-content text-[14px] menu text-custom-green-dark bg-base-100 rounded-md z-[1] w-[160px] p-1 border shadow-md border-custom-green-5 absolute mt-1 right-0 gap-1">
              <li>
                <button
                  onClick={showTaskId}
                  className="hover:bg-custom-green-dark text-custom-green-dark btn btn-sm justify-start border-0 hover:text-white">
                  <i className="bi bi-fire flex justify-center items-center"></i>
                  <span>Important Task</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById(`editTaskModal${task.id}`).showModal()}
                  className={`hover:bg-custom-green-dark text-custom-green-dark btn btn-sm justify-start border-0 hover:text-white ${userType === "staff" ? "hidden" : ""}`}>
                  <i className="bi bi-pencil flex justify-center items-center"></i>
                  <span>Edit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { deleteTask(task.id); }}
                  className={`hover:bg-red-700 text-custom-green-dark hover:text-white btn btn-sm justify-start border-0 ${userType === "staff" ? "hidden" : ""}`}>
                  <i className="bi bi-trash flex justify-center items-center"></i>
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          )}
        </div>

      </div>


      <dialog id={`editTaskModal${task.id}`} className="modal">
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

          <form>
              <div className="flex flex-col gap-3 px-5 py-4 text-custom-green-dark z-50">
                <div className="flex gap-4 border">

                  <div className="flex items-center w-[200px] h-full border">
                    <label className="w-full text-center rounded-lg cursor-pointer bg-custom-green-15  hover:bg-custom-green-30 py-3">
                      <div className="flex flex-col w-full items-center justify-center">
                        <i className="bi bi-cloud-arrow-up-fill text-2xl text-custom-green-60"></i>
                        <p className="text-xs text-custom-green-60">
                          <span className="font-bold">Choose file to upload</span>
                          <br />
                          <span>Supported any formats</span>
                        </p>
                      </div>

                      <input
                        className="hidden"
                        id="file-upload"
                        accept="*/*"
                        type="file"
                      // multiple
                      // accept=".jpg,.png,.rar,.zip"
                      // onChange={handleFileChange}
                      />

                      <div>
                        {/* {files.length > 0 && (
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      )} */}
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="w-full">
                      <span className="text-custom-green-80 font-medium text-[14px]">
                        Task title
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        // value={taskData.name}
                        // onChange={handleChange}
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
                        // value={taskData.deadline}
                        // onChange={handleChange}
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
                    // value={taskData.description}
                    // onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
                    rows={4}
                  ></textarea>
                </label>               
                <button type="submit" className="w-full rounded-md h-9 bg-custom-green-dark text-blue-50 font-medium">Submit Task</button>
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