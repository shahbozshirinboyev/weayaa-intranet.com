import { useState, useEffect } from "react";
import http from "../../../services/http";
import toast, { Toaster } from "react-hot-toast";

function ArchiveProjects() {
  const [projectsList, setProjectsList] = useState([]);
  const [selectArchiveProject, setSelectArchiveProject] = useState([]);

  console.log(projectsList)

  const getProjectsList = () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`, };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        const responseData = response.data;
        const filteredProjects = responseData.filter((project) => project.is_archived === true);
        setProjectsList(filteredProjects);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => { getProjectsList(); }, [])

  const moveArchiveToProject = (id) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("access")}`, };
    toast.promise(
      http.patch(`projects/${id}/`,
        { is_archived: false, },
        { headers }
      ),
      {
        loading: "Changing ...",
        success: (response) => {
          // console.log(response.data);
          getProjectsList();
          document.getElementById("my_unarchive_modal").close();
          return <b>Done :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <b>Error :(</b>;
        },
      }
    );
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-custom-green-dark uppercase">
              <th>Archive project Name</th>
              <th>Archive date</th>
              <th>The person who archived</th>
              <th>Unarchive</th>
            </tr>
          </thead>

          <tbody className="text-custom-green-dark">
            {projectsList?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <i className="bi bi-file-earmark-zip text-[30px]"></i>
                    </div>
                    <div>
                      <div className="font-semibold">{project.name}</div>
                      <div className="text-xs opacity-50 flex justify-start items-center gap-1">
                        <i className="bi bi-people"></i>
                        <span>{project.members.length}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td> <span className="font-semibold">24.01.2025</span> </td>
                <td> <span className="font-semibold">Full Name</span> </td>
                <th>
                  <button
                    onClick={() => { document.getElementById("my_unarchive_modal").showModal(); setSelectArchiveProject(project) }}
                    className="btn btn-xs flex flex-nowrap gap-2 text-custom-green-dark border-0 bg-custom-green-10 hover:bg-custom-green-dark hover:text-white"
                  >
                    <i className="bi bi-folder-symlink"></i>
                    <span>Unarchive</span>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* unarchive modal - start */}
      <dialog id="my_unarchive_modal" className="modal">
        <Toaster />
        <div className="modal-box">
          <h3 className="font-bold text-lg text-custom-green-dark text-center">
            Are you sure unarchive <span className="text-red-700">{selectArchiveProject.name}</span>?
          </h3>
          <div className="flex justify-center items-center gap-12 pt-10">
            <button
              onClick={() => { moveArchiveToProject(selectArchiveProject.id); }}
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-red-700 hover:text-white border-transparent"
            >Yes</button>
            <button
              onClick={() => document.getElementById("my_unarchive_modal").close() }
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-custom-green-dark hover:text-white border-transparent"
            >No</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* unarchive modal - start */}
    </>
  );
}

export default ArchiveProjects;
