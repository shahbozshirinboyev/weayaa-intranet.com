// Date - Luxon
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// http
import http from "../../../services/http"
import { useState, useEffect } from "react";

function CustomerNavbar({ setAccess, setRefresh, setUserType }) {
  const noneuser = "./img/noneuser.png";
  const logo_long = "./img/logo_long.png";
  const navigate = useNavigate();
  const goHome = () => { navigate("/"); };
  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat("d MMMM yyyy");

  const [clientInfo, setClientInfo] = useState([]);

  const getClientInfo = async () => {
    const clientId = localStorage.getItem("userId");
    const access = localStorage.getItem("access");
    http.get(`users/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((response) => {
        // console.log(response.data);
        setClientInfo(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  useEffect(() => {
    getClientInfo();
  }, [])
  

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
    localStorage.removeItem("endTimeAccessToken");
    localStorage.removeItem("endTimeRefreshToken");
  };
  // Logout section end
    // Logout section end
    const [daysr, setDaysr] = useState(0);
    const [hoursr, setHoursr] = useState(0);
    const [minutesr, setMinutesr] = useState(0);
    const [secondsr, setSecondsr] = useState(0);
  
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const endTimeAccessToken = localStorage.getItem("endTimeAccessToken");
        const endTimeRefreshToken = localStorage.getItem("endTimeRefreshToken");
    
        if (!endTimeAccessToken || !endTimeRefreshToken) {
          deleteUserInfo();
          clearInterval(interval);
          return;
        }
    
        const now = new Date().getTime();
        const timeLeft = parseInt(endTimeAccessToken) - now;
        const timeLeftr = parseInt(endTimeRefreshToken) - now;
    
        if (timeLeftr <= 0) {
          toast.error("Log out bo'ladi hozir !!!");
          deleteUserInfo();
          clearInterval(interval);
          return;
        }
    
        if (timeLeft <= 0) {
          http
            .post("token/refresh/", { refresh: localStorage.getItem("refresh") })
            .then((response) => {
              const newAccessToken = response.data.access;
              localStorage.setItem("access", newAccessToken);
              setAccess(newAccessToken);
              const newEndTimeAccessToken = new Date().getTime() + 30 * 60 * 1000;
              localStorage.setItem("endTimeAccessToken", newEndTimeAccessToken.toString());
              toast.success("Acces Token vaqti yangilandi!");
            })
            .catch(() => {
              toast.error("Yangi 'token' olib bo'lmadi :(");
              clearInterval(interval);
              deleteUserInfo();
            });
        }
    
        // Refresh token vaqti tugashini ekranga chiqarish
        setDaysr(Math.floor(timeLeftr / (24 * 60 * 60 * 1000)));
        setHoursr(Math.floor((timeLeftr % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));
        setMinutesr(Math.floor((timeLeftr % (60 * 60 * 1000)) / (60 * 1000)));
        setSecondsr(Math.floor((timeLeftr % (60 * 1000)) / 1000));
    
        // Access token vaqtini ekranga chiqarish
        setHours(Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));
        setMinutes(Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)));
        setSeconds(Math.floor((timeLeft % (60 * 1000)) / 1000));
      }, 1000);
    
      return () => clearInterval(interval);
    }, []);
  return (
    <div className="p-5">
      <div className="bg-custom-green-5 h-[60px] w-full rounded-[10px] flex">
        {/* Date START */}
        <div className="h-full w-full items-center ml-[10px] hidden md:flex">
          <div className="flex px-[8px] py-[4px] mx-[5px] rounded-[8px] bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white transition-all duration-100 ease-in-out cursor-pointer">
            <i className="bi bi-calendar2-week font-medium"></i>
            <p className="ml-[10px] whitespace-nowrap">{formattedDate}</p>
          </div>
          <div className="hidden justify-center items-center border ml-4 text-[14px]">
                <span className="countdown font-mono flex justify-center items-center">
                  <span style={{ "--value": hours }}></span>:
                  <span style={{ "--value": minutes }}></span>:
                  <span style={{ "--value": seconds }}></span>
                </span>
              </div>

              <div className="hidden justify-center items-center border ml-4 text-[14px]">
                <div className="flex gap-5">
                  <div>
                    <span className="countdown font-mono">
                      <span style={{ "--value": daysr }}></span>
                    </span>
                    days
                  </div>
                  <div>
                    <span className="countdown font-mono">
                      <span style={{ "--value": hoursr }}></span>
                    </span>
                    hours
                  </div>
                  <div>
                    <span className="countdown font-mono">
                      <span style={{ "--value": minutesr }}></span>
                    </span>
                    min
                  </div>
                  <div>
                    <span className="countdown font-mono">
                      <span style={{ "--value": secondsr }}></span>
                    </span>
                    sec
                  </div>
                </div>
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
              className="dropdown-content menu bg-base-100 rounded-box z-[50] w-[330px] p-2 shadow"
            >
              <li>
                <span className="hover:bg-custom-green-15">
                  <span className="flex justify-center items-center w-[40px] h-[40px] p-0 m-0">
                    <img
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      src={ clientInfo.image ||noneuser}
                    />
                  </span>
                  <span className="block">
                    <p className="w-[235px] text-[16px] font-bold whitespace-nowrap overflow-hidden truncate text-ellipsis">
                      {clientInfo.first_name}{" "}{clientInfo.last_name}
                    </p>
                    <p className="text-[14px] first-letter:uppercase">
                      {clientInfo.user_type} | {clientInfo.organization}
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
