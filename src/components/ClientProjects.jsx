import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ClientProjects({ clientId, setCount, setClientId }) {
  const [id, setId] = useState("");
  useEffect(() => {
    if (clientId) {
      console.log(clientId);
      setId(clientId);
      setClientId("");
      document.getElementById("SelectProjectForClient").showModal();
    }
  }, [clientId]);
  return (
    <>
      <dialog id="SelectProjectForClient" className="modal">
        <Toaster />
        <div className="modal-box max-w-xl p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Select Projects for Client
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <>
            <p className="p-5">Client ID: {id}</p>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ClientProjects;
