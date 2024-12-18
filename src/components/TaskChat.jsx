import { useEffect, useRef, useState } from "react";

function TaskChat({ task }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const showTaskInfo = () => {
    console.log(task);
  };

  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState({
    message: "",
  });

  const inputHandle = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };
  const handleClearFile = () => {
    setFileName("");
    document.getElementById("fileInput").value = "";
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    setFileName("");
    document.getElementById("fileInput").value = "";
    setMessage({ message: "" });
  };

  return (
    <>
      {/* Chat button START */}
      <button onClick={() => { document.getElementById(`task_chat${task.id}`).showModal(); showTaskInfo();}}>
        <div className="flex">
          <div className="relative">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center"> <i className="bi bi-chat-dots"></i> </div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </button>
      {/* Chat button END */}

      {/* TASK => Chat START */}
      <dialog id={`task_chat${task.id}`} className="modal z-50 border-red-700">
        <div className="modal-box h-full max-h-[700px] p-0 flex flex-col rounded-none">

          {/* Modal header Start */}
          <form method="dialog" className="border-b-[2px] border-custom-green-80 h-[55px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10">
            <span className="text-custom-green-dark font-bold">Chat (Task ID: {task.id})</span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          {/* Task Chat Body START */}
          <>
          <section className="px-4 chatcss overflow-y-auto h-[585px]">
            

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-custom-green-30 text-black">
                You were the Chosen One!
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>

            <div className="chat chat-end">
              <div className="chat-header">
                Anakin <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-custom-green-dark text-white">
                I love you!
              </div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
    

            

           

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-custom-green-30 text-black">
                Okay!
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-custom-green-30 text-black">
                Okay!
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>


            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-custom-green-30 text-black">
                Okay!
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-custom-green-30 text-black">
                Okay!
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-custom-green-30 text-black">
                Okay!
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>

            <div className="chat chat-end border-0">
              <div className="chat-header border-0">
                Anakin <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-custom-green-dark text-white">
                Yeap!
              </div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>


            {/* scroll to END => START */}
            <div ref={endRef}></div>
            {/* scroll to END => END */}
          </section>
          </>
          {/* Task Chat Body END */}
          {/* Chat Input START */}

          <div className={`justify-between items-center transition-all duration-300 absolute w-full top-[55px] ${fileName === "" ? "hidden" : ""} bg-white`}>
            <div className="bg-custom-green-dark px-3 py-2">
              <span className="text-white">{fileName}</span>
              <button className="btn btn-xs border-0 bg-white hover:bg-red-700 hover:text-white absolute right-3" onClick={handleClearFile}>
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </div>

          <div className="h-[60px] absolute w-full bottom-0 py-2 px-3 border-t-[2px] items-center flex border-custom-green-80">
            <form onSubmit={sendMessage} action="" className="flex w-full gap-2">
              <div className="flex items-center gap-4">
                <label
                  htmlFor={`fileInput${task.id}`}
                  className="px-2 py-1 h-full cursor-pointer"
                >
                  <i className="bi bi-paperclip flex justify-center text-custom-green-dark items-center h-full text-[20px]"></i>
                </label>
                <input
                  type="file"
                  id={`fileInput${task.id}`}
                  className="hidden"
                  onChange={handleFileChange} // Faylni tanlashda ishlaydi
                />
              </div>

              <textarea
              rows={1}
                type="text"
                name="message"
                value={message.message}
                onChange={inputHandle}
                className="flex-grow px-2 py-1 outline-none resize-none text-sm text-custom-green-dark placeholder:text-custom-green-60"
                placeholder="Write a message..."
              />
              <button className="px-2 py-1 cursor-pointer">
                <i
                  className={`bi ${
                    message.message === ""
                      ? "bi-send"
                      : "bi-send-fill rotate-45"
                  } transition-all duration-300 flex justify-center items-center text-custom-green-dark  text-[20px]`}
                ></i>
              </button>
            </form>
          </div>

          {/* Chat Input END */}
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
