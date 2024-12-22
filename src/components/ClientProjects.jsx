import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import http from "../services/http";

function ClientProjects({ clientId, setCount, setClientId }) {
  const [id, setId] = useState("");
  useEffect(() => {
    if (clientId) {
      console.log(clientId);
      setId(clientId);
      document.getElementById("SelectProjectForClient").showModal();
      setClientId("");
    }
  }, [clientId]);
  // get projects list
  const [allProjects, setAllProjects] = useState([]);
  const [assignProjectsId, setAssignProjectsId] = useState([]);

  const getProjectList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        console.log(response.data);
        setAllProjects(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getAssignmentProjectList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/assignments/`, { headers })
      .then((response) => {
        console.log(response.data);
        // -------------------------------------------------------Update here
        // setAssignProjectsId(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getProjectList();
    getAssignmentProjectList();
  }, [clientId]);

  const handleCheckboxChange = (projectId) => {
    setAssignProjectsId((prevIds) => {
      if (prevIds.includes(projectId)) {
        return prevIds.filter(id => id !== projectId);
      } else {
        return [...prevIds, projectId];
      }
    });
  };

  const assignProjects = (e) => {
    e.preventDefault();
    console.log({ client: id, projects: assignProjectsId, });
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`, };
    http
      .post(`projects/assignments/`, { client: id, projects: assignProjectsId, }, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <dialog id="SelectProjectForClient" className="modal">
        <Toaster />
        <div className="modal-box max-w-xl p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Select Projects for Client
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <>
            <form onSubmit={assignProjects} className="px-4 py-2 flex flex-col">
              {allProjects?.map((project) => (
                <div key={project.id} className="relative">
                  <input
                    id={`project-${project.id}`}
                    type="checkbox"
                    checked={assignProjectsId.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                    className="peer checkbox border-custom-green-60 [--chkbg:#2E6734] [--chkfg:white] checked:border-custom-green-80 absolute right-3 top-4"
                  />
                  <label
                    htmlFor={`project-${project.id}`}
                    className="cursor-pointer peer-checked:bg-custom-green-30 border-0 border-custom-green-10 text-custom-green-dark bg-custom-green-5 rounded-md my-1 py-2 px-3 flex items-center justify-between"
                  >
                    <div className="flex justify-start items-center">
                      <i className="bi bi-folder mr-3 text-[20px]"></i>
                      <span>{project.name}</span>
                    </div>
                  </label>
                </div>
              ))}
              <button type="submit" className="btn btn-sm my-2 bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark hover border-0 rounded-md">
                Save
              </button>
            </form>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ClientProjects;
