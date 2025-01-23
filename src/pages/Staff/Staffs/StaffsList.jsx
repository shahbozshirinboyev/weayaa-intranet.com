import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import noneuser from "/img/noneuser.png"

// Base URL
import http from "../../../services/http";

function StaffsList() {
  const [smlist, setSmlist] = useState("staff");
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState();

  // Change Staff/Master list START
  const changeListToStaff = (e) => {
    setSmlist(e);
  };
  // Change Staff/Master list END

  // Get Users List START
  useEffect(() => {
    http
      .get("users/staff/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((response) => {
        setUsers(response.data);
        setUsersCount(response.data.length);
      })
      .catch((error) => {
        toast.error("Something went wrong :(");
        console.log(error.response.data);
      });
  }, []);
  // Get Users List END

  return (
    <>
      <div className="font-semibold bg-white pb-[15px]">
        <div className="grid grid-cols-1">
          <div className="flex justify-start items-start">
            <div className="mr-[5px] rounded-[10px] w-[260px] h-[35px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark">
              <div
                className={`w-[130px] h-[35px] bg-custom-green-dark absolute rounded-[8px] transition-all duration-300 ease-in-out transform ${
                  smlist === "staff"
                    ? "translate-x-[-65px]"
                    : "translate-x-[65px]"
                }`}
              ></div>

              <button
                onClick={() => {
                  changeListToStaff("staff");
                }}
                className={`flex justify-center items-center w-full rounded-[8px] transform  ${
                  smlist === "staff" ? "text-white" : ""
                } transition-all duration-300`}
              >
                <i className="bi bi-person text-[22px] mx-[5px]"></i>
                <span className="mx-[5px] text-[14px] font-semibold">
                  Staffs
                </span>
              </button>

              <button
                onClick={() => {
                  changeListToStaff("master");
                }}
                className={`flex justify-center items-center w-full rounded-[8px] transform ${
                  smlist === "master" ? "text-white" : ""
                } transition-all duration-300`}
              >
                <i className="bi bi-person-check text-[22px] mx-[5px]"></i>
                <span className="mx-[5px] text-[14px] font-semibold">
                  Masters
                </span>
              </button>
            </div>

            <button className="rounded-[10px] w-auto h-[35px] bg-custom-green-30 text-custom-green-dark cursor-default transition-all duration-150 hidden xl:block">
              <i className="bi bi-people pl-2 text-[22px] mx-[5px]"></i>
              <span className="text-[22px] mx-[5px]">{usersCount ? usersCount : "0"}</span>
              <span className="text-[14px] pr-[10px] font-semibold">
                Members
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-[14px] text-custom-green-90 bg-custom-green-10">
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>

              <th
                scope="col"
                className="px-6 py-3 hidden md:table-cell lg:table-cell"
              >
                Contact
              </th>

              

              <th scope="col" className="px-6 py-3">
                Position
              </th>

              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) => user.user_type === smlist)
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5"
                >
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="!w-12 !h-12 min-w-12 min-h-12 rounded-full object-cover border whitespace-nowrap"
                      src={user.image ? user.image : noneuser}
                      alt="user_image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold text-custom-green-dark">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="font-normal text-custom-green-80">
                        {user.label === null || user.label === ""
                          ? "label.undefined"
                          : user.label}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell lg:table-cell">
                  <a
                      target="_blank"
                      href={`https://t.me/${user?.address}`}
                      className="btn btn-xs text-sm border-0 font-semibold text-custom-green-dark bg-custom-green-30 hover:text-white hover:bg-sky-600"
                    >
                      <i className="bi bi-telegram"></i>
                      <span>
                        {user.address === null || user.address === ""
                          ? "telegram.undefined"
                          : user.address}
                      </span>
                    </a>
                    <div className="font-normal text-custom-green-80">
                      {user.email === null || user.email === ""
                        ? "email.undefined"
                        : user.email}
                    </div>
                  </td>


                  <td className="px-6 py-4">
                    <div className="flex items-center text-custom-green-dark font-semibold">
                      {user.speciality === null ||
                      user.speciality === "" ||
                      user.speciality === undefined
                        ? "no.position"
                        : user.speciality}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                      {user.work_type === "full_time"
                        ? "FULL-TIME"
                        : "PART-TIME"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StaffsList;
