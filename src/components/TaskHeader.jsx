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
            <ul className="dropdown-content text-[14px] menu text-custom-green-dark bg-base-100 rounded-md z-[1] w-[160px] p-1 shadow-xl border border-custom-green-30 border-opacity-5 absolute mt-1 right-0 gap-1">
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
                  onClick={() => document.getElementById(`editTaskModal${task.id}`).showModal()}
                  className="hover:bg-custom-green-dark hover:text-white"
                >
                  <i className="bi bi-pencil flex justify-center items-center"></i>{" "}
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => { deleteTask(task.id); }}
                  className={`hover:bg-red-700 hover:text-white ${userType === "staff" ? "hidden" : ""}`}
                >
                  <i className="bi bi-trash flex justify-center items-center"></i>{" "}
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>

      </div>


      <dialog id={`editTaskModal${task.id}`} className="modal">
        <div className="modal-box p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Edit Task (ID: {task.id})
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <>
          

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