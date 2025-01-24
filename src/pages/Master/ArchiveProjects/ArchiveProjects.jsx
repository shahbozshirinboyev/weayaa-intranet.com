import { useState, useEffect } from "react";
import http from "../../../services/http";
import toast, { Toaster } from "react-hot-toast";
import archivefoldericon from "/img/archive-folder.png";
import TaskManagement from "../../../components/TaskManagement";

function ArchiveProjects() {
  const [projectsList, setProjectsList] = useState([]);
  const [selectArchiveProject, setSelectArchiveProject] = useState([]);

  const getProjectsList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/`, { headers })
      .then((response) => {
        const responseData = response.data;
        const filteredProjects = responseData.filter(
          (project) => project?.is_archived === true
        );
        setProjectsList(filteredProjects);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getProjectsList();
  }, []);

  const moveArchiveToProject = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(
      http.patch(`projects/${id}/`, { is_archived: false }, { headers }),
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

  // ===========> Get ActiveProjectTasks List START <=========== //
  const [table, setTable] = useState(true);
  const [columns, setColumns] = useState({
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
  console.log("columns: ", columns);

  const getProjectTasks = (id) => {
    console.log("project_id: ", id);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    http
      .get(`projects/${id}/tasks/`, { headers })
      .then((response) => {
        const tasks = response.data;
        const updatedBoard = {
          to_do: { ...columns.to_do, items: [] },
          in_progress: { ...columns.in_progress, items: [] },
          review: { ...columns.review, items: [] },
          complete: { ...columns.complete, items: [] },
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
        setColumns(updatedBoard);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  // ===========> Get ProjectTasks List END <=========== //

  return (
    <>
      {projectsList?.length === 0 && (
        <div className="flex justify-center items-center p-6">
          <span className="text-custom-green-80 font-semibold flex flex-col justify-center items-center gap-1">
            <i className="bi bi-journal-x text-[55px]"></i>
            <span>No archived projects</span>
          </span>
        </div>
      )}

      {table && projectsList?.length !== 0 && (
        <div className="overflow-x-auto shadow-md rounded-md">
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
              {projectsList
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                .map((project) => (
                  <tr
                    key={project.id}
                    className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5"
                  >
                    <td
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="!w-10 !h-10 min-w-10 min-h-10  object-cover whitespace-nowrap"
                        src={archivefoldericon}
                        alt="archivefoldericon"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold text-custom-green-dark">
                          {project.name}
                        </div>
                        <div className="font-medium text-custom-green-80 text-xs flex justify-start items-center gap-1">
                          <i className="bi bi-people-fill"></i>
                          <span>{project.members.length}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell lg:table-cell">
                      <div className="flex text-custom-green-dark font-semibold">
                        <span>
                          {" "}
                          {project?.archived_at
                            ? new Date(project.archived_at).toLocaleDateString(
                                "uz-UZ",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )
                            : "date.undefined"}{" "}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 h-full py-4 hidden md:hidden lg:table-cell ">
                      <div className="flex text-custom-green-dark font-semibold">
                        <span>
                          {project?.archived_by_name ||
                            "archived_by_name.undefined"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          document
                            .getElementById("my_unarchive_modal")
                            .showModal();
                          setSelectArchiveProject(project);
                        }}
                        className="btn btn-sm flex flex-nowrap gap-2 text-custom-green-dark border-0 bg-custom-green-30 hover:bg-custom-green-dark hover:text-white"
                      >
                        <i className="bi bi-folder-symlink"></i>
                        <span>Unarchive</span>
                      </button>
                    </td>

                    <td className="px-6 py-4 justify-start items-center">
                      <button
                        onClick={() => {
                          getProjectTasks(project.id);
                          setTable(false);
                        }}
                        className="btn btn-sm flex flex-nowrap gap-2 text-custom-green-dark border-0 bg-custom-green-30 hover:bg-custom-green-dark hover:text-white"
                      >
                        <i className="bi bi-grid-1x2"></i>
                        <span>Tasks</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {!table && <div>Tasks</div>}

      {/* unarchive modal - start */}
      <dialog id="my_unarchive_modal" className="modal">
        <Toaster />
        <div className="modal-box">
          <h3 className="font-bold text-lg text-custom-green-dark text-center">
            Are you sure unarchive{" "}
            <span className="text-red-700">{selectArchiveProject.name}</span>?
          </h3>
          <div className="flex justify-center items-center gap-12 pt-10">
            <button
              onClick={() => {
                moveArchiveToProject(selectArchiveProject.id);
              }}
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-red-700 hover:text-white border-transparent"
            >
              Yes
            </button>
            <button
              onClick={() =>
                document.getElementById("my_unarchive_modal").close()
              }
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-custom-green-dark hover:text-white border-transparent"
            >
              No
            </button>
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
