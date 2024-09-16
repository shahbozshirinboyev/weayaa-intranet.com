import React from "react";

function MasterDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 border border-red-600">

      <div className="bg-custom-green-15 rounded-[20px] p-[15px] text-custom-green-dark">
        <h2 className="font-bold text-[20px] pb-[30px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, esse.
        </h2>
        <p className="text-justify opacity-80 font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, cumque architecto. Eveniet, corporis assumenda. Assumenda consectetur magni dicta provident voluptate debitis voluptatibus magnam fuga impedit reiciendis saepe laboriosam perferendis nulla modi, alias et a facilis sit ipsam cum ipsum laudantium necessitatibus corrupti? Aspernatur, iusto, beatae, cum sint molestias harum numquam aut quo animi rem voluptates.
        </p>

        <div className="grid grid-cols-3 pt-[20px] font-bold">
          <div className="text-start">
            <span className="mr-[5px]">
              <i class="bi bi-person-circle"></i>
            </span>
            <span>Tommy Kim</span>
          </div>

          <div className="text-center">
            <span className="mr-[5px]">
              <i class="bi bi-clock"></i>
            </span>
            <span>10:45</span>
          </div>

          <div className="text-end">
            <span className="mr-[5px]">
              <i class="bi bi-calendar-week"></i>
            </span>
            <span>7 Sep. 2024</span>
          </div>
        </div>
      </div>

      <div className="bg-custom-green-15 rounded-[20px] p-[15px] text-custom-green-dark">
        <h2 className="font-bold text-[20px] pb-[30px]">
          Congratulations to everyone, we have finished creating the website!
        </h2>
        <p className="text-justify opacity-80 font-medium">
          Lorem ipsum, dolor sit amet amet consectetur consectetur adipisicing
          elit. Rerum voluptatibus, cumque odio distinctio voluptate sit quas
          voluptatem omnis provident explicabo!
        </p>

        <div className="grid grid-cols-3 pt-[20px] font-bold">
          <div className="text-start">
            <span className="mr-[5px]">
              <i class="bi bi-person-circle"></i>
            </span>
            <span>Tommy Kim</span>
          </div>

          <div className="text-center border">
            <span className="mr-[5px]">
              <i class="bi bi-clock"></i>
            </span>
            <span>10:45</span>
          </div>

          <div className="text-end">
            <span className="mr-[5px]">
              <i class="bi bi-calendar-week"></i>
            </span>
            <span>24 Aug. 2024</span>
          </div>
        </div>
      </div>

      <div className="bg-custom-green-15 rounded-[20px] p-[15px] text-custom-green-dark">
        <h2 className="font-bold text-[20px] pb-[30px]">
          Congratulations to everyone, we have finished creating the website!
        </h2>
        <p className="text-justify opacity-80 font-medium">
          Lorem ipsum, dolor sit amet amet consectetur consectetur adipisicing
          elit. Rerum voluptatibus, cumque odio distinctio voluptate sit quas
          voluptatem omnis provident explicabo!
        </p>

        <div className="grid grid-cols-3 pt-[20px] font-bold">
          <div className="text-start">
            <span className="mr-[5px]">
              <i class="bi bi-person-circle"></i>
            </span>
            <span>Tommy Kim</span>
          </div>

          <div className="text-center border">
            <span className="mr-[5px]">
              <i class="bi bi-clock"></i>
            </span>
            <span>10:45</span>
          </div>

          <div className="text-end">
            <span className="mr-[5px]">
              <i class="bi bi-calendar-week"></i>
            </span>
            <span>24 Aug. 2024</span>
          </div>
        </div>
      </div>

      <div className="group bg-custom-green-5 hover:bg-custom-green-15 transition-all rounded-[20px] cursor-pointer border-[3px] border-dashed border-custom-green-60">
        <div className="flex items-center justify-center h-full w-full">
          <i class="bi bi-plus-circle text-[30px] group-hover:text-[35px] transition-all text-custom-green-60"></i>
        </div>
      </div>

      {/* <div className="h-[230px] bg-custom-green-15 rounded-[20px]"></div>
          <div className="h-[230px] bg-custom-green-15 rounded-[20px]"></div>
          <div className="h-[230px] bg-custom-green-15 rounded-[20px]"></div>
          <div className="h-[230px] bg-custom-green-15 rounded-[20px]"></div>
          <div className="h-[230px] bg-custom-green-15 rounded-[20px]"></div>
          <div className="h-[230px] bg-custom-green-15 rounded-[20px]"></div> */}
    </div>
  );
}

export default MasterDashboard;
