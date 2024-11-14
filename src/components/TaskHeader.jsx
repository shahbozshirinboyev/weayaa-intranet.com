import { useState, useEffect, useRef } from "react";

const TaskHeader = ({task}) => {


  
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
    console.log("task ID: " + task.id)
    console.log(task)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-green-700 text-white text-sm font-semibold px-2 py-1 rounded-full">
            <i className="bi bi-calendar-week mr-2"></i>
            <span>{task.deadline}</span>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={ toggleDropdown }
            className="h-full px-2 text-custom-green-dark"
          >
            <i
              className={`bi bi-three-dots-vertical flex justify-center items-center ${
                isOpen ? "-rotate-90" : "rotate-0"
              } transition-all duration-300`}
            ></i>
          </button>
          {isOpen && (
            <ul className="dropdown-content text-[14px] menu text-custom-green-dark bg-base-100 rounded-box z-[1] w-48 p-1 shadow-xl border border-custom-green-30 border-opacity-5 absolute mt-2 right-0">
              <li>
                <button onClick={ showTaskId } className="hover:bg-custom-green-30 hover:font-semibold">
                  <i className="bi bi-fire"></i> Important Task
                </button>
              </li>
              <li>
                <button className="hover:bg-custom-green-30 hover:font-semibold">
                  <i className="bi bi-pin-angle"></i> Pin
                </button>
              </li>
              <li>
                <button className="hover:bg-custom-green-30 hover:font-semibold">
                  <i className="bi bi-journal-bookmark"></i> Remind
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
