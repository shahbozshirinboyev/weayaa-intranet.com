import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

function TaskFileControl({ fileUrl }) {
  if (!fileUrl) { return null; }
  const [open, setOpen] = useState(false);
  const getCleanFileName = (url) => {
    try {
      const pathPart = url.split('?')[0];
      const fileName = pathPart.split('/').pop();
      return decodeURIComponent(fileName);
    } catch (error) {
      return 'file';
    }
  };

  const fileName = getCleanFileName(fileUrl);
  const fileType = fileName.split(".").pop().toUpperCase();
  const isImage = /\.(jpg|jpeg|png)$/i.test(fileName);

  return (
    <>
      {isImage && (
        <div className="relative">
          <div onClick={() => setOpen(true)}
            className="w-full h-full opacity-0 hover:opacity-100 bg-black rounded-lg bg-opacity-55 absolute top-0 left-0 flex justify-center items-center transition-all duration-300">
            <i className="bi bi-search text-white text-[20px]"></i>
          </div>
          <img
            src={fileUrl}
            alt={fileName}
            className="w-full max-h-[250px] rounded-lg object-cover my-1 border border-custom-green-10"
            onClick={() => setOpen(true)}
          />
        </div>
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
            target="_blank"
            href={fileUrl}
            download={fileName}
            className="flex justify-center items-center border-custom-green-10 border h-full w-[45px] px-2 py-1 rounded-md text-custom-green-dark hover:bg-custom-green-dark hover:border-transparent hover:text-white transition-all duration-300"
          >
            <i className="bi bi-download"></i>
          </a>
        </div>
      </div>

      <Lightbox
        className="z-[999999]"
        open={open}
        plugins={[Zoom]}
        close={() => setOpen(false)}
        slides={[{ src: fileUrl }]}
        carousel={{ finite: true }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          scrollToZoom: true,
        }}
      />
    </>
  );
}

export default TaskFileControl;
