import React from "react";

function NoProject() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex  flex-col justify-center items-center">
        <i className="bi bi-folder-x text-[32px] md:text-[45px] text-custom-green-dark"></i>
        <h2 className="text-[20px] md:text-[24px] text-custom-green-dark font-semibold">
          No projects.
        </h2>
        <p className="text-[12px] md:text-[14px] text-red-700 font-semibold">
          You still don't have any active projects.
        </p>
      </div>
    </div>
  );
}

export default NoProject;
