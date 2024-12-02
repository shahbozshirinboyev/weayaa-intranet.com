import React from "react";

function TaskChat({ task }) {
  return (
    <>
      <button
        onClick={() =>
          document.getElementById(`task_chat${task.id}`).showModal()
        }
      >
        <div className="flex">
          <div className="relative">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
              <i className="bi bi-chat-dots"></i>
            </div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </button>

      {/* TASK => Chat START */}
      <dialog id={`task_chat${task.id}`} className="modal">
        <div className="modal-box h-full max-h-[700px] p-0 flex flex-col">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">Task Chat</span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          {/* Task Chat Body START */}
          <div className="border">Task Chat</div>
          {/* Task Chat Body END */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* TASK => Chat END */}
    </>
  );
}

export default TaskChat;
