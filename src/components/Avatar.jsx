import React, { useState } from "react";
import Avatar1 from "../../public/img/background.png";
import Avatar2 from "../../public/img/background.png";
import Avatar3 from "../../public/img/background.png";

const TaskUsers = () => {
  const users = [
    { id: 1, imgSrc: Avatar1 },
    { id: 2, imgSrc: Avatar2 },
    { id: 3, imgSrc: Avatar3 },
  ];

  const [messages, setMessages] = useState([
    { sender: 'Obi-Wan Kenobi', text: 'You were the Chosen One!', time: '12:45', align: 'start' },
    { sender: 'Anakin', text: 'I hate you!', time: '12:46', align: 'end' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: 'You', text: newMessage, time: new Date().toLocaleTimeString().slice(0, 5), align: 'end' },
      ]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => {
      return {
        file,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      };
    });
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <div className="grid grid-cols-[0.3fr_1fr] items-center">
      <button onClick={() => document.getElementById('modal_chat').showModal()}>
        <div className="flex">
          <div className="relative">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
              <i className="bi bi-chat-dots"></i>
            </div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </button>

      <dialog id="modal_chat" className="modal">
        <div className="modal-box h-full max-h-[700px] p-0 flex flex-col">

          {/* Заголовок */}
          <form method="dialog" className="border-b-[2px] border-custom-green-80 h-[60px] flex items-center justify-between px-[20px] bg-custom-green-10 w-full">
            <span className="text-custom-green-dark font-bold">Project Users</span>
            <button className="btn btn-sm border-0 btn-circle text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">✕</button>
          </form>

          <div className="p-4 overflow-y-auto flex-grow">
            {messages.map((msg, index) => (
              <div key={index} className={`chat  chat-${msg.align} mb-4 `}>
                <div className="chat-image avatar ">
                  <div className="w-10 rounded-full">
                    <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.sender}
                  <time className="text-xs opacity-50">{msg.time}</time>
                </div>
                <div className={`chat-bubble text-white ${msg.align === 'end' ? 'bg-custom-green-dark' : 'bg-custom-green-90'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {uploadedFiles.length > 0 && (
              <div className="uploaded-files mt-4">
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className={`chat chat-end bg-custom-green-dark h-28`}>
                      {file.url ? (
                   
                        <img src={file.url} alt="Uploaded" className="w-26 h-24 object-cover rounded  " />

                      ) : (
                        <span>{file.file.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Форма отправки сообщения (footer) */}
          <form className="p-3 flex items-center border-custom-green-80" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="input border border-custom-green-60 w-full mr-2 focus:border-custom-green-dark"
            />
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input hidden"
              id="fileUpload"
              multiple
            />
            <label htmlFor="fileUpload" className="btn bg-custom-green-15 text-custom-green-dark border-transparent hover:text-white hover:bg-custom-green-dark transition-all duration-300 cursor-pointer mr-2">
              📎
            </label>
            <button
              type="button"
              onClick={handleSendMessage}
              className="btn bg-custom-green-15 text-custom-green-dark border-transparent hover:text-white hover:bg-custom-green-dark transition-all duration-300"
            >
              Отправить
            </button>
          </form>
        </div>
      </dialog>

      <div className="flex justify-end">
        <div className="flex -space-x-4">
          {users.map((user) => (
            <img
              key={user.id}
              src={user.imgSrc}
              alt="Avatar пользователя"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          <div>
            <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex justify-center items-center">
              <span className="text-[12px] font-semibold text-custom-green-80"> +13 </span>
            </div>
          </div>
        </div>

        <div className="w-0.5 h-6 bg-custom-green-60 mx-1.5 mt-1"></div>

        <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center right-3">
          <i className="bi bi-plus text-[24px] text-custom-green-80"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskUsers;
