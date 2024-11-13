/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ handleAddTask }) => {
  const initialTaskData = {
    id: uuidv4(),
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    image: "",
    alt: "",
    tags: [],
  };
  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = () => {
    handleAddTask(taskData);
    closeModal();
  };

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // add user section start
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения текста поиска

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModall = () => {
    setIsOpen(false);
  };

  const users = [
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
  
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Функция для фильтрации пользователей по поисковому термину
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Функция для переключения выбора пользователя
  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // add =------------

  return (
    <>
      <dialog id="createTask" className="modal">
        <div className="modal-box p-0 max-w-2xl">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Create Task
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <>
            <div className=" bg-white rounded-lg shadow-md z-50 flex flex-col gap-3 px-5 py-6 ">
              <label className="w-full">
                <span className="text-custom-green-60">Task title</span>
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className="w-full h-12 px-3 outline-none rounded-md bg-custo border border-border-custom-green-80  hover:border-green-600 focus:ring-0 text-sm font-medium"
                />
              </label>

              <label className="w-full ">
                <span className="text-custom-green-60"> Task description</span>
                <textarea
                  className="w-full rounded-md border border-custom-green-80 focus:outline-none focus:ring-0"
                  rows={5}
                  id=""
                ></textarea>
              </label>

              <label className="w-full">
                <span className="text-custom-green-60">Task deadline</span>
                <input
                  type="date"
                  className="w-full h-12 px-3 outline-none rounded-md bg-custo border border-green-500 hover:border-green-600 focus:border-green-600 focus:ring-0 focus:outline-none text-sm font-medium"
                />
              </label>

              <div className="flex items-center w-full ">
                <label className="w-full text-center border-2 border-dashed border-custom-green-60 rounded-lg cursor-pointer bg-custom-green-15  hover:bg-custom-green-30">
                  <div className=" p-1 flex flex-col w-full items-center justify-center">
                    <div>
                      {" "}
                      <i className="bi bi-cloud-arrow-up-fill text-xl text-custom-green-60 "></i>
                    </div>

                    <p className=" text-sm text-custom-green-60">
                      <span className="font-semibold">Drag & Drop or </span>
                      Choose file to upload
                    </p>
                    <p className="text-[11px] text-custom-green-40">
                      Supported formats: JPG, PNG, RAR, ZIP
                    </p>
                  </div>

                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".jpg,.png,.rar,.zip"
                    onChange={handleFileChange}
                  />

                  <div className="mt-4">
                    {" "}
                    {files.length > 0 && (
                      <ul className="space-y-2">
                        {files.map((file, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </label>
              </div>

              <>
              <div className="flex w-full flex-col items-center justify-center ">
      <button
        onClick={openModal}
        className="bg-custom-green-15 p-3 hover:bg-custom-green-30 rounded-lg w-full"
      >
        <div className="flex items-center justify-center space-x-3">
          <i className="bi bi-cloud-arrow-up-fill text-4xl text-custom-green-60"></i>
          <span className="text-sm text-custom-green-60">
            No employees <br /> selected yet
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 relative max-w-4xl">
            <div className="flex justify-between items-center">
              <span className="text-lg text-custom-green-90 ">
                Select Staff for Task
              </span>
              <button
                onClick={closeModall}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="bi bi-x-lg p-2 text-custom-green-90"></i>
              </button>
            </div>
            <span className="mt-6 block font-semibold text-custom-green-90">
              Send the task to which employees
            </span>

            <span className="mt-4 block text-sm text-custom-green-60">
              Lorem ipsum dolor sit amet consectetur. Amet fermentum commodo
              tincidunt dolor elementum quis magna. Dignissim amet nec id morbi.{" "}
            </span>

            <div className="flex mt-3 items-center border border-custom-green-60 rounded-lg px-3 focus-within:border-custom-green-80">
              <i className="bi bi-search text-custom-green-80"></i>
              <input
                type="text"
                placeholder="Search staff by name"
                value={searchTerm} // Привязка состояния к полю ввода
                onChange={(e) => setSearchTerm(e.target.value)} // Обновление состояния при вводе
                className="text-gcustom-green-80 placeholder-custom-green-60 bg-transparent border-none w-full outline-none focus:outline-none focus:border-none focus:ring-0"
              />
            </div>

            <div className="mt-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className={`form-control rounded-md px-1 my-2 ${ selectedUsers.includes(user.id) ? "bg-custom-green-30": "bg-transparent"}`} >
                  <label className="cursor-pointer label">
                    <div className="flex">
                      <img src={user.image}  alt="" className="w-[45px] h-[45px] object-cover rounded-full" />
                      <div className="ml-4">
                        <p className="font-bold text-custom-green-dark">
                          {user.name}
                        </p>
                        <p className="text-custom-green-60">{user.role}</p>
                      </div>
                    </div>
                    <input type="checkbox" className="checkbox checkbox-success" onClick={() => handleUserSelect(user.id)} checked={selectedUsers.includes(user.id)}  />
                  </label>
                </div>
              ))}

              <button className="mt-2 bg-custom-green-dark text-white font-semibold py-2 px-4 rounded hover:bg-custom-green-90 w-full">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
              </>

              <button
                className="w-full mt-3 rounded-md h-9 bg-custom-green-dark text-blue-50 font-medium"
                onClick={handleSubmit}
              >
                Submit Task
              </button>
            </div>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateTask;
