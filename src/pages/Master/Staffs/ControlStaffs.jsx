import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import AddStaff from "../../../components/AddStaff";
import MaskedInput from "react-text-mask";
// nonuser img
import noneuser from "/img/noneuser.png";
// Base URL
import http from "../../../services/http";
import AddClient from "../../../components/AddClient";
import EditClientInfo from "../../../components/EditClientInfo";
import ClientProjects from "../../../components/ClientProjects";

function ControlStaffs() {
  const [smlist, setSmlist] = useState("staff");
  const [users, setUsers] = useState([]);
  console.log(users)
  const [usersCount, setUsersCount] = useState();
  const [clientId, setClientId] = useState('')
  const [clientIdProject, setClientIdProject] = useState('')

  const [editUserId, setEditUserId] = useState("");
  useEffect(() => {
    if (editUserId !== "") {
      console.log(editUserId);
      users
        .filter((user) => user.id === editUserId)
        .map((user) => console.log(user));
    }
  }, [editUserId]);

  // Change Staff/Master list START
  const changeListToStaff = (e) => {
    setSmlist(e);
  };
  // Change Staff/Master list END
  const [count, setCount] = useState(0);
  // Get Users List START
  useEffect(() => {
    http
      .get("users/staff/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((response) => {
        // console.log(response.data)
        setUsers(response.data);
        setUsersCount(response.data.length);
      })
      .catch((error) => {
        toast.error("Something went wrong :(");
        console.log(error.response.data);
      });
  }, [count]);
  // Get Users List END


  // =====================================================================================================================>
  const [editUserInfo, setEditUserInfo] = useState({
    address: "",
    email: "",
    first_name: "",
    id: "",
    image: "",
    label: "",
    last_name: "",
    phone_number: "",
    speciality: "",
    user_type: "",
    weayaa_id: "",
    work_days: [true, true, true, true, true, false, false],
    work_type: "",
  });
  const [editUserImage, setEditUserImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // console.log(JSON.stringify(editUserInfo, null, 2));
  }, [editUserInfo]);

  useEffect(() => {
    setEditUserImage(editUserInfo.image);
  }, [editUserInfo]);

  // set userInfo functiontrue
  const getInfoUser = (id) => {
    toast.promise(
      http.get(`users/staff/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      }),
      {
        loading: "Loading ...",
        success: (response) => {
          console.log(response.data);

          setEditUserInfo(response.data);
          document.getElementById("editUserInfoModal").showModal();

          return <b>Success :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);

          return <b>Error :(</b>;
        },
      }
    );
    console.log("bu obyekt:" + editUserInfo);
    setFirstImageValue(editUserInfo.image);
  };

  // Password hide/show function START
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Password hide/show function END

  // DELETE render ING file START
  const handleClearFileUserImage = () => {
    document.getElementById("edit-user-image").value = "";
    setEditUserInfo({ ...editUserInfo, image: "" });
  };
  // DELETE render ING file END

  // Choose IMG file and render for visible START
  const handleFileUserImageChange = (e) => {
    setEditUserInfo({
      ...editUserInfo,
      [e.target.name]: e.target.files[0],
    });
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Choose IMG file and render for visible END
  const inputHandle = (e) => {
    setEditUserInfo({ ...editUserInfo, [e.target.name]: e.target.value });
  };
  const inputHandlePhone = (e) => {
    setEditUserInfo({
      ...editUserInfo,
      [e.target.name]: e.target.value.replace(/\s+/g, ""),
    });
  };
  const inputHandleWorkDays = (e) => {
    const index = parseInt(e.target.name.match(/\d+/)[0]); // indexni olish
    const updatedWorkDays = [...editUserInfo.work_days];
    updatedWorkDays[index] = e.target.checked; // checked qiymatini qo'yish
    setEditUserInfo({ ...editUserInfo, work_days: updatedWorkDays });
  };

  const editUserInfoSubmit = (e) => {
    e.preventDefault();
    const updatedUserInfo =
      typeof editUserInfo.image === "string" &&
        editUserInfo.image !== "" &&
        editUserInfo.image !== null &&
        editUserInfo.image.startsWith("https://")
        ? (({ image, ...rest }) => rest)(editUserInfo) // image maydonini olib tashlaymiz
        : editUserInfo;

    console.log("End of Data: ", updatedUserInfo);

    toast.promise(
      http.patch(`users/staff/${updatedUserInfo.id}/`, updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      }),
      {
        loading: "Loading ...",
        success: (response) => {
          console.log(response.data);

          document.getElementById("editUserInfoModal").close();
          setCount(count + 1);
          setEditUserInfo({
            address: "",
            email: "",
            first_name: "",
            id: "",
            image: "",
            label: "",
            last_name: "",
            phone_number: "",
            speciality: "",
            user_type: "",
            weayaa_id: "",
            work_days: [true, true, true, true, true, true, true],
            work_type: "",
          });
          return <b>Save :)</b>;
        },
        error: (error) => {
          console.log(error.response);
          return <b>Error :(</b>;
        },
      }
    );
  };

  // ===================================================================>

  return (
    <>
      <ClientProjects clientId={clientIdProject} setCount={setCount} setClientId={setClientIdProject} />
      <EditClientInfo clientId={clientId} setCount={setCount} setClientId={setClientId} />
      <div className="font-semibold bg-white pb-[15px]">
        <div className="grid grid-cols-2">
          <div className="flex justify-start items-start">

            <div className="mr-[5px] rounded-[10px] w-[390px] h-[35px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark">

              <div
                className={`w-[130px] h-[35px] bg-custom-green-dark absolute rounded-[8px] transition-all duration-300 ease-in-out transform 
                ${smlist === "staff" ? "translate-x-[-130px]" : smlist === "master" ? "translate-x-[0px]" : "translate-x-[130px]"}`}
              ></div>

              <button
                onClick={() => { changeListToStaff("staff"); }}
                className={`flex justify-center items-center w-full rounded-[8px] transform transition-all duration-300 ${smlist === "staff" ? "text-white" : ""}`}
              >
                <i className="bi bi-person text-[22px] mx-[5px]"></i>
                <span className="mx-[5px] text-[14px] font-semibold">Staffs</span>
              </button>

              <button
                onClick={() => { changeListToStaff("master"); }}
                className={`flex justify-center items-center w-full rounded-[8px] transform transition-all duration-300 ${smlist === "master" ? "text-white" : ""}`}
              >
                <i className="bi bi-person-gear text-[22px] mx-[5px]"></i>
                <span className="mx-[5px] text-[14px] font-semibold">Masters</span>
              </button>

              <button
                onClick={() => { changeListToStaff("client"); }}
                className={`flex justify-center items-center w-full rounded-[8px] transform transition-all duration-300 ${smlist === "client" ? "text-white" : ""}`}
              >
                <i className="bi bi-person-check text-[22px] mx-[5px]"></i>
                <span className="mx-[5px] text-[14px] font-semibold">Clients</span>
              </button>

            </div>

            <button className="rounded-[10px] w-auto h-[35px] bg-custom-green-30 text-custom-green-dark cursor-default transition-all duration-150 hidden xl:block">
              <i className="bi bi-people pl-2 text-[22px] mx-[5px]"></i>
              <span className="text-[22px] mx-[5px]">{usersCount}</span>
              <span className="text-[14px] pr-[10px] font-semibold">Members</span>
            </button>
          </div>

          <div className="flex justify-end items-center">
            <div className="flex">
              <AddStaff setCount={setCount} />
              <AddClient setCount={setCount} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className={`w-full text-sm text-left ${smlist === "client" ? "hidden" : ""}`}>
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

              {/* <th
                scope="col"
                className="px-6 py-3 hidden md:hidden lg:table-cell"
              >
                Working Days
                Active
              </th> */}

              <th scope="col" className="px-6 py-3">
                Position
              </th>

              <th scope="col" className="px-6 py-3">
                 Work type
              </th>

              <th scope="col" className="px-6 py-3">
                Setting
              </th>

            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) => user.user_type === smlist && user.user_type !== "client")
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
                    <a target="_blank" href={`https://t.me/${user?.address}`} className="btn btn-xs text-sm border-0 font-semibold text-custom-green-dark bg-custom-green-30 hover:text-white hover:bg-sky-600">
                      <i className="bi bi-telegram"></i>
                      <span>{user.address === null || user.address === "" ? "telegram.undefined" : user.address}</span>
                    </a>
                    <div className="font-normal text-custom-green-80">
                      {user.email === null || user.email === ""
                        ? "email.undefined"
                        : user.email}
                    </div>
                  </td>

                  {/* <td className="px-6 h-full py-4 hidden md:hidden lg:table-cell ">
                    <div className="flex">
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[0]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          }  font-semibold`}
                      >
                        M
                      </div>
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[1]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          } font-semibold`}
                      >
                        T
                      </div>
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[2]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          } font-semibold`}
                      >
                        W
                      </div>
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[3]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          } font-semibold`}
                      >
                        T
                      </div>
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[4]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          } font-semibold`}
                      >
                        F
                      </div>
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[5]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          }  font-semibold`}
                      >
                        S
                      </div>
                      <div
                        className={` mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center ${user.work_days[6]
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-30 text-custom-green-dark"
                          } font-semibold`}
                      >
                        S
                      </div>
                    </div>
                    <span className="font-semibold text-custom-green-dark">On</span>
                  </td> */}

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

                  <td className="px-6 py-4 justify-start items-center">
                    <button
                      onClick={() => getInfoUser(user.id)}
                      className="btn btn-sm text-custom-green-dark hover:bg-custom-green-dark bg-custom-green-30 hover:text-white border-0">
                      <i className="bi bi-sliders"></i>
                    </button>
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
        <table className={`w-full text-sm text-left ${smlist === "client" ? "" : "hidden"}`}>
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

              <th
                scope="col"
                className="px-6 py-3 hidden md:hidden lg:table-cell"
              >
                Organization
              </th>

              <th scope="col" className="px-6 py-3">
                Project
              </th>

              <th scope="col" className="px-6 py-3">
                Setting
              </th>

            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) => user.user_type === smlist && user.user_type === "client")
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
                        Client
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell lg:table-cell">
                    {/* <div className="text-base font-semibold text-custom-green-dark">
                      {user.phone_number === null || user.phone_number === ""
                        ? "+998 (--) --- -- --"
                        : user.phone_number}
                    </div> */}
                    <a target="_blank" href={`https://t.me/${user?.address}`} className="btn btn-xs text-sm border-0 font-semibold text-custom-green-dark bg-custom-green-30 hover:text-white hover:bg-sky-600">
                      <i className="bi bi-telegram"></i>
                      <span>{user.address === null || user.address === "" ? "telegram.undefined" : user.address}</span>
                    </a>
                    <div className="font-normal text-custom-green-80">
                      {user.email === null || user.email === ""
                        ? "email.undefined"
                        : user.email}
                    </div>
                  </td>

                  <td className="px-6 h-full py-4 hidden md:hidden lg:table-cell ">
                    <div className="flex text-custom-green-dark font-semibold">
                      <div>{user.organization || "org.undefined"}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button onClick={() => setClientIdProject(user.id)} className="btn btn-sm bg-custom-green-30 text-custom-green-dark hover:bg-custom-green-dark hover:text-white border-0">
                      <i className="bi bi-folder-symlink"></i>
                      <span className="hidden xl:block">Projects Status</span>
                    </button>
                  </td>

                  <td className="px-6 py-4 justify-start items-center">
                    {/* Button Client User Info Edit START */}
                    <button onClick={() => setClientId(user.id)}
                      className="btn btn-sm text-custom-green-dark bg-custom-green-30 hover:bg-custom-green-dark hover:text-white border-0">
                      <i className="bi bi-sliders"></i>
                    </button>
                    {/* Button Client User Info Edit END */}
                    {/* <EditClientInfo clientId={user.id} setCount={setCount} /> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Info Start */}
      <>
        <dialog id="editUserInfoModal" className="modal text-custom-green-dark">
          <Toaster />
          <div className="modal-box w-11/12 max-w-5xl p-0">
            {/* Modal header Start */}
            <form
              method="dialog"
              className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
            >
              <span className="text-custom-green-dark font-bold">
                Edit User Information
              </span>
              <div className="text-end">
                <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                  <i className="bi bi-x-lg flex justify-center items-center"></i>
                </button>
              </div>
            </form>
            {/* Modal header End */}

            <form className="px-[24px]">
              <div className="grid grid-cols-1 mt-2">
                <div className="flex mt-2 gap-4 items-center">
                  <div className="w-[100px] h-[100px] min-w-[100px] min-h-[100px] flex justify-center items-center">
                    {editUserImage === "" || editUserImage === null ? (
                      <i className="bi bi-person-bounding-box text-[35px] text-custom-green-80"></i>
                    ) : (
                      <img
                        src={editUserImage}
                        alt="user-image"
                        className="w-[100px] h-[100px] min-w-[100px] min-h-[100px] object-cover rounded-full border"
                      />
                    )}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">
                      {!(editUserImage === null || editUserImage === "") && (
                        <button
                          type="button"
                          onClick={handleClearFileUserImage}
                          className="w-[100px] px-2 py-1 mr-2 rounded-[10px] text-[14px] bg-red-400 hover:bg-red-600 text-white font-medium transition-all"
                        >
                          Delete
                        </button>
                      )}
                      <input
                        // value={editUserInfo.image}
                        // textni transparent qilib qo'ydim orqaga qaytganda file name ni qayta topa olmayabdi
                        name="image"
                        onChange={handleFileUserImageChange}
                        type="file"
                        id="edit-user-image"
                        className="text-[14px] text-transparent font-medium placeholder-custom-green-60 file:mr-4 file:py-1 file:px-2 file:w-[100px] file:rounded-[10px] file:border-0 file:text-sm file:font-semibold file:bg-custom-green-30 file:text-custom-green-dark hover:file:bg-custom-green-dark hover:file:text-white hover:file:transition-all"
                      />
                    </label>
                    <span className="block mt-[5px] text-custom-green-80">
                      An image of the person, it’s best if it has the same
                      length and height.
                      <br />
                      <span className="text-custom-green-dark font-medium">
                        Recommendation: 300x300px
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-custom-green-dark font-semibold opacity-80 text-[15px] mt-2">
                    <span>Account Type</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border rounded-md pointer-events-none cursor-not-allowed opacity-80">
                    <div>
                      <label className="p-2 flex items-center justify-center">
                        <input
                          className="accent-custom-green-dark"
                          checked={editUserInfo.user_type === "staff"}
                          onChange={inputHandle}
                          type="radio"
                          name="user_type"
                          value="staff"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Staff Account
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="p-2 flex items-center justify-center">
                        <input
                          className="accent-custom-green-dark"
                          checked={editUserInfo.user_type === "master"}
                          onChange={inputHandle}
                          type="radio"
                          name="user_type"
                          value="master"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Master Account
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="pointer-events-none cursor-not-allowed opacity-80">
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <i className="bi bi-person-check"></i> WeaYaa ID
                        </span>
                        <input
                          value={editUserInfo.weayaa_id}
                          name="weayaa_id"
                          onChange={inputHandle}
                          type="text"
                          placeholder="Enter WeaYaa ID"
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        />
                      </label>
                    </div>

                    <div className="pointer-events-none cursor-not-allowed opacity-80">
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <i className="bi bi-key"></i> Password
                        </span>
                        <div className="relative">
                          <input
                            name="userPassword"
                            // value={state.userPassword}
                            // onChange={inputHandle}
                            type={showPassword ? "text" : "password"}
                            placeholder="* * * * * * * * * *"
                            autoComplete="username"
                            className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-0 end-0 p-2.5 rounded-full w-[30px] font-medium flex justify-center items-center text-custom-green-60 hover:text-custom-green-dark"
                          >
                            {true ? (
                              <i className="bi bi-eye"></i>
                            ) : (
                              <i className="bi bi-eye-slash"></i>
                            )}
                          </button>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        First Name
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <input
                        value={editUserInfo.first_name}
                        onChange={inputHandle}
                        name="first_name"
                        type="text"
                        placeholder="Enter Staff First Name"
                        className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        Last Name
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <input
                        value={editUserInfo.last_name}
                        onChange={inputHandle}
                        name="last_name"
                        type="text"
                        placeholder="Enter Staff Last Name"
                        className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        <i className="bi bi-telephone"></i> Phone Number
                      </span>
                      <MaskedInput
                        // prettier-ignore
                        mask={["+", "9", "9", "8", " ", "(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/,]}
                        value={editUserInfo.phone_number}
                        onChange={inputHandlePhone}
                        name="phone_number"
                        type="text"
                        placeholder="+998 (--) --- -- --"
                        // alwaysShowMask={true}
                        className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        <i className="bi bi-envelope"></i> Email Address
                      </span>
                      <input
                        value={editUserInfo.email}
                        onChange={inputHandle}
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        Specialist Stuff
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <select
                        value={editUserInfo.speciality}
                        onChange={inputHandle}
                        name="speciality"
                        placeholder="Select Specialist Stuff"
                        className="text-custom-green-dark transition-all w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      >
                        <option>Select Specialist Stuff</option>
                        <option value="Coder">Coder</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director && Master</option>
                      </select>
                    </label>
                  </div>
                  <div>
                    <span className="block text-custom-green-dark font-semibold text-[14px]">
                      Type
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="p-2 border rounded-md flex items-center">
                        <input
                          className="accent-custom-green-dark"
                          checked={editUserInfo.work_type === "full_time"}
                          onChange={inputHandle}
                          type="radio"
                          name="work_type"
                          value="full_time"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Full Time
                        </span>
                      </label>
                      <label className="p-2 border rounded-md flex items-center">
                        <input
                          className="accent-custom-green-dark"
                          checked={editUserInfo.work_type === "part_time"}
                          onChange={inputHandle}
                          type="radio"
                          name="work_type"
                          value="part_time"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Part Time
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-2">
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        Enter Specialist Stuff
                      </span>
                      <input
                        value={editUserInfo.label}
                        onChange={inputHandle}
                        name="label"
                        type="text"
                        placeholder="Example: 3D Designer | Frontend developer | Backend developer"
                        className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-2">
                  <label>
                    <span className="block text-custom-green-dark font-semibold text-[14px]">
                      Address
                    </span>
                    <textarea
                      value={editUserInfo.address}
                      onChange={inputHandle}
                      name="address"
                      id=""
                      rows="2"
                      placeholder="Enter Staff Address here ..."
                      className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                    ></textarea>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 pointer-events-none cursor-not-allowed select-none opacity-80">
                <div className="mt-2">
                  <span className="text-custom-green-dark font-semibold text-[15px]">
                    Working days:
                  </span>
                </div>

                <div className="border border-custom-green-20 rounded-[5px] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day, index) => (
                    <div key={index}>
                      <label
                        className={`p-2 ${index < 5
                          ? "border-custom-green-80"
                          : "border-custom-green-60"
                          } flex items-center`}
                      >
                        <input
                          className="accent-custom-green-dark"
                          type="checkbox"
                          checked={
                            editUserInfo.work_days &&
                              editUserInfo.work_days[index] !== undefined
                              ? editUserInfo.work_days[index]
                              : false
                          }
                          onChange={inputHandleWorkDays}
                          name={`work_days[${index}]`}
                        />
                        <span
                          className={`text-custom-green-${index < 5 ? "dark" : "60"
                            } font-semibold text-[15px] ml-[15px]`}
                        >
                          {day}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="rounded-[5px] py-2 w-full my-4 bg-custom-green-30 text-custom-green-dark font-bold hover:bg-custom-green-dark hover:text-white transition-all duration-300"
                  onClick={editUserInfoSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("editUserInfoModal").close();
                  }}
                  className="border rounded-[5px] py-2 w-full my-4 bg-custom-green-30 text-custom-green-dark font-bold hover:bg-custom-green-dark hover:text-white transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>

          {/* outsida close button start */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
          {/* outsida close button end */}
        </dialog>
      </>
      {/* Edit User Info End */}
    </>
  );
}

export default ControlStaffs;
