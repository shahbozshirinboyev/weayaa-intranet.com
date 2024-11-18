import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import noneuser from "/img/noneuser.png";
import http from "../services/http";

const TaskFoother = ({ task, membersInfo, selectedUsers, getProjectsList }) => {
  const activeProjectUsersInfo = membersInfo.filter((member) =>
    selectedUsers.includes(member.id)
  );
  const activeTaskUsersInfo = activeProjectUsersInfo.filter((member) =>
    task.members.includes(member.id)
  );
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
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`, };
    toast.promise(
      http.patch(
        `projects/tasks/${task.id}/`,
        { members: selectedUsersForTask },
        { headers }
      ),
      {
        loading: "Adding ...",
        success: (response) => {
          console.log(response.data);
          getProjectsList();
          document.getElementById("addusersfortask").close();
          return <b>Add :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };

  // console.log(activeProjectUsersInfo);

  return (
    <>
      <div className="grid grid-cols-[0.3fr_1fr] items-center">
        <button
          onClick={() => document.getElementById("task_chat").showModal()}
        >
          <div className="flex">
            <div className="relative">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                <i className="bi bi-chat-dots"></i>
              </div>
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </button>

        {/* task user list START */}
        <div className="flex justify-end">
          <div
            className="flex -space-x-4 cursor-pointer"
            onClick={() => document.getElementById("showAddedUser").showModal()}
          >
            {activeTaskUsersInfo.length !== 0 &&
              activeTaskUsersInfo.map((user) => (
                <img
                  key={user.id}
                  src={user.image || noneuser}
                  alt="Avatar пользователя"
                  className="w-8 h-8 rounded-full border-2 object-cover border-white"
                />
              ))}
          </div>
          {activeTaskUsersInfo.length !== 0 && (
            <div className="w-0.5 rounded-full bg-custom-green-60 mx-1.5 my-[5px]"></div>
          )}

          <button
            onClick={() =>
              document.getElementById("addusersfortask").showModal()
            }
            className="w-8 h-8 bg-custom-green-10 hover:bg-custom-green-dark text-custom-green-90  hover:text-white transition-all duration-300 rounded-full flex items-center justify-center right-3"
          >
            <i className="bi bi-plus flex text-[24px] justify-center items-center"></i>
          </button>
        </div>
        {/* task user list END */}
      </div>

      {/* TASK => Chat START */}
      <dialog id="task_chat" className="modal">
        <div className="modal-box h-full max-h-[700px] p-0 flex flex-col">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">Task Chat</span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          <div>
            <p>Bu CHAT !!!</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* TASK => Chat END */}

      {/* Show Added User List START */}
      <dialog id="showAddedUser" className="modal">
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

      {/* Add User Modal */}
      <dialog id="addusersfortask" className="modal">
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
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default TaskFoother;
