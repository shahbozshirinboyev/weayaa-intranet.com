function TaskFileControl({ fileUrl }) {
  if (!fileUrl) {
    return;
  }

  const fileName = fileUrl.split("/").pop();
  const fileType = fileUrl.split(".").pop().toUpperCase();

  // console.log(fileType, fileName);
  return (
    <>
      {fileUrl && fileUrl.endsWith(".jpg") && (
        <img
          src={fileUrl}
          alt=""
          className="w-full max-h-[250px] rounded-lg object-cover"
        />
      )}

      {fileUrl && fileUrl.endsWith(".png") && (
        <img
          src={fileUrl}
          alt=""
          className="w-full max-h-[250px] rounded-lg object-cover"
        />
      )}

      {fileUrl && fileUrl.endsWith(".jpeg") && (
        <img
          src={fileUrl}
          alt=""
          className="w-full max-h-[200px] rounded-lg object-cover"
        />
      )}

      <div className="w-full px-2 py-[5px] border flex justify-between items-center rounded-md border-custom-green-10 bg-white">
        <div className="text-custom-green-dark font-bold h-full w-[45px] px-2 py-1">
          {fileType}
        </div>
        <div className="max-w-[200px] text-[14px] px-2">
          <p className="truncate text-custom-green-dark">{fileName}</p>
        </div>
        <div>
          <a
            href={fileUrl}
            download={fileName}
            className="flex justify-center items-center border-custom-green-10 border h-full w-[45px] px-2 py-1 rounded-md text-custom-green-dark hover:bg-custom-green-dark hover:border-transparent hover:text-white transition-all duration-300"
          >
            <i className="bi bi-download"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default TaskFileControl;
