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
        const filteredProjects = responseData.filter((project) => project?.is_archived === true);
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
      {projectsList?.length === 0 &&
        <div className="flex justify-center items-center p-6">
          <span className="text-custom-green-80 font-semibold flex flex-col justify-center items-center gap-1">
            <i className="bi bi-journal-x text-[55px]"></i>
            <span>No archived projects</span>
          </span>
        </div>}

      {projectsList?.length !== 0 && <div className="overflow-x-auto shadow-md rounded-md">

       

        <table className={`w-full text-sm text-left`}>

          <thead className="text-xs uppercase bg-gray-50">
            <tr className="text-[14px] text-custom-green-90 bg-custom-green-10">

              <th scope="col" className="px-6 py-3">
              Archive project Name
              </th>

              <th
                scope="col"
                className="px-6 py-3 hidden md:table-cell lg:table-cell"
              >
                Archive date
              </th>

              <th
                scope="col"
                className="px-6 py-3 hidden md:hidden lg:table-cell"
              >
                The person who archived
              </th>

              <th scope="col" className="px-6 py-3">
                Unarchive
              </th>

              <th scope="col" className="px-6 py-3">
                Show
              </th>
            </tr>
          </thead>

          <tbody>
            {projectsList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((project) => (
                <tr
                  key={project.id}
                  className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5"
                >
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* <img
                      className="!w-12 !h-12 min-w-12 min-h-12 rounded-full object-cover border whitespace-nowrap"
                      src={project.image ? user.image : noneuser}
                      alt="user_image"
                    /> */}
                    <div className="ps-3">
                      <div className="text-base font-semibold text-custom-green-dark">
                      {project.name}
                      </div>
                      <div className="font-normal text-custom-green-80">
                        Client
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell lg:table-cell">
                  <div className="flex text-custom-green-dark font-semibold">

                    <span>{ project?.archived_at || "date.undefined" }</span>
                    </div>
                  </td>

                  <td className="px-6 h-full py-4 hidden md:hidden lg:table-cell ">
                    <div className="flex text-custom-green-dark font-semibold">
                    <span>{project?.archived_by_name || "archived_by_name.undefined"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                  <button
                    onClick={() => { document.getElementById("my_unarchive_modal").showModal(); setSelectArchiveProject(project) }}
                    className="btn btn-xs flex flex-nowrap gap-2 text-custom-green-dark border-0 bg-custom-green-10 hover:bg-custom-green-dark hover:text-white"
                  >
                    <i className="bi bi-folder-symlink"></i>
                    <span>Unarchive</span>
                  </button>
                  </td>

                  <td className="px-6 py-4 justify-start items-center">
                  <button
                    onClick={() => { document.getElementById("my_unarchive_modal").showModal(); setSelectArchiveProject(project) }}
                    className="btn btn-xs flex flex-nowrap gap-2 text-custom-green-dark border-0 bg-custom-green-10 hover:bg-custom-green-dark hover:text-white"
                  >
                    <i className="bi bi-folder-symlink"></i>
                    <span>Unarchive</span>
                  </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>}

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
              onClick={() => document.getElementById("my_unarchive_modal").close()}
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
