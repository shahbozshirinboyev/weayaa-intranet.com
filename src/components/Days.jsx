import React from "react";

const Days = () => {
  return (
    <>
      <div className="flex justify-between w-full ">
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-green-700 text-white text-sm font-semibold px-2 py-1 rounded-full">
            <i className="bi bi-calendar-week mr-2"></i>
            <span>2 Days</span>
          </div>
        </div>

        <div>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </>
  );
};

export default Days;
