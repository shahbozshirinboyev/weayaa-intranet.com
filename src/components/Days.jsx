import { useState } from "react";

const Days = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-green-700 text-white text-sm font-semibold px-2 py-1 rounded-full">
            <i className="bi bi-calendar-week mr-2"></i>
            <span>5 Days</span>
          </div>
        </div>

        <div className="relative">
          <button onClick={toggleDropdown} className="border h-full px-2">
            <i
              className={`bi bi-three-dots-vertical flex justify-center items-center ${
                isOpen ? "-rotate-90" : "rotate-0"
              } transition-all duration-300`}
            ></i>
          </button>
          {isOpen && (
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow absolute mt-2 right-0 border border-red-700">
              <li>
                <a href="#">Item 1</a>
              </li>
              <li>
                <a href="#">Item 2</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Days;
