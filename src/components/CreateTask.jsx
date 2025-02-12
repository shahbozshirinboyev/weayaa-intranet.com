import { useState, useEffect, useRef } from "react";
import http from "../services/http";
import toast, { Toaster } from "react-hot-toast";

const CreateTask = ({ getActiveProjectTasks }) => {
  const formRef = useRef(null); // Form uchun reference
  const userType = localStorage.getItem("userType");
  const activeProjectInfo = JSON.parse(localStorage.getItem("activeProject"));
  const activeProjectId = activeProjectInfo ? activeProjectInfo.id : null;
  const [taskData, setTaskData] = useState({
    name: "",
    project: activeProjectId,
    description: "",
    deadline: "",
    status: "todo",
    file: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const [file, setFile] = useState([]);
  const [fileprogress, setFileProgress] = useState(0);

  useEffect(() => {
    setTaskData({ ...taskData, file: file });
  }, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files.length > 0 ? e.target.files[0] : []);
  };

  const handleRemoveFile = (e) => {
    setFile([]);
    document.getElementById("file-upload").value = "";
    e.preventDefault();
  };

  const createNewTask = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    const formData = new FormData();

    Object.keys(taskData).forEach((key) => {
      formData.append(key, taskData[key]);
    });

    toast.promise(
      http.post(`projects/tasks/`, formData, {
        headers,
        onUploadProgress: (progressEvent) => {
          let percent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          // console.log(`${percent}`);
          setFileProgress(percent);
        },
      }),
      {
        loading: "Adding ...",
        success: (response) => {
          // console.log(response);
          setTaskData({
            name: "",
            project: activeProjectId,
            description: "",
            deadline: "",
            status: "todo",
            file: [],
          });
          setFile([]);
          setFileProgress(0);
          if (formRef.current) {
            formRef.current.reset(); // Formni reset qilish
          }
          getActiveProjectTasks();
          document.getElementById("createTask").close();
          return <b>Add New Task :)</b>;
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
      {/* Button ===> START */}
      <div
        onClick={() => {
          document.getElementById("createTask").showModal();
        }}
        className={`${
          userType === "staff" || userType === "client" ? "hidden" : ""
        } flex cursor-pointer btn border-0  items-center justify-center text-custom-green-dark hover:bg-custom-green-dark hover:text-white transition-all duration-300 gap-2 w-full bg-white rounded-lg shadow-sm font-medium text-[15px]`}
      >
        <i className="bi bi-plus-lg flex justify-center items-center"></i>
        <span className="flex justify-center items-center">Add Task</span>
      </div>
      {/* Button ===> END */}

      <dialog id="createTask" className="modal">
        <Toaster />
        <div className="modal-box p-0 max-w-2xl">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Create Task
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          <>
            <form ref={formRef} action="" onSubmit={createNewTask}>
              <div className="rounded-md shadow-md z-50 flex flex-col gap-3 px-5 py-4 text-custom-green-dark">
                <label className="w-full">
                  <span className="text-custom-green-80 font-medium text-[14px]">
                    Task title
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={taskData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-80 focus:ring-0 text-sm font-medium"
                  />
                </label>

                <label className="w-full ">
                  <span className="text-custom-green-80 font-medium text-[14px]">
                    Task description
                  </span>
                  <textarea
                    name="description"
                    value={taskData.description}
                    required
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-80 focus:ring-0 text-sm font-medium"
                    rows={4}
                  ></textarea>
                </label>

                <label className="w-full">
                  <span className="text-custom-green-80 font-medium text-[14px]">
                    Task deadline
                  </span>
                  <input
                    type="date"
                    name="deadline"
                    required
                    value={taskData.deadline}
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-80 focus:ring-0 text-sm font-medium"
                  />
                </label>

                <div className="flex items-center w-full">
                  <label className="w-full text-center py-3 rounded-lg cursor-pointer relative bg-custom-green-10  transition-all duration-300 text-custom-green-80 hover:text-custom-green-dark hover:bg-custom-green-15">
                    <div
                      style={{ width: `${fileprogress}%` }}
                      className="bg-custom-green-60 h-full top-0 left-0 rounded-lg absolute transition-all duration-300 flex justify-center items-center"
                    >
                      {fileprogress !== 0 && (
                        <span className="text-white font-bold">
                          {fileprogress}%
                        </span>
                      )}
                    </div>
                    {taskData.file.length === 0 && (
                      <div className="flex flex-col w-full items-center justify-center">
                        <i className="bi bi-cloud-arrow-up-fill text-2xl"></i>
                        <p>
                          <span className="text-sm font-semibold">
                            Choose file to upload
                          </span>
                          <br />
                          <span className="text-sm">
                            Supported formats: JPG, PNG, RAR, ZIP, ...
                          </span>
                        </p>
                      </div>
                    )}

                    {taskData.file.length !== 0 && (
                      <div className="flex justify-between w-full items-center px-3">
                        <div className="text-sm flex items-center gap-2">
                          <i className="bi bi-file-earmark-fill text-3xl"></i>
                          <span className="flex flex-col justify-start">
                            <span className="flex gap-1">
                              <span className="font-semibold">File name:</span>
                              <span className="truncate max-w-[250px] md:max-w-[300px] lg:max-w-[400px] ">
                                {" "}
                                {taskData.file.name}{" "}
                              </span>
                            </span>
                            <span className="text-[13px] flex gap-1 justify-start items-center">
                              <span className="font-semibold">File size:</span>
                              <span className="truncate">
                                {(taskData.file.size / (1024 * 1024)).toFixed(
                                  2
                                )}{" "}
                                MB
                              </span>
                            </span>
                          </span>
                        </div>

                        <span
                          className="btn btn-sm bg-red-700 bg-opacity-60 hover:bg-opacity-100 flex justify-center items-center border-0 shadow-none text-white transition-all duration-300 hover:bg-red-700"
                          onClick={handleRemoveFile}
                        >
                          <i className="bi bi-x-lg flex justify-center items-center"></i>
                        </span>
                      </div>
                    )}

                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      // multiple
                      // accept=".jpg,.png,.rar,.zip"
                      accept="*/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md h-9 bg-custom-green-dark text-blue-50 font-medium"
                >
                  Submit Task
                </button>
              </div>
            </form>
          </>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CreateTask;
