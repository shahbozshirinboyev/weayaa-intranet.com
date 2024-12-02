import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import noneuser from "/img/noneuser.png";
import http from "../services/http";
import TaskChat from "./TaskChat";

const TaskFoother = ({ task, membersInfo, selectedUsers, getActiveProjectTasks }) => {

  const userType = localStorage.getItem("userType")
  const activeProjectUsersInfo = membersInfo.filter((member) => selectedUsers.includes(member.id));
  const activeTaskUsersInfo = activeProjectUsersInfo.filter((member) => task.members.includes(member.id));  
  const [selectedUsersForTask, setSelectedUsersForTask] = useState( task.members ? task.members : [] );

  const handleUserSelectForTask = (userId) => {
    setSelectedUsersForTask((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const submitSelectedUsersForTask = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(
      http.patch(
        `projects/tasks/${task.id}/`,
        { members: selectedUsersForTask },
        { headers }
      ),
      {
        loading: "Adding ...",
        success: (response) => {
          getActiveProjectTasks();
          document.getElementById(`addUsersForTask${task.id}`).close();
          return <b>Add :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center">

        <TaskChat task={task} />

        {/* Task users list START */}
        <div className="flex justify-end w-full">
          <div className="flex -space-x-4 cursor-pointer" onClick={() => document.getElementById(`showAddedUsers${task.id}`).showModal()}>
            {activeTaskUsersInfo.length !== 0 && activeTaskUsersInfo.map((user) => (
                <img
                  key={user.id}
                  src={user.image || noneuser}
                  alt="Avatar пользователя"
                  className="w-8 h-8 rounded-full border-2 object-cover border-white"
                />
              ))}
          </div>

          {/* Line ------ START */}
          {activeTaskUsersInfo.length !== 0 && userType !== "staff" && ( <div className="w-0.5 rounded-full bg-custom-green-60 mx-1.5 my-[5px]"></div>)}
          {/* Line ------ END */}

          <button onClick={() => document.getElementById(`addUsersForTask${task.id}`).showModal()}
            className={`w-8 h-8 ${ userType === "staff" ? "hidden" : ""} bg-custom-green-10 hover:bg-custom-green-dark text-custom-green-90  hover:text-white transition-all duration-300 rounded-full flex items-center justify-center right-3`}
          >
            <i className="bi bi-plus flex text-[24px] justify-center items-center"></i>
          </button>
          
        </div>
        {/* Task users list END */}
      </div>

      {/* Show Added User List START */}
      <dialog id={`showAddedUsers${task.id}`} className="modal">
        <Toaster />
        <div className="modal-box p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Task Users List
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          <div className="p-3">
            {activeTaskUsersInfo.map((user) => (
              <div key={user.id}>
                <label className="label">
                  <div className="flex">
                    <img
                      src={user.image || noneuser}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-[45px] h-[45px] object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <p className="font-bold text-custom-green-dark">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-custom-green-60">{user.label}</p>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Show Added User List END */}

      {/* Add Users for Task START */}
      <dialog id={`addUsersForTask${task.id}`} className="modal">
        <Toaster />
        <div className="modal-box p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Add Staff for this Task
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          {selectedUsers.length !== 0 ? (
            <form action="" onSubmit={submitSelectedUsersForTask}>
              <div className="p-4">
                {activeProjectUsersInfo.map((user) => (
                  <div
                    key={user.id}
                    className={`form-control rounded-md px-1 my-2 ${
                      selectedUsersForTask.includes(user.id)
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
                        onChange={() => handleUserSelectForTask(user.id)}
                        checked={selectedUsersForTask.includes(user.id)}
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
          ) :
          (
            <div className="grid grid-cols-1 text-center p-10 text-custom-green-80 select-none">
            <i className="bi bi-people text-[35px]"></i>
            <p className="md:text-lg">
              No staff has been added for this Project.
            </p>
            <p className="text-[12px] md:text-[14px] text-red-700">
              First add staffs to the Project, then you can assign them to the
              task.
            </p>
          </div>
          )
        }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Add Users for Task END */}

      

    </>
  );
};

export default TaskFoother;