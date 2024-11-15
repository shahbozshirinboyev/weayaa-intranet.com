import { useState, useEffect, useRef } from "react";
// react hot toast
import toast from "react-hot-toast";
// http
import http from "../services/http";

const TaskHeader = ({ task, getActiveProjectTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const showTaskId = () => {
    console.log("task ID: " + task.id);
    console.log(task);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Delete Task
  const deleteTask = (id) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`};
    toast.promise(http.delete(`projects/tasks/${id}/`, { headers }), {
      loading: "Deleting...",
      success: (response) => {
        console.log(response.data);
        getActiveProjectTasks();
        return <b>Delete :)</b>;
      },
      error: (error) => {
        console.log(error.response);
        return <b>Error :(</b>;
      },
    });
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
            <ul className="dropdown-content text-[14px] menu text-custom-green-dark bg-base-100 rounded-md z-[1] w-[160px] p-1 shadow-xl border border-custom-green-30 border-opacity-5 absolute mt-1 right-0">
              <li>
                <button
                  onClick={showTaskId}
                  className="hover:bg-custom-green-dark hover:text-white"
                >
                  <i className="bi bi-fire flex justify-center items-center"></i>{" "}
                  Important Task
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                  className="hover:bg-red-700 hover:text-white"
                >
                  <i className="bi bi-trash flex justify-center items-center"></i>{" "}
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskHeader;
