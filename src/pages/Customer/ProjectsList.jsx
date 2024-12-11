import { NavLink } from "react-router-dom";

function ProjectsList() {
  return (
    <div className="w-full flex flex-col">
      {/* Map Project Lis Start */}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="bg-custom-green-5 w-full h-[60px] rounded-[5px] flex mb-4">
          <div className="p-2 h-full">
            <div className="flex h-full justify-start px-4 w-[250px] items-center bg-custom-green-30 text-custom-green-dark font-semibold rounded-[5px]">
              <i className="bi bi-folder mr-4 text-[18px] flex justify-center items-center"></i>
              <p>Project Name {index}</p>
            </div>
          </div>

          <div className="p-2 h-full hidden md:flex">
            <div className="flex h-full justify-start px-4  items-center bg-custom-green-30 text-custom-green-dark font-semibold rounded-[5px]">
              <i className="bi bi-calendar4-week mr-4 text-[18px] flex justify-center items-center"></i>
              <p>2024-12-25</p>
              <p className="bg-custom-green-dark text-white justify-end ml-4 px-2 py-1 rounded-[5px]">
                {index} days left
              </p>
            </div>
          </div>

          <div className="p-2 h-full hidden lg:flex">
            <div className="flex h-full justify-start px-4 items-center bg-custom-green-30 text-custom-green-dark font-semibold rounded-[5px]">
              <i className="bi bi-people mr-4 text-[18px] flex justify-center items-center"></i>
              <p>7 Staff are Working</p>
            </div>
          </div>

          <div className="p-2 h-full ml-auto">
            <NavLink to="projectstatus" className="flex h-full justify-start px-4 items-center bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300 text-custom-green-dark font-semibold rounded-[5px]">
              <i className="bi bi-box-arrow-in-right text-[18px] flex justify-center items-center"></i>
            </NavLink>
          </div>
        </div>
      ))}

      {/* Map Project Lis END */}
    </div>
  );
}

export default ProjectsList;
