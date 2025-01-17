import { useEffect, useRef, useState } from "react";
import TaskFileControl from "../TaskFileControl";
import http from "../../services/http";

function TaskChat({ task }) {
  
  const userId = localStorage.getItem('userId');
  const [messages, setMessages] = useState([]);
  const chatServiceRef = useRef(null);

  useEffect(() => {
    console.log(messages)
  }, [messages])
  

  class ChatService {

    constructor() {
      this.taskId = task.id;
      this.token = localStorage.getItem("access");
      this.ws = null;
    }

    connect() {
      this.ws = new WebSocket( `wss://weayaa-intranet.com/ws/chat/task/${this.taskId}/?token=${this.token}` );

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
    };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.ws.onclose = () => {
        console.log("Disconnected from chat");
      };
    }

    handleMessage(data) {
      switch (data.type) {
        case "connection_established":
          console.log("Successfully connected to chat room");
          break;
        case "chat_message":
          console.log("Received message:", data.content);
          break;
        case "error":
          console.error("Error:", data.message);
          break;
        default:
          setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    }

    sendMessage(content, file) {
       
      console.log(message, file)

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

    disconnect() { if (this.ws) { this.ws.close(); } }
  }

  useEffect(() => {

    setMessages([]);

    async function initializeChat() {
      const chat = new ChatService();
      chat.connect();
      chatServiceRef.current = chat;
      return chat;
    }

    if (task && task.id) { initializeChat(task.id); }

  }, [task]); 

  // --------------------------------------------
  const [reply, setReply] = useState({ id: "", user: "", message: "" });
  const [rows, setRows] = useState(1);

  const acriveReply = (message) => {
    setReply({
      id: message.id,
      user: message.sender_details.full_name,
      message: message.content,
    });
  };
  const handleClearReply = () => {
    setReply({ id: "", user: "", message: "" });
  };

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [file, setFile] = useState({ name: "", file: "", url: "" });
  const [message, setMessage] = useState({ message: "" });
  
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message, file);
    if (chatServiceRef.current) {
      chatServiceRef.current.sendMessage(message.message, file.file); // Use the ref to send the message
    }

    setFile({ name: "", file: "", url: "" });
    setMessage({ message: "" }); // Clear the message input
    setRows(1);
  };

  const inputHandle = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check for Enter key without Shift
      e.preventDefault(); // Prevent new line
      sendMessage(e); 
      setMessage({ message: "" });
      setFile({ name: "", file: "", url: "" });
    } else {
      setMessage({ ...message, [e.target.name]: e.target.value });
    }
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
              {messages.sort((b, a) => new Date(b.created_at) - new Date(a.created_at)).map((message) => (
                <div
                  key={message.id}
                  className={`chat group relative rounded-md hover:bg-custom-green-15  
                   ${ String(message.sender) === String(userId) ? "chat-end" : "chat-start" }`}
                >
                  {String(message.sender) !== String(userId) && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt={message.sender_details.full_name}
                          src={message.sender_details.image}
                        />
                      </div>
                    </div>
                  )}
                  <div className={`chat-bubble border-0 ${ String(message.sender) === String(userId) ? "bg-custom-green-dark text-white" : "bg-custom-green-30 text-custom-green-dark" }`} >
                    <div className="flex justify-between text-xs items-center pb-1 gap-4">
                      <span className="font-bold">{message.sender_details.full_name}</span>
                      <span className="opacity-80 text-end">{ String(message.sender) === String(userId) ? "You" : "unknown" }</span>
                    </div>
                    {/* Reply section -- start */}
                    { message.reply_to && 
                    <div className="chat-header rounded-md bg-white p-2 flex gap-1 text-custom-green-dark">

                      <div className="w-[4px] max-h-full bg-custom-green-dark rounded-md"></div>
                      <div>
                        <div className="flex justify-between">
                          <span className="font-bold">Tommy Kim</span>
                          <span className="text-xs opacity-60 text-end"> 12:45 AM </span>
                        </div>
                        <span className="line-clamp-1"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptatum. </span>
                      </div>

                    </div>
                    }
                    {/* Reply section -- end */}

                    <TaskFileControl fileUrl={message.file} />
                    {/* <TaskFileControl fileUrl={message.sender_details.image} /> */}

                    <span>{message.content}</span>

                      <p className="flex justify-end items-center gap-2 text-xs">
                        <span>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                      </p>

                  </div>
                        <div onClick={()=> {acriveReply(message)}} 
                              className={`btn btn-sm rounded-full border-0 hidden group-hover:flex justify-center items-center
                                          absolute bottom-1 bg-custom-green-dark text-white hover:bg-custom-green-30 hover:text-custom-green-dark
                                          ${ String(message.sender) === String(userId) ? "left-1" : "right-0" }`}>
                          <i className="bi bi-reply"></i>
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
          {/* selected relpy message show --- start */}
          <div className={`justify-between items-center transition-all duration-300 w-full ${ reply.id === "" ? "hidden" : "" } bg-white`} >
            <div className="bg-custom-green-dark p-1 flex gap-1 items-center justify-center">
              <div className="chat-header rounded-md bg-white p-2 flex gap-1 text-custom-green-dark">
                <div className="w-[4px] max-h-full bg-custom-green-dark rounded-md"></div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-bold">Tommy Kim</span>
                    <span className="text-xs opacity-60 text-end">Derictor</span>
                  </div>
                  <span className="line-clamp-1"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptatum. </span>
                </div>
              </div>
              <button className="btn btn-xs border-0 bg-white hover:bg-red-700 hover:text-white" onClick={handleClearReply} >
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
                onKeyDown={inputHandle}
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
