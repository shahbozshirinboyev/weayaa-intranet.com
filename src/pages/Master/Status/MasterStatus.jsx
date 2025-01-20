import { useEffect, useState } from "react";
import http from "../../../services/http";

const MasterStatus = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState([]);
  const [activeProjectTasksList, setActiveProjectTasksList] = useState({
    to_do: {
      name: "To Do",
      items: [],
    },
    in_progress: {
      name: "In Progress",
      items: [],
    },
    review: {
      name: "Review",
      items: [],
    },
    complete: {
      name: "Complete",
      items: [],
    },
  });
  const [activeProjectTasksCounts, setActiveProjectTasksCounts] = useState("");

  const getProjects = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
          setActiveProject(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const getActiveProjectTasks = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/${activeProject.id}/tasks`, { headers })
      .then((response) => {
        const tasks = response.data;
        setActiveProjectTasksCounts(response.data.length);
        const updatedBoard = {
          to_do: { ...activeProjectTasksList.to_do, items: [] },
          in_progress: { ...activeProjectTasksList.in_progress, items: [] },
          review: { ...activeProjectTasksList.review, items: [] },
          complete: { ...activeProjectTasksList.complete, items: [] },
        };
        tasks.forEach((task) => {
          if (task.status === "todo") {
            updatedBoard.to_do.items.push(task);
          } else if (task.status === "in_progress") {
            updatedBoard.in_progress.items.push(task);
          } else if (task.status === "verification") {
            updatedBoard.review.items.push(task);
          } else if (task.status === "completed") {
            updatedBoard.complete.items.push(task);
          }
        });
        setActiveProjectTasksList(updatedBoard);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);
  useEffect(() => {
    if (activeProject.length !== 0) {
      getActiveProjectTasks();
    }
  }, [activeProject]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="bg-custom-green-5 rounded-md p-4 shadow-md shadow-custom-green-5 w-full h-96 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[12px] md:text-[16px] font-semibold text-custom-green-dark">
            Project progress
          </h2>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="text-custom-green-dark flex justify-center items-center px-2 py-1 rounded-md  transition-all duration-300"
            >
              <span className="text-[12px] md:text-[16px] font-semibold">
                {activeProject.name || "Select Project"}
              </span>
              <i className="bi bi-caret-down flex justify-center items-center ml-2"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
            >
              {projects.length !== 0 ? projects.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((project) => (
                <li
                  key={project.id}
                  className="w-full flex flex-nowrap my-[1px]"
                  onClick={() => {
                    setActiveProject(project);
                  }}
                >
                  <div className="text-custom-green-dark font-semibold">
                    <i className="bi bi-caret-right"></i>
                    <span className="whitespace-nowrap">{project.name}</span>
                  </div>
                </li>
              )) : <li className="my-1 whitespace-nowrap text-custom-green-dark">You have no projects!</li>}
            </ul>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div
            className="absolute radial-progress text-custom-green-10"
            style={{
              "--value": "100",
              "--size": "12rem",
              "--thickness": "2rem",
            }}
            role="progressbar"
          ></div>

          <div
            className="radial-progress text-custom-green-dark text-2xl font-semibold transition-all duration-300"
            style={{
              "--value": `${
                activeProjectTasksList?.complete?.items?.length
                  ? (
                      (activeProjectTasksList.complete.items.length /
                        activeProjectTasksCounts) *
                      100
                    ).toFixed(1)
                  : "0"
              }`,
              "--size": "12rem",
              "--thickness": "2rem",
            }}
            role="progressbar"
          >
            <div className="grid grid-cols-1 justify-center items-center text-center">
              <p>
                {activeProjectTasksList?.complete?.items?.length
                  ? (
                      (activeProjectTasksList.complete.items.length /
                        activeProjectTasksCounts) *
                      100
                    ).toFixed(1) + "%"
                  : "0%"}
              </p>

              <p className="text-[18px]">Complete</p>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <div className="text-center font-semibold">
            <p className="text-2xl text-custom-green-dark flex justify-center items-center">
              {activeProjectTasksList.complete.items.length}
            </p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-[11px] md:text-[14px] lg:text-[16px]">
              <div className="w-3 h-3 rounded-full bg-sky-400"></div>
              <span>Complete</span>
            </div>
          </div>

          <div className="text-center font-semibold">
            <p className="text-2xl text-custom-green-dark flex justify-center items-center">
              {activeProjectTasksList.review.items.length}
            </p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-[11px] md:text-[14px] lg:text-[16px]">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>Review</span>
            </div>
          </div>

          <div className="text-center font-semibold">
            <p className="text-2xl text-custom-green-dark flex justify-center items-center">
              {activeProjectTasksList.in_progress.items.length}
            </p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-[11px] md:text-[14px] lg:text-[16px]">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>In Progress</span>
            </div>
          </div>

          <div className="text-center font-semibold">
            <p className="text-2xl text-custom-green-dark flex justify-center items-center">
              {activeProjectTasksList.to_do.items.length}
            </p>
            <div className="flex items-center justify-center gap-1 text-custom-green-80 text-[11px] md:text-[14px] lg:text-[16px]">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span>To Do</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterStatus;
