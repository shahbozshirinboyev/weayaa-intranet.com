/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddSecondModal from "./AddSecondModal";

const CreateTask = ({ isOpen, onClose, setOpen, handleAddTask }) => {
  const initialTaskData = {
    id: uuidv4(),
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    image: "",
    alt: "",
    tags: [],
  };
  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColors();
      const newTag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = () => {
    handleAddTask(taskData);
    closeModal();
  };

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <>
      <dialog id="createTask" className="modal">
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
            <div className=" bg-white rounded-lg shadow-md z-50 flex flex-col gap-3 px-5 py-6 ">
              <label className="w-full">
                <span className="text-custom-green-60">Task title</span>
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className="w-full h-12 px-3 outline-none rounded-md bg-custo border border-border-custom-green-80  hover:border-green-600 focus:ring-0 text-sm font-medium"
                />
              </label>

              <label className="w-full ">
                <span className="text-custom-green-60"> Task description</span>
                <textarea
                  className="w-full rounded-md border border-custom-green-80 focus:outline-none focus:ring-0"
                  rows={5}
                  id=""
                ></textarea>
              </label>

              <label className="w-full">
                <span className="text-custom-green-60">Task deadline</span>
                <input
                  type="date"
                  className="w-full h-12 px-3 outline-none rounded-md bg-custo border border-green-500 hover:border-green-600 focus:border-green-600 focus:ring-0 focus:outline-none text-sm font-medium"
                />
              </label>

              <div className="flex items-center w-full ">
                <label className="w-full text-center border-2 border-dashed border-custom-green-60 rounded-lg cursor-pointer bg-custom-green-15  hover:bg-custom-green-30">
                  <div className=" p-1 flex flex-col w-full items-center justify-center">
                    <div>
                      {" "}
                      <i className="bi bi-cloud-arrow-up-fill text-xl text-custom-green-60 "></i>
                    </div>

                    <p className=" text-sm text-custom-green-60">
                      <span className="font-semibold">Drag & Drop or </span>
                      Choose file to upload
                    </p>
                    <p className="text-[11px] text-custom-green-40">
                      Supported formats: JPG, PNG, RAR, ZIP
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

                  <div className="mt-4">
                    {" "}
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

              <AddSecondModal />

              <button
                className="w-full mt-3 rounded-md h-9 bg-custom-green-dark text-blue-50 font-medium"
                onClick={handleSubmit}
              >
                Submit Task
              </button>
            </div>
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
