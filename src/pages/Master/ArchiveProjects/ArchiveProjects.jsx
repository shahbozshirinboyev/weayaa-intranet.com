import { useState, useEffect } from "react";
import http from "../../../services/http";
import toast, { Toaster } from "react-hot-toast";
import archivefoldericon from "/img/archive-folder.png";
import TaskFileControl from "../../../components/TaskFileControl";
import { Fragment } from "react";
import Chat from "../../../components/Chat/Chat";

function ArchiveProjects() {

  const [chatOpen, setChatOpen] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [selectArchiveProject, setSelectArchiveProject] = useState([]);

  const [task, setTask] = useState([]);

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
  const clearColumns = () => {
    setColumns({
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
    })
  }
  // console.log("columns: ", columns);

  const getProjectTasks = (id) => {
    // console.log("project_id: ", id);
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

  const renderContent = (content) => {
    // Yangi qatorlarni ajratish
    const lines = content.split("\n");

    return lines.map((line, lineIndex) => {
      // Har bir qatorni bo'shliqlarga bo'lish
      const words = line.split(" ");

      return (
        <Fragment key={lineIndex}>
          {words
            .map((word, wordIndex) => {
              const urlMatch = word.match(/(https?:\/\/[^\s]+)/g);
              if (urlMatch) {
                const url = urlMatch[0];
                const baseUrl = url.split("/").slice(0, 3).join("/"); // Asosiy URL
                const shortUrl = `${baseUrl}/...`; // Qisqartirilgan ko'rinish

                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>
                    <a
                      href={url}
                      className="text-sky-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortUrl}
                    </a>
                  </Fragment>
                );
              }
              // Agar so'z bo'sh bo'lmasa, uni ko'rsatamiz
              if (word.trim()) {
                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>{word}</Fragment>
                );
              }
              // Agar so'z bo'sh bo'lsa, hech narsa qaytarmaymiz
              return null;
            })
            .reduce((prev, curr) => [prev, " ", curr])}
          <br /> {/* Har bir qator oxirida <br /> qo'shamiz */}
        </Fragment>
      );
    });
  };

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

      {!table && (
        <>
        <div className="bg-custom-green-10 h-[50px] w-full rounded-[10px] p-2 mb-[20px] flex justify-end items-center">
        <button
          onClick={() => { setTable(true); clearColumns(); }}
          className="btn btn-sm border-0 bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark"
        >
          <i className="bi bi-arrow-left-circle flex justify-center items-center"></i>
          <span className="pr-1">Back</span>
        </button>
      </div>
          <div className="grid grid-cols-4 gap-4 p-4 bg-custom-green-10 rounded-[10px] min-w-[1400px]">
            {Object.entries(columns).map(([columnId, column]) => (
              <div className="flex flex-col" key={columnId}>
                {/* Column Header */}
                <div className="grid grid-cols gap-3 items-center mb-4 w-full">
                  <div className="flex justify-between p-2 py-[10px] w-full bg-white rounded-lg shadow-sm text-custom-green-dark text-[15px] font-extrabold">
                    <span>{column.name}</span>
                    <div className="bg-custom-green-30 text-center text-custom-green-dark rounded-md">
                      <span className="px-2 py-1">{column.items.length}</span>
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex flex-col gap-3">
                  {column.items?.map((task) => (
                    <div
                      className="w-full p-3 bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-lg"
                      key={task.id}
                    >
                      {/* Task Header */}
                      <div className="flex justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center bg-custom-green-15 text-custom-green-dark text-sm font-semibold px-2 py-1 rounded-md">
                            <i className="bi bi-calendar-week mr-2 flex justify-center items-center"></i>
                            <span>{task.deadline}</span>
                          </div>
                        </div>

                        <div>
                        <button
                                    className="btn !w-8 !h-8 btn-sm rounded-full flex justify-center items-center relative bg-custom-green-10 text-custom-green-dark hover:bg-custom-green-dark hover:text-white border-0"
                                    onClick={() => { setChatOpen(true); setTask(task); }}>
                                    <i className="bi bi-chat-text flex justify-center items-center"></i>
                                    {/* <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div> */}
                                  </button>
                        </div>

                      </div>

                      {/* Task Body */}
                      <div className="w-full flex items-start flex-col gap-1">
                        <span className="text-[15.5px] font-medium text-custom-green-90">
                          {task.name}
                        </span>
                        <span className="text-[13.5px] text-custom-green-80 break-all">
                          {renderContent(task.description)}
                        </span>
                      </div>

                      {/* Task Footer */}
                      <div className="w-full">
                        <TaskFileControl fileUrl={task.file} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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

      <Chat chatOpen={chatOpen} setChatOpen={setChatOpen} task={task} />
    </>
  );
}

export default ArchiveProjects;
