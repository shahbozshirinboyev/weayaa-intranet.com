// Date - Luxon
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CustomerNavbar({ setAccess, setRefresh, setUserType }) {
  const noneuser = "./img/noneuser.png";
  const logo_long = "./img/logo_long.png";
  const navigate = useNavigate();
  const goHome = () => {navigate("/");};
  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat("d MMMM yyyy");

    // Logout section start
    const deleteUserInfo = () => {
      toast("You are logged out!", { icon: "✌️" });
      setAccess(null);
      setRefresh(null);
      setUserType(null);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("userType");
      localStorage.removeItem("activeProject");
      localStorage.removeItem("userId");
      navigate("/");
    };
    // Logout section end
  return (
    <div className="p-5">
      <div className="bg-custom-green-5 h-[60px] w-full rounded-[10px] flex">
      {/* Date START */}
        <div className="h-full w-full items-center ml-[10px] hidden md:flex">
          <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
            <i className="bi bi-calendar2-week font-medium"></i>
            <p className="ml-[10px] whitespace-nowrap">{formattedDate}</p>
          </div>
        </div>
        {/* Date END */}
        {/* Home = Logo START */}
        <div className="group h-full w-full flex items-center justify-start md:justify-center transition-all px-4 duration-300">
          <div className="flex bg-custom-green text-custom-green-dark transition-all duration-100 ease-in-out cursor-pointer">
            <img
              src={logo_long}
              alt=""
              className="w-[170px] group-hover:hidden"
            />
            <button onClick={goHome} className="w-full h-full hidden group-hover:block transition-all duration-300 font-medium px-3 py-1 rounded-[5px] text-custom-green-dark hover:text-white bg-custom-green-30 hover:bg-custom-green-dark">
              <i className="bi bi-house mr-2"></i>
              <span>Home</span>
            </button>
          </div>
        </div>
        {/* Home = Logo END */}
        {/* Notification and Dropdown Menu START */}
        <div className="flex justify-end items-center w-full mr-[10px]">
          <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
            <i className="bi bi-bell font-medium"></i>
          </div>

          <div className="dropdown dropdown-bottom dropdown-end mx-[5px] w-[32px] h-[32px] text-custom-green-dark font-medium cursor-pointer">
            <i
              tabIndex="0"
              role="button"
              className="bi bi-person font-medium w-[32px] h-[32px] rounded-[8px] bg-custom-green-30 hover:bg-custom-green-dark flex justify-center items-center hover:text-white transition-all duration-100 ease-in-out"
            ></i>

            <ul
              tabIndex="0"
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[330px] p-2 shadow"
            >
              <li>
                <span className="hover:bg-custom-green-15">
                  <span className="mr-[10px] flex justify-center items-center">
                    <img
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      src={noneuser}
                      // alt={firstName || ""}
                    />
                  </span>
                  <span className="block">
                    <p className="my-[0px] text-[16px] font-bold">
                      Full Name
                    </p>
                    <p className="text-[14px]">
                      Client | Organization
                      {/* {speciality === undefined ? "undefined" : speciality} */}
                    </p>
                  </span>
                </span>
              </li>

              <li className="">
                <span
                  className="text-custom-green-dark hover:text-white hover:bg-custom-green-dark"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <i className="bi bi-box-arrow-right font-semibold text-[20px]"></i>
                  <button className="text-left">Logout</button>
                </span>
              </li>
            </ul>

            <dialog id="my_modal_1" className="modal overflow-hidden">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Log Out</h3>
                <p className="py-4">Are you sure you want to Logout?</p>
                <div className="modal-action flex justify-center items-center">
                  <button
                    onClick={deleteUserInfo}
                    className="btn w-[70px] hover:text-white hover:bg-custom-green-dark bg-custom-green-30 text-custom-green-dark"
                  >
                    Yes
                  </button>

                  <form method="dialog">
                    <button className="btn w-[70px] hover:text-white hover:bg-custom-green-dark bg-custom-green-30 text-custom-green-dark">
                      No
                    </button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
        {/* Notification and Dropdown Menu END */}
      </div>
    </div>
  );
}

export default CustomerNavbar;
