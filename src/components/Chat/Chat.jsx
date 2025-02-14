import { useState, useEffect, useRef, Fragment } from "react";
import TaskFileControl from "../TaskFileControl";
import toast, { Toaster } from "react-hot-toast";
import noneuser from "/img/noneuser.png";
import http from "../../services/http";

function Chat({ chatOpen, setChatOpen, task }) {
  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [chatOpen]);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);

  const chatServiceRef = useRef(null);

  const [reply, setReply] = useState({
    id: "",
    user: "",
    speciality: "",
    message: "",
  });
  const [rows, setRows] = useState(1);
  const [file, setFile] = useState({ name: "", file: "", url: "" });
  const [message, setMessage] = useState({ message: "" });

  const [shouldScroll, setShouldScroll] = useState(true);

  const activeReply = (message) => {
    setReply({
      id: message.id,
      user: message.sender_details.full_name,
      speciality: message.sender_details.speciality,
      message: message.content,
      file: message.file,
    });
  };

  const handleClearReply = () => {
    setReply({ id: "", user: "", speciality: "", message: "", file: "" });
  };

  const endRef = useRef(null);
  useEffect(() => {
    if (shouldScroll) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldScroll]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (chatServiceRef.current) {
      chatServiceRef.current.sendMessage(message.message, file, reply);
    }
    setFile({ name: "", file: "", url: "" });
    setMessage({ message: "" });
    handleClearReply();
    setRows(1);
  };

  const deleteMessage = (message) => {
    if (chatServiceRef.current) {
      toast(
        (t) => (
          <span className="flex items-center justify-center gap-1 text-custom-green-dark">
            <span className="">Delete this message?</span>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                chatServiceRef.current.deleteMessage(message.id);
              }}
              className="btn btn-sm hover:bg-custom-green-dark hover:text-white border-0 bg-custom-green-30 text-custom-green-dark"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-sm hover:bg-custom-green-dark hover:text-white border-0 bg-custom-green-30 text-custom-green-dark"
            >
              Cancel
            </button>
          </span>
        ),
        {
          duration: 10000,
        }
      );
    }
  };

  const editMessage = (message) => {
    console.log(message);
    toast.success("message");
    if (chatServiceRef.current) {
      // qanaqadur funksiya yozish kerak
      // chatServiceRef.current.deleteMessage(message.id, updatedContent);
    }
  };

  const inputHandle = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
      setFile({ name: "", file: "", url: "" });
      setMessage({ message: "" });
      setRows(1); // Explicitly reset rows to 1 after sending message
    } else {
      setMessage({ ...message, [e.target.name]: e.target.value });
      const text = e.target.value;
      const lineBreaks = text.split("\n").length;
      setRows(Math.min(Math.max(lineBreaks, 1), 5));
    }
  };

  const handleFileChange = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      setFile({
        name: selectedFile.name,
        file: selectedFile,
        url: URL.createObjectURL(selectedFile),
      });
    } else {
      handleClearFile();
    }
  };

  const handleClearFile = () => {
    // Reset the file state
    setFile({ name: "", file: "", url: "" });

    // Reset the file input value
    const fileInput = document.getElementById(`fileInput${task.id}`);
    if (fileInput) {
      fileInput.value = "";
    }

    // If there was a URL created, revoke it to free up memory
    if (file.url) {
      URL.revokeObjectURL(file.url);
    }
  };

  const UploadProgress = ({ progress }) => {
    return (
      <div className="w-64">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-custom-green-dark">
            Uploading file...
          </div>
          <div className="text-sm font-semibold text-custom-green-dark">
            {progress}%
          </div>
        </div>
        <div className="w-full h-2 bg-custom-green-10 rounded-full overflow-hidden">
          <div
            className="h-full bg-custom-green-dark transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  class ChatService {
    constructor() {
      this.taskId = task.id;
      this.token = localStorage.getItem("access");
      this.ws = null;
    }
    connect() {
      this.ws = new WebSocket(
        `wss://weayaa-intranet.com/ws/chat/task/${this.taskId}/?token=${this.token}`
      );

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
          toast.error(data.error);
          console.error(data);
          break;
        case "message_deleted":
          toast.success("Message deleted!");
          setShouldScroll(false);
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== data.message_id)
          );
          break;
        default:
          setShouldScroll(true);
          setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    }

    deleteMessage(id) {
      console.log("delete__id:", id);
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: "delete_message",
            message_id: id,
          })
        );
      } else {
        console.error("WebSocket is not connected");
        toast.error("Please, re-enter the Chat Room!");
      }
    }

    editMessage(id, content) {
      console.log("edit__message__id:", id);
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: 'edit_message',
          message_id: id,
          content: content,
      }));
      } else {
        console.error("WebSocket is not connected");
        toast.error("Please, re-enter the Chat Room!");
      }
    }

    sendMessage(content, file, reply) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        if (file.name === "") {
          this.ws.send(
            JSON.stringify({
              type: "message",
              reply_to: reply.id !== "" ? reply.id : null,
              content: content,
            })
          );
        } else {
          const MAX_FILE_SIZE = 100 * 1024 * 1024;
          const taskId = task.id;
          async function uploadChatFile(taskId, file, content, reply) {
            if (file.file.size > MAX_FILE_SIZE) {
              toast.error("File too large! Max: 100MB");
              return;
            }
            console.log(file);
            const formData = new FormData();
            formData.append("file", file.file);
            if (content) {
              formData.append("content", content);
            }
            if (reply.id !== "") {
              console.log(reply.id);
              formData.append("reply_to", reply.id);
            }

            const toastId = toast.loading(<UploadProgress progress={0} />);

            try {
              const response = await http.post(
                `/chat/upload/${taskId}/`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                    "Content-Type": "multipart/form-data",
                  },
                  onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    toast.loading(<UploadProgress progress={progress} />, {
                      id: toastId,
                    });
                  },
                }
              );
              toast.success("File uploaded successfully!", { id: toastId });
              console.log(response.data);

              // Reset file input after successful upload
              const fileInput = document.getElementById(`fileInput${taskId}`);
              if (fileInput) {
                fileInput.value = "";
              }

              return response.data;
            } catch (error) {
              toast.error("There was an error uploading the file.", {
                id: toastId,
              });
              console.error("There was an error uploading the file:", error);
              throw error.response.data;
            }
          }
          uploadChatFile(taskId, file, content, reply)
            .then(() => {
              // Clear file state after successful upload
              handleClearFile();
            })
            .catch((error) => {
              console.error("Error in uploadChatFile:", error);
            });
        }
      } else {
        console.error("WebSocket is not connected");
        toast.error("Please, re-enter the Chat Room!");
      }
    }
    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    }
  }

  useEffect(() => {
    if (chatOpen && task && task.id) {
      setMessages([]);
      async function initializeChat() {
        const chat = new ChatService();
        chat.connect();
        chatServiceRef.current = chat;
        return chat;
      }

      const chatBody = document?.querySelector(".chatcss");

      if (chatBody) {
        const handleScroll = () => {
          const scrollTop = chatBody.scrollTop;
          const scrollHeight = chatBody.scrollHeight;
          const clientHeight = chatBody.clientHeight;

          setIsButtonVisible(scrollHeight - scrollTop - clientHeight < 700);
          if (scrollTop === 0) {
            setIsButtonVisible(true);
          }
        };

        handleScroll();
        initializeChat();
        chatBody.addEventListener("scroll", handleScroll);

        return () => {
          chatBody.removeEventListener("scroll", handleScroll);
          if (chatServiceRef.current) {
            chatServiceRef.current.disconnect();
          }
        };
      }
    }
  }, [chatOpen, task]);

  const renderContent = (content) => {
    const lines = content.split("\n");

    return lines.map((line, lineIndex) => {
      const words = line.split(" ");

      return (
        <Fragment key={lineIndex}>
          {words
            .map((word, wordIndex) => {
              const urlMatch = word.match(/(https?:\/\/[^\s]+)/g);
              if (urlMatch) {
                const url = urlMatch[0];
                const baseUrl = url.split("/").slice(0, 3).join("/");
                const shortUrl = `${baseUrl}/...`;

                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>
                    <a
                      href={url}
                      className="text-sky-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortUrl}
                    </a>
                  </Fragment>
                );
              }
              if (word.trim()) {
                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>{word}</Fragment>
                );
              }
              return null;
            })
            .reduce((prev, curr) => [prev, " ", curr])}
          <br />
        </Fragment>
      );
    });
  };

  const handleCloseChat = () => {
    // Close the modal
    setChatOpen(false);

    // Clear all messages
    setMessages([]);

    // Clear any active reply
    handleClearReply();

    // Clear any file upload state
    handleClearFile();

    // Clear message input
    setMessage({ message: "" });

    // Disconnect WebSocket
    if (chatServiceRef.current) {
      chatServiceRef.current.disconnect();
      chatServiceRef.current = null;
    }
  };

  return (
    <>
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex justify-center items-center">
          <Toaster />
          <div className="bg-white flex flex-col rounded-none relative shadow-md h-[800px]">
            {/* Modal header Start */}
            <div className="border-b-[2px] border-custom-green-80 grid p-3 grid-cols-2 items-center bg-custom-green-10">
              <span className="text-custom-green-dark font-bold">
                Chat (Task ID: {task.id})
              </span>
              <div className="text-end">
                <label
                  onClick={handleCloseChat}
                  className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30"
                >
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </label>
              </div>
            </div>
            {/* Modal header End */}

            {/* Task Chat Body START */}
            <>
              <section className="px-4 chatcss overflow-y-auto w-[570px] h-full">
                {messages.length === 0 && (
                  <div className="w-full h-full flex flex-col justify-center items-center text-custom-green-80">
                    <i className="bi bi-chat text-[55px]"></i>
                    <span className="font-semibold">
                      No messages here yet...
                    </span>
                  </div>
                )}

                {messages
                  .sort(
                    (b, a) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((message) => (
                    <div
                      id={message.id}
                      key={message.id}
                      className={`chat group relative rounded-md hover:bg-custom-green-15
                   ${String(message.sender) === String(userId)
                          ? "chat-end"
                          : "chat-start"
                        }`}
                    >
                      {String(message.sender) !== String(userId) && (
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt={message.sender_details.full_name}
                              src={message.sender_details.image || noneuser}
                            />
                          </div>
                        </div>
                      )}
                      <div
                        className={`chat-bubble border-0 ${String(message.sender) === String(userId)
                            ? "bg-custom-green-dark text-white"
                            : "bg-custom-green-30 text-custom-green-dark"
                          }`}
                      >
                        <div className="flex justify-between text-xs items-center pb-1 gap-4">
                          <span className="font-bold">
                            {message.sender_details.full_name}
                          </span>
                          <span className="opacity-80 text-end">
                            {String(message.sender) === String(userId)
                              ? "You"
                              : message.sender_details.speciality}
                          </span>
                        </div>
                        {/* Reply section -- start */}
                        {message.reply_to && (
                          <div
                            onClick={() => {
                              const replyMessage = document.getElementById(
                                message.reply_to
                              );
                              if (replyMessage) {
                                replyMessage.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                });
                                let count = 0;
                                const interval = setInterval(() => {
                                  replyMessage.style.backgroundColor =
                                    count % 2 === 0
                                      ? "rgba(255, 0, 0, 0.2)"
                                      : "";
                                  count++;
                                  if (count >= 8) {
                                    clearInterval(interval);
                                    replyMessage.style.backgroundColor = "";
                                  }
                                }, 200);
                              }
                            }}
                            className="cursor-pointer chat-header rounded-md bg-white p-2 flex gap-1 text-custom-green-dark"
                          >
                            <div className="w-[4px] max-h-full bg-custom-green-dark rounded-md"></div>
                            <div>
                              <div className="flex justify-between">
                                <span className="font-bold">
                                  {message.reply_to_details.sender}
                                </span>
                              </div>
                              <span className="line-clamp-1">
                                {message.reply_to_details.content}
                              </span>
                              <span
                                className={`line-clamp-1 ${message.reply_to_details.file !== null
                                    ? ""
                                    : "hidden"
                                  }`}
                              >
                                file
                              </span>
                            </div>
                          </div>
                        )}
                        {/* Reply section -- end */}

                        <TaskFileControl fileUrl={message.file} />

                        <span className={`${message.content === "" ? "hidden" : ""}`}>{renderContent(message.content)}</span>

                        <div className="flex justify-end group-hover:justify-between  items-center mt-1">
                          <button
                            onClick={() => { activeReply(message); }}
                            className={`hidden group-hover:flex justify-center items-center w-5 h-5 rounded-full
                             hover:bg-white hover:text-custom-green-dark transition-all duration-300 active:scale-90
                             ${ String(message.sender) === String(userId) ? "text-white" : "text-custom-green-dark" }`}>
                            <i className="bi bi-reply-fill flex justify-center items-center text-[14px]"></i>
                          </button>
                          <span className="text-xs font-semibold mt-1">{new Date(message.created_at).toLocaleTimeString( [], { hour: "2-digit", minute: "2-digit", hour12: false, } )}</span>
                        </div>

                      </div>
                      {/* Edit button start ---- */}
                      <button
                        onClick={() => { editMessage(message); }}
                        className={`btn btn-sm hidden group-hover:flex justify-center items-center border-0 rounded-full w-9 h-9
                                    absolute bg-custom-green-dark text-white hover:bg-custom-green-30 hover:text-custom-green-dark
                                  ${ String(message.sender) === String(userId) ? "left-1 bottom-11" : "right-1 bottom-11" }`}>
                        <i className="bi bi-pencil flex justify-center items-center text-[13px]"></i>
                      </button>
                      {/* Edit button end ---- */}
                      {/* Delete button start ---- */}
                      <button
                        onClick={() => { deleteMessage(message); }}
                        className={`btn btn-sm hidden group-hover:flex justify-center items-center border-0 rounded-full w-9 h-9
                                    absolute bg-custom-green-dark text-white hover:bg-custom-green-30 hover:text-custom-green-dark
                                  ${String(message.sender) === String(userId)
                            ? "left-1 bottom-1"
                            : "right-1 bottom-1"
                          }`}
                      >
                        <i className="bi bi-trash flex justify-center items-center text-[13px]"></i>
                      </button>
                      {/* Delete button end ---- */}
                    </div>
                  ))}

                {/* scroll to END => START */}
                <div ref={endRef}></div>
                {/* scroll to END => END */}
              </section>

              <button
                onClick={() => {
                  endRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`border-0 z-[99] active:scale-90 shadow-md p-3 bg-white absolute translate-all duration-200 bottom-20 right-6 rounded-full hover:bg-custom-green-dark text-custom-green-dark hover:text-white flex justify-center items-center ${isButtonVisible ? "hidden" : ""
                  }`}
              >
                <i className="bi bi-chevron-left -rotate-90 flex justify-center items-center text-[20px]"></i>
              </button>
            </>
            {/* Task Chat Body END */}
            {/* Chat Input START */}
            {/* selected relpy message show --- start */}
            <div
              className={`justify-between items-center transition-all duration-300 w-full ${reply.id === "" ? "hidden" : ""
                } bg-white`}
            >
              <div className="bg-custom-green-dark p-1 flex gap-1 items-center justify-center">
                <div className="chat-header rounded-md bg-white p-2 flex gap-1 text-custom-green-dark w-full">
                  <div className="w-[4px] max-h-full bg-custom-green-dark rounded-md"></div>
                  <div className="w-full">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold">{reply.user}</span>
                      <span className="text-xs opacity-60 text-end">
                        {reply.speciality}
                      </span>
                    </div>
                    <span className="line-clamp-1">{reply.message}</span>
                    <span
                      className={`line-clamp-1 ${reply.message === "" ? "" : "hidden"
                        }`}
                    >
                      file
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
            {/* <div id="progress-file" className={`bg-custom-green-30 text-custom-green-dark h-[45px] font-bold flex justify-center items-center transition-all duration-300`} ></div> */}

            <div
              className={`justify-between items-center transition-all duration-300 w-full ${file.name === "" ? "hidden" : ""
                } bg-white`}
            >
              <div className="bg-custom-green-dark px-3 py-2 h-[45px] flex justify-between items-center">
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

            <div className="h-fit bg-white w-full p-3 border-t-[2px] items-center flex border-custom-green-80">
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
                  className="flex-grow px-2 py-1 bg-transparent outline-none resize-none text-sm text-custom-green-dark placeholder:text-custom-green-60"
                  placeholder="Write a message..."
                />
                <button className="px-2 py-1 cursor-pointer" type="submit">
                  <i
                    className={`bi ${message.message === ""
                        ? "bi-send"
                        : "bi-send-fill rotate-45"
                      }
                transition-all duration-300 flex justify-center items-center text-custom-green-dark
                text-[20px]`}
                  ></i>
                </button>
              </form>
            </div>

            {/* Chat Input END */}
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
