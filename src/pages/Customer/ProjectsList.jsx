import { NavLink } from "react-router-dom";
import http from "../../services/http";
import { useState, useEffect } from "react";
import TaskManagement from "../../components/TaskManagement";

function ProjectsList() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAssignmentProjects = () => {
    setLoading(true);
    const access = localStorage.getItem("access");
    http
      .get(`projects/`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((response) => {
        setProjectsList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAssignmentProjects();
  }, [localStorage.getItem("access")]);

  return (
    <div className="w-full flex flex-col">
      {/* Map Project List Start */}
      {!loading &&
        projectsList?.map((project) => (
          <div
            key={project.id}
            className="bg-custom-green-5 w-full h-[60px] rounded-[5px] flex mb-4"
          >
            <div className="p-2 h-full">
              <div className="flex h-full justify-start px-4 w-[300px] items-center bg-custom-green-30 text-custom-green-dark font-semibold rounded-[5px]">
                <i className="bi bi-folder mr-4 text-[18px] flex justify-center items-center"></i>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {project.name}
                </p>
              </div>
            </div>

            <div className="p-2 h-full hidden md:flex">
              <div className="flex h-full justify-start px-4 w-[265px]  items-center bg-custom-green-30 text-custom-green-dark font-semibold rounded-[5px]">
                <i className="bi bi-calendar4-week mr-4 text-[18px] flex justify-center items-center"></i>
                <p>{project.deadline}</p>
                <p
                  className={`flex justify-center items-center whitespace-nowrap ml-4 px-2 py-1 rounded-[5px] w-[100px] ${
                    Math.ceil(
                      (new Date(project.deadline) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) < 0
                      ? "text-white bg-red-700"
                      : "text-white bg-custom-green-dark "
                  }`}
                >
                  {Math.ceil(
                    (new Date(project.deadline) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
              </div>
            </div>

            <div className="p-2 h-full hidden lg:flex">
              <div className="flex h-full justify-start px-4 w-[180px] items-center bg-custom-green-30 text-custom-green-dark font-semibold rounded-[5px]">
                <i className="bi bi-people mr-4 text-[18px] flex justify-center items-center"></i>
                <p>{project.members.length} Staff working</p>
              </div>
            </div>

            <div className="p-2 h-full ml-auto">
              <NavLink
                to="projectstatus"
                onClick={() => {
                  localStorage.setItem(
                    "activeProject",
                    JSON.stringify(project)
                  );
                }}
                className="flex h-full justify-start px-4 items-center bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300 text-custom-green-dark font-semibold rounded-[5px]"
              >
                <i className="bi bi-box-arrow-in-right text-[18px] flex justify-center items-center"></i>
              </NavLink>
            </div>
          </div>
        ))}
      {loading && (
        <div className="flex justify-center items-center text-custom-green-dark font-medium">
          <span className="loading loading-spinner loading-sm"></span>
          <span className="pl-2">Loading...</span>
        </div>
      )}
      {projectsList.length === 0 && !loading && (
        <div className="flex justify-center items-center mt-12 text-custom-green-dark">
          <div className="flex flex-col justify-center items-center">
            <i className="bi bi-folder-x text-[30px] xl:text-[50px]"></i>
            <span className="font-medium">You have no projects assigned to you.</span>
          </div>
        </div>
      )}
      {/* Map Project List END */}
      {/* <TaskManagement /> */}
    </div>
  );
}

export default ProjectsList;
