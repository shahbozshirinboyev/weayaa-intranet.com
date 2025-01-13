import React from "react";

function ArchiveProjects() {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Archive Project Name</th>
              <th>Archive date</th>
              <th>The person who archived</th>
              <th>Unarchive</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://e7.pngegg.com/pngimages/107/310/png-clipart-computer-icons-betterzip-file-archiver-others-7z-winzip-thumbnail.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-sm flex gap-2">
                  <i className="bi bi-folder-symlink"></i>
                  <span>Unarchive</span>
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://e7.pngegg.com/pngimages/107/310/png-clipart-computer-icons-betterzip-file-archiver-others-7z-winzip-thumbnail.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                Carroll Group
                <br />
                <span className="badge badge-ghost badge-sm">
                  Tax Accountant
                </span>
              </td>
              <td>Red</td>
              <th>
                <button className="btn btn-sm flex gap-2">
                  <i className="bi bi-folder-symlink"></i>
                  <span>Unarchive</span>
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://e7.pngegg.com/pngimages/107/310/png-clipart-computer-icons-betterzip-file-archiver-others-7z-winzip-thumbnail.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
                <br />
                <span className="badge badge-ghost badge-sm">
                  Office Assistant I
                </span>
              </td>
              <td>Crimson</td>
              <th>
                <button className="btn btn-sm flex gap-2">
                  <i className="bi bi-folder-symlink"></i>
                  <span>Unarchive</span>
                </button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://e7.pngegg.com/pngimages/107/310/png-clipart-computer-icons-betterzip-file-archiver-others-7z-winzip-thumbnail.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
                <br />
                <span className="badge badge-ghost badge-sm">
                  Community Outreach Specialist
                </span>
              </td>
              <td>Indigo</td>
              <th>
                <button className="btn btn-sm flex gap-2">
                  <i className="bi bi-folder-symlink"></i>
                  <span>Unarchive</span>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ArchiveProjects;
