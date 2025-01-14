import React from "react";

function ArchiveProjects() {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-custom-green-dark uppercase">
              <th>Archive project Name</th>
              <th>Archive date</th>
              <th>The person who archived</th>
              <th>Unarchive</th>
            </tr>
          </thead>

          <tbody className="text-custom-green-dark">
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <i className="bi bi-file-earmark-zip text-[30px]"></i>
                  </div>
                  <div>
                    <div className="font-semibold">TopClass.Uz</div>
                    <div className="text-xs opacity-50">Task count: 23</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="font-semibold"> 24.01.2025 </span>
              </td>
              <td className="font-semibold">Tommy Kim</td>
              <th>
                <button
                  onClick={() =>
                    document.getElementById("my_unarchive_modal").showModal()
                  }
                  className="btn btn-xs flex flex-nowrap gap-2 text-custom-green-dark border-0 bg-custom-green-10 hover:bg-custom-green-dark hover:text-white"
                >
                  <i className="bi bi-folder-symlink"></i>
                  <span>Unarchive</span>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* unarchive modal - start */}
      <dialog id="my_unarchive_modal" className="modal">
        <div className="modal-box p-0">
          {/* Modal header Start */}
          <form method="dialog" className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10" >
            <span className="text-custom-green-dark font-bold">Unarchive</span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
              <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}

          <div className="p-4">
            <p>This action is not working ...</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* unarchive modal - start */}
    </>
  );
}

export default ArchiveProjects;
