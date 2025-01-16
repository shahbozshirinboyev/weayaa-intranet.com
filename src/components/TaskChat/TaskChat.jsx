import { useEffect, useRef, useState } from "react";
import TaskFileControl from "../TaskFileControl";
import http from "../../services/http";

function TaskChat({ task }) {

  const userId = localStorage.getItem('userId')
  const [oldMessages, setOldMessages] = useState([])

  useEffect(() => {
    if(!task.id) return;
    http 
      .get(`/chat/tasks/${task.id}/messages/`, { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }, })
      .then((response) => { setOldMessages(response.data.results); console.log(response.data) })
      .catch((error) => { console.log(error.response.data); });
  }, [task.id]);

  class ChatService {
    constructor() {
      this.taskId = task.id;
      this.token = localStorage.getItem("access");
      this.ws = null;
    }

    connect() {
      this.ws = new WebSocket( `wss://weayaa-intranet.com/ws/chat/task/${this.taskId}/?token=${this.token}` );

      // Add token to WebSocket handshake
      this.ws.onopen = (data) => {
        console.log(data);

        // Xabar yuborish
    // const message = { content: `Ulangan vaqtning xabari: ${new Date()}` };  // Yuboriladigan xabar
    // this.ws.send(JSON.stringify(message));  // JSON formatida yuborish
      };

      this.ws.onmessage = (old_messages) => {
        const data = JSON.parse(old_messages.data);
        console.log(data);
        // this.handleMessage(data);
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.ws.onclose = () => {
        console.log("Disconnected from chat");
        // Implement reconnection logic if needed
      };
    }

    handleMessage(data) {
      switch (data.type) {
        case "connection_established":
          console.log("Successfully connected to chat room");
          break;
        case "chat_message":
          // Handle incoming chat message
          console.log("Received message:", data.content);
          break;
        case "error":
          console.error("Error:", data.message);
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    }

    sendMessage(content) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: "message",
            content: content,
          })
        );
      } else {
        console.error("WebSocket is not connected");
      }
    }

    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    }
  }

  useEffect(() => {
    
    async function initializeChat(taskId) {
      const token = localStorage.getItem("access");
      const chat = new ChatService(taskId, token);
      chat.connect();
      return chat;
    }

    // Check if task is available and initialize chat
    if (task && task.id) {
      initializeChat(task.id);
    }
  }, [task]); // Dependency array includes task

  // --------------------------------------------
  const [reply, setReply] = useState({ id: "", user: "", message: "" });
  const [rows, setRows] = useState(1);

  const acriveReply = () => {
    setReply({
      id: "12",
      user: "Shahboz Shirnboyev",
      message:
        "Lorem ipsum shu gaplarda nima bo'lsa ham shu joyga kelganimdan xursandman",
    });
  };
  const handleClearReply = () => {
    setReply({ id: "", user: "", message: "" });
  };

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [file, setFile] = useState({ name: "", file: "", url: "" });
  const [message, setMessage] = useState({ message: "" });

  const inputHandle = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
    const text = e.target.value;
    const lineBreaks = text.split("\n").length;
    setRows(Math.min(Math.max(lineBreaks, 1), 5));
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile({
        ...file,
        name: selectedFile.name,
        file: selectedFile,
        url: URL.createObjectURL(selectedFile),
      });
    } else {
      setFile({ ...file, name: "", file: "" });
    }
  };

  const handleClearFile = () => {
    setFile({ ...file, name: "", file: "", url: "" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message, file);

    setFile({ ...file, name: "", file: "", url: "" });
    setMessage({ ...message, message: "" });
    setRows(1);
  };

  return (
    <>
      {/* TASK => Chat START */}
      <dialog id={`task_chat`} className="modal">
        <div className="modal-box h-full max-h-[700px] p-0 flex flex-col rounded-none">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[55px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Chat (Task ID: {task.id})
            </span>
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
              
              {oldMessages.map((message)=>(
                <div key={message.id} className={`chat ${String(message.sender) === String(userId) ? "chat-end" : "chat-start"} border-0 group`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJDFLehkQpFnas_gqV8aGpJTzR26MIlsatrb458vJWIFM9KZpv0HXnSRsbHJ6VjLx4I&usqp=CAU"
                      />
                    </div>
                  </div>
                  <div className={`chat-bubble  ${String(message.sender) === String(userId) ? "bg-custom-green-dark text-white" : "bg-custom-green-dark text-white"}`}>
                  <div className="flex justify-between text-xs items-center pb-1 gap-4">
                      <span className="font-bold">Tommy Kim</span>
                      <span className="text-xs opacity-60 text-end">
                        Derictor
                      </span>
                    </div>
                    <div className="chat-header rounded-md bg-white p-2 flex gap-1 text-custom-green-dark">
                      <div className="w-[4px] max-h-full bg-custom-green-dark rounded-md"></div>
                      <div>
                        <div className="flex justify-between">
                          <span className="font-bold">Tommy Kim</span>
                          <span className="text-xs opacity-60 text-end">
                            12:45 AM
                          </span>
                        </div>
                        <span className="line-clamp-1">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Dolorum, voluptatum.
                        </span>
                      </div>
                    </div>
                    <TaskFileControl
                      fileUrl={
                        "https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces.jpg"
                      }
                    />
  
                    <span>Lorem ipsum dolor sit amet, con.</span>
                    <p className="flex justify-end items-center gap-2 text-xs">
                      <span
                        onClick={acriveReply}
                        className="btn btn-xs hidden group-hover:flex justify-center items-center"
                      >
                        <i className="bi bi-reply"></i>Reply
                      </span>
                      <span>12:46 AM</span>
                    </p>
                  </div>
                </div>
              ))}


              

              

              {/* scroll to END => START */}
              <div ref={endRef}></div>
              {/* scroll to END => END */}
            </section>
          </>
          {/* Task Chat Body END */}
          {/* Chat Input START */}
          {/* selected relpy inso show --- start */}
          <div
            className={`justify-between items-center transition-all duration-300 w-full ${
              reply.id === "" ? "hidden" : ""
            } bg-white`}
          >
            <div className="bg-custom-green-dark p-1 flex gap-1 items-center justify-center">
              <div className="chat-header rounded-md bg-white p-2 flex gap-1 text-custom-green-dark">
                <div className="w-[4px] max-h-full bg-custom-green-dark rounded-md"></div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-bold">Tommy Kim</span>
                    <span className="text-xs opacity-60 text-end">
                      Derictor
                    </span>
                  </div>
                  <span className="line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum, voluptatum.
                  </span>
                </div>
              </div>
              <button
                className="btn btn-xs border-0 bg-white hover:bg-red-700 hover:text-white"
                onClick={handleClearReply}
              >
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </div>
          {/* selected relpy inso show --- end */}

          {/* selected file show section --- start */}
          <div
            className={`justify-between items-center transition-all duration-300 w-full ${
              file.name === "" ? "hidden" : ""
            } bg-white`}
          >
            <div className="bg-custom-green-dark px-3 py-2">
              <span className="text-white">{file.name}</span>
              <button
                className="btn btn-xs border-0 bg-white hover:bg-red-700 hover:text-white absolute right-3"
                onClick={handleClearFile}
              >
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </div>
          {/* selected file show section --- end */}

          <div className="min-h-[60px] bg-white w-full bottom-0 py-2 px-3 border-t-[2px] items-center flex border-custom-green-80">
            <form
              onSubmit={sendMessage}
              action=""
              className="flex w-full gap-2"
            >
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
                  onChange={handleFileChange}
                />
              </div>

              <textarea
                rows={rows}
                type="text"
                name="message"
                value={message.message}
                onChange={inputHandle}
                className="flex-grow px-2 py-1 outline-none resize-none text-sm text-custom-green-dark placeholder:text-custom-green-60"
                placeholder="Write a message..."
              />
              <button className="px-2 py-1 cursor-pointer" type="submit">
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
