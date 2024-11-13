import { useState, useEffect } from "react";
// http
import http from "../services/http";
// react hot toast
import toast, { Toaster } from "react-hot-toast";

const CreateTask = ({ getActiveProjectTasks }) => {
  const activeProjectInfo = JSON.parse(localStorage.getItem("activeProject"));
  const activeProjectId = activeProjectInfo ? activeProjectInfo.id : null;
  const [taskData, setTaskData] = useState({
    name: "",
    project: activeProjectId,
    description: "",
    deadline: "",
    status: "todo",
    file: [],
    members: [10],
  });

  useEffect(() => {
    console.log(taskData);
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const [files, setFiles] = useState([]);

  useEffect(() => {
    setTaskData({ ...taskData, file: files });
  }, [files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };
  const createNewTask = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    const formData = new FormData();

    // Oddiy matn maydonlarini qo'shish
    Object.keys(taskData).forEach((key) => {
      formData.append(key, taskData[key]);
    });

    files.forEach((file) => {
      formData.append("file", file); // "file[]" yoki server kutgan boshqa nomni ishlating
    });

    toast.promise(http.post(`projects/tasks/`, formData, { headers }), {
      loading: "Adding ...",
      success: (response) => {
        console.log(response.data);
        setTaskData({
          name: "",
          project: activeProjectId,
          description: "",
          deadline: "",
          status: "todo",
          file: [],
          members: [10],
        });
        setFiles([]);
        getActiveProjectTasks();
        document.getElementById("createTask").close();
        return <b>Add New Task :)</b>;
      },
      error: (error) => {
        console.log(error.response.data);

        return <b>Error :(</b>;
      },
    });
  };

  return (
    <>
      {/* Button ===> START */}
      <div
        onClick={() => {
          document.getElementById("createTask").showModal();
        }}
        className="flex cursor-pointer items-center justify-center gap-1 py-[10px] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
      >
        <i className="bi bi-plus-circle-dotted"></i>
        Add Task
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
            <form action="" onSubmit={createNewTask}>
              <div className="rounded-md shadow-md z-50 flex flex-col gap-3 px-5 py-4 text-custom-green-dark">
                <label className="w-full">
                  <span className="text-custom-green-80 font-medium text-[14px]">
                    Task title
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={taskData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
                  />
                </label>

                <label className="w-full ">
                  <span className="text-custom-green-80 font-medium text-[14px]">
                    Task description
                  </span>
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
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
                    value={taskData.deadline}
                    onChange={handleChange}
                    className="w-full px-3 py-2 outline-none rounded-md border border-custom-green-60 focus:ring-0 text-sm font-medium"
                  />
                </label>

                <div className="flex items-center w-full">
                  <label className="w-full text-center rounded-lg cursor-pointer bg-custom-green-15  hover:bg-custom-green-30 py-3">
                    <div className="flex flex-col w-full items-center justify-center">
                      <i className="bi bi-cloud-arrow-up-fill text-2xl text-custom-green-60"></i>

                      <p className="text-sm text-custom-green-60 font-bold">
                        Choose file to upload <br /> Supported formats: JPG,
                        PNG, RAR, ZIP
                      </p>
                    </div>

                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".jpg,.png,.rar,.zip"
                      onChange={handleFileChange}
                    />

                    <div>
                      {files.length > 0 && (
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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
