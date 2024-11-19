import { useEffect, useState } from "react";
import http from "../../../services/http";

const MasterStatus = () => {
  const [projects, setProjects] = useState([]);
  const [activeProjectInfo, setActiveProjectInfo] = useState([]);

  const getProjects = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  getProjects();

  useEffect(() => {
    console.log(activeProjectInfo);
  }, [activeProjectInfo]);

  const totalProgress = 65; // Общий прогресс
  const blueProgress = 10; // Процент синего прогресса
  const greenProgress = 30; // Процент зеленого прогресса

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {/* 1 */}
      <div className="bg-custom-green-5 rounded-md p-6 shadow-md shadow-custom-green-5 w-full h-96 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-custom-green-dark">
            Project progress
          </h2>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="text-custom-green-dark m-1 flex justify-center items-center px-2 py-1 rounded-md border border-custom-green-15 transition-all duration-300 hover:bg-custom-green-dark hover:text-white"
            >
              <span>{activeProjectInfo.name || "Select Project"}</span>
              <i className="bi bi-caret-down flex justify-center items-center ml-2"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
            >
              {projects.map((project, index) => (
                <li
                  key={project.id}
                  className="w-full flex flex-nowrap my-[1px]"
                  onClick={() => {
                    setActiveProjectInfo(project);
                  }}
                >
                  <div>
                    <i className="bi bi-caret-right"></i>
                    <span className="whitespace-nowrap">{project.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Multi-color Progress Bar */}
        <div className="relative flex justify-center items-center">
          <svg className="w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="transparent"
              strokeWidth="15"
              strokeLinecap="round"
              stroke="#E6E6E6"
              strokeDasharray="160"
              strokeDashoffset={188 - (188 * totalProgress) / 100}
              className="transform -rotate-90 origin-center"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="transparent"
              strokeWidth="15"
              strokeLinecap="round"
              stroke="#00D4A1"
              strokeDasharray="188"
              strokeDashoffset={188 - (188 * greenProgress) / 100}
              className="transform -rotate-90 origin-center"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="transparent"
              strokeWidth="15"
              strokeLinecap="round"
              stroke="#0083CC"
              strokeDasharray="180"
              strokeDashoffset={180 - (188 * blueProgress) / 80}
              className="transform -rotate-90 origin-center"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-3xl font-bold text-green-800">
              {totalProgress}%
            </p>
            <p className="text-[10px] text-custom-green-80">
              Project Completed
            </p>
          </div>
        </div>

        {/* Task Status */}
        <div className="flex justify-around mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-custom-green-dark">16</p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-sm">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Task done</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-custom-green-dark">35</p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-sm">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>On progress</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-custom-green-dark">42</p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-sm">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span>Still waiting</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-custom-green-5 rounded-md p-6 shadow-md shadow-custom-green-5 w-full h-96 flex flex-col justify-center items-center">
        
      </div>
      <div className="bg-custom-green-5 rounded-md p-6 shadow-md shadow-custom-green-5 w-full h-96 flex flex-col justify-center items-center">
        
      </div>
      <div className="bg-custom-green-5 rounded-md p-6 shadow-md shadow-custom-green-5 w-full h-96 flex flex-col justify-center items-center">
        
      </div> */}
    </div>
  );
};

export default MasterStatus;
