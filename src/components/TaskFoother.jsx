import { useState } from "react";
import Avatar1 from "../../public/img/background.png";
import Avatar2 from "../../public/img/background.png";
import Avatar3 from "../../public/img/background.png";
import toast, { Toaster } from "react-hot-toast";
import noneuser from "/img/noneuser.png";

const TaskFoother = ({ task, membersInfo }) => {
  console.log(task.members);
  console.log(membersInfo);

  const filteredMembersInfo = membersInfo.filter((member) =>
    task.members.includes(member.id)
  );

  console.log(filteredMembersInfo);

  const [messages, setMessages] = useState([
    {
      sender: "Obi-Wan Kenobi",
      text: "You were the Chosen One!",
      time: "12:45",
      align: "start",
    },
    { sender: "Anakin", text: "I hate you!", time: "12:46", align: "end" },
  ]);
  const users = [
    { id: 1, imgSrc: Avatar1 },
    { id: 2, imgSrc: Avatar2 },
    { id: 3, imgSrc: Avatar3 },
  ];
  const [newMessage, setNewMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: "You",
          text: newMessage,
          time: new Date().toLocaleTimeString().slice(0, 5),
          align: "end",
        },
      ]);
      setNewMessage("");
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => {
      return {
        file,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      };
    });
    setUploadedFiles([...uploadedFiles, ...files]);
  };

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
            {filteredMembersInfo.length !== 0 &&
              filteredMembersInfo.map((user) => (
                <img
                  key={user.id}
                  src={user.image || noneuser}
                  alt="Avatar пользователя"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
          </div>
          {filteredMembersInfo.length !== 0 && (
            <div className="w-0.5 rounded-full bg-custom-green-60 mx-1.5 my-[5px]"></div>
          )}

          <button onClick={() => document.getElementById("addusersfortask").showModal()} className="w-8 h-8 bg-custom-green-10 hover:bg-custom-green-dark text-custom-green-90  hover:text-white transition-all duration-300 rounded-full flex items-center justify-center right-3">
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

          <div className="p-4 overflow-y-auto flex-grow">
            {messages.map((msg, index) => (
              <div key={index} className={`chat  chat-${msg.align} mb-4 `}>
                <div className="chat-image avatar ">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.sender}
                  <time className="text-xs opacity-50">{msg.time}</time>
                </div>
                <div
                  className={`chat-bubble text-white ${
                    msg.align === "end"
                      ? "bg-custom-green-dark"
                      : "bg-custom-green-90"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {uploadedFiles.length > 0 && (
              <div className="uploaded-files mt-4">
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className={`chat chat-end bg-custom-green-dark h-28`}
                    >
                      {file.url ? (
                        <img
                          src={file.url}
                          alt="Uploaded"
                          className="w-26 h-24 object-cover rounded  "
                        />
                      ) : (
                        <span>{file.file.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Форма отправки сообщения (footer) */}
          <form
            className="p-3 flex items-center border-custom-green-80"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="input border border-custom-green-60 w-full mr-2 focus:border-custom-green-dark"
            />
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input hidden"
              id="fileUpload"
              multiple
            />
            <label
              htmlFor="fileUpload"
              className="btn bg-custom-green-15 text-custom-green-dark border-transparent hover:text-white hover:bg-custom-green-dark transition-all duration-300 cursor-pointer mr-2"
            >
              📎
            </label>
            <button
              type="button"
              onClick={handleSendMessage}
              className="btn bg-custom-green-15 text-custom-green-dark border-transparent hover:text-white hover:bg-custom-green-dark transition-all duration-300"
            >
              Отправить
            </button>
          </form>
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
            {filteredMembersInfo.length !== 0 ? (
              filteredMembersInfo.map((user) => {
                return user ? (
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
                ) : null;
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

              <form action="" onSubmit>
                <div className="p-4">
                  {membersInfo.map((user) => (
                    <div
                      key={user.id}
                      // className={`form-control rounded-md px-1 my-2 ${
                      //   selectedUsers.includes(user.id)
                      //     ? "bg-custom-green-15"
                      //     : "bg-transparent"
                      // }`}
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
                          // onChange={() => handleUserSelect(user.id)}
                          // checked={selectedUsers.includes(user.id)}
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
