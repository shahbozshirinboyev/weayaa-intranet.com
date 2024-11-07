import React, { useState } from "react";

const AddSecondModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения текста поиска

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
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

  return (
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
                onClick={closeModal}
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
  );
};

export default AddSecondModal;
