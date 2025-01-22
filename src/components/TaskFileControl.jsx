import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

function TaskFileControl({ fileUrl }) {

  if (!fileUrl) { return; }

  const [open, setOpen] = useState(false);

  const fileName = fileUrl.split("/").pop();
  const fileType = fileUrl.split(".").pop().toUpperCase();


  return (
    <>
      {fileUrl && fileUrl.endsWith(".jpg") && (
        <img
          src={fileUrl}
          className="w-full max-h-[250px] rounded-lg object-cover my-1"
          onClick={() => { setOpen(true); }}
        />
      )}

      {fileUrl && fileUrl.endsWith(".png") && (
        <img
          src={fileUrl}
          className="w-full max-h-[250px] rounded-lg object-cover my-1"
          onClick={() => { setOpen(true); }}
        />
      )}

      {fileUrl && fileUrl.endsWith(".jpeg") && (
        <img
          src={fileUrl}
          className="w-full max-h-[200px] rounded-lg object-cover my-1"
          onClick={() => { setOpen(true); }}
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
