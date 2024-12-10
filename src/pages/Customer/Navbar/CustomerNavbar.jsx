// Date - Luxon
import { DateTime } from "luxon";

function CustomerNavbar() {
  const noneuser = "..//img/noneuser.jpg";
  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat("d MMMM yyyy");
  return (
    <div className="p-5">
    <div className="bg-custom-green-5 h-[60px] w-full rounded-[10px] flex">
      
            <div className="h-full w-full flex items-center ml-[10px]">
              <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-calendar2-week font-medium"></i>
                <p className="ml-[10px] whitespace-nowrap">{formattedDate}</p>
              </div>
            </div>

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
                            src={ noneuser}
                            // alt={firstName || ""}
                          />
                        
                      </span>
                      <span className="block">
                        <p className="my-[0px] text-[16px] font-bold">
                          Customer Client
                        </p>
                        <p className="text-[14px]">
                          Customer |{" "}
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
                        // onClick={deleteUserInfo}
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

              {/* <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
                <i className="bi bi-person font-medium"></i>
              </div> */}
            </div>
          </div>

    </div>
  )
}

export default CustomerNavbar