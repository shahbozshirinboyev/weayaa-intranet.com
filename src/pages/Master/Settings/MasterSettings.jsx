import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

// noneuser
import noneuser from "/img/noneuser.png";

// img
import logo from "../../../../public/img/logo.png";
import EditUserInfo from "./EditUserInfo";
import EditCardInfo from "./EditCardInfo";
import AddCard from "./AddCard";

// http
import http from "../../../services/http";

function MasterSettings() {
  const [smlist, setSmlist] = useState("profile");

  // Change Staff/Master list START
  const changeListToStaff = (e) => {
    setSmlist(e);
  };
  // Change Staff/Master list END

  const [personalInfo, setPersonalInfo] = useState([]);

  const getPersonalInfo = () => {
    const userId = localStorage.getItem("userId");
    http
      .get(`users/staff/${userId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((response) => {
        setPersonalInfo(response.data);
      })
      .catch((error) => {
        console.error("Get data error:", error);
      });
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);

  // Delete User Profile IMG
  const deleteUserProfileImg = () => {
    // const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("image", ""); // Bo'sh qiymatni image maydoniga qo'shish

    toast.promise(
      http.patch(`users/staff/${localStorage.getItem("userId")}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Deleting ...",
        success: (response) => {
          document.getElementById("deleteUserImg").close();
          getPersonalInfo();
          return <b>Delete :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);

          return <b>Error :(</b>;
        },
      }
    );
  };

  // Upload New User Profile IMG
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Tanlangan fayl
    if (file) {
      // console.log("Tanlangan fayl:", file);
      UploadNewUserImg(file);
    }
  };

  const UploadNewUserImg = (file) => {
    // const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("image", file); // Bo'sh qiymatni image maydoniga qo'shish

    toast.promise(
      http.patch(`users/staff/${localStorage.getItem("userId")}/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        "Content-Type": "multipart/form-data",
      }),
      {
        loading: "Uploading ...",
        success: (response) => {
          // document.getElementById("deleteUserImg").close();
          getPersonalInfo();
          return <b>Upload New IMG :)</b>;
        },
        error: (error) => {
          console.log(error.response.data);

          return <b>Error :(</b>;
        },
      }
    );
  };

  return (
    <>
      {/* Top Header START */}
      <div className="font-semibold bg-custom-green-10 px-[10px] py-[10px] rounded-[5px]">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center items-center gap-4 text-custom-green-dark transition-all duration-300">
          <button
            onClick={() => {
              changeListToStaff("profile");
            }}
            className={`flex justify-center items-center w-full rounded-[5px] transform transition-all duration-300 bg-custom-green-30
              ${smlist === "profile" ? "text-white bg-custom-green-dark" : ""}
            `}
          >
            <i className="bi bi-person text-[22px] mx-[5px]"></i>
            <span className="mx-[5px] text-[14px] font-semibold hidden md:flex">
              My Profile
            </span>
          </button>

          <button
            onClick={() => {
              changeListToStaff("contract");
            }}
            className={`flex justify-center items-center w-full rounded-[5px] transform transition-all duration-300 bg-custom-green-30
              ${smlist === "contract" ? "text-white bg-custom-green-dark" : ""}
            `}
          >
            <i className="bi bi-card-text text-[22px] mx-[5px]"></i>
            <span className="mx-[5px] text-[14px] font-semibold hidden md:flex">
              My Contract
            </span>
          </button>

          <button
            onClick={() => {
              changeListToStaff("payment");
            }}
            className={`flex justify-center items-center w-full rounded-[5px] transform transition-all duration-300 bg-custom-green-30
              ${smlist === "payment" ? "text-white bg-custom-green-dark" : ""}
            `}
          >
            <i className="bi bi-credit-card-2-back text-[22px] mx-[5px]"></i>
            <span className="mx-[5px] text-[14px] font-semibold hidden md:flex">
              My Payment
            </span>
          </button>
        </div>
      </div>
      {/* Top Header END */}

      {/* My Profile START */}
      <div
        className={` ${
          smlist === "profile" ? "block" : "hidden"
        } px-[10px] py-[10px] rounded-[5px] mt-[25px] text-custom-green-dark`}
      >
        <div>
          <p className="font-bold">Profile Information</p>
          <span className="font-semibold opacity-70">
            These are your personal details, they are visible on your public
            profile
          </span>
        </div>

        <div>
          <div className="flex border-[2px] border-custom-green-15 rounded-[5px] gap-4 mt-[25px] p-3 items-center">
            <div className="flex justify-center items-center w-[80px] h-[80px]">
              {/* <i className="bi bi-person-bounding-box text-[35px]"></i> */}
              <img
                src={personalInfo.image ? personalInfo.image : noneuser}
                className="rounded-full w-[80px] h-[80px] object-cover p-1"
                alt={personalInfo.speciality}
              />
            </div>

            <div className="items-center">
              <div>
                <p className="font-bold text-[14px] md:text-[18px] lg:text-[20px] mb-3">
                  Image must be 300x300px - max 1 MB
                </p>
              </div>
              <div>
                <form action="" className="inline-block">
                  <label className=" flex border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
                    <i className="bi bi-upload mr-2"></i> Upload Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </form>
                {/* <button className="border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
                  <i className="bi bi-upload mr-2"></i>
                  <span>Upload Image</span>
                </button> */}
                <button
                  onClick={() =>
                    document.getElementById("deleteUserImg").showModal()
                  }
                  className={`border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 text-red-500 hover:bg-custom-green-dark hover:text-white  transition-all duration-300 ${
                    personalInfo.image ? "" : "hidden"
                  }`}
                >
                  <i className="bi bi-trash3 mr-2"></i>
                  <span>Delete Image</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 border-[2px] border-custom-green-15 rounded-[5px] gap-4 mt-[25px] p-3 items-center">
            <div className="col-span-2 text-[18px] font-bold grid grid-cols-2">
              <p>Personal Information</p>
              <div className="flex justify-end">
                <EditUserInfo personalInfo={personalInfo} getPersonalInfo={getPersonalInfo} />
              </div>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                First name
              </span>
              <p className="font-semibold text-[18px]">
                {personalInfo.first_name}
              </p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Last name
              </span>
              <p className="font-semibold text-[18px]">
                {personalInfo.last_name}
              </p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Phone number:
              </span>
              <p className="font-semibold text-[18px]">
                {personalInfo.phone_number}
              </p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Email Address
              </span>
              <p className="font-semibold text-[18px]">{personalInfo.email}</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Specialist
              </span>
              <p className="font-semibold text-[18px]">
                {personalInfo.speciality}
              </p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Job time
              </span>
              <p className="font-semibold text-[18px]">
                {personalInfo.work_type === "part_time"
                  ? "PART-TIME"
                  : personalInfo.work_type === "full_time"
                  ? "FULL-TIME"
                  : ""}
              </p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Account type
              </span>
              <p className="font-semibold text-[18px]">
                {personalInfo.user_type
                  ? personalInfo.user_type.replace(/^./, (char) =>
                      char.toUpperCase()
                    )
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* My Profile END */}

      {/* My Contract START */}
      <div
        className={` ${
          smlist === "contract" ? "block" : "hidden"
        } py-[10px] px-[10px] rounded-[5px] mt-[25px] text-custom-green-dark`}
      >
        <div>
          <p className="font-bold">Contract</p>
          <span className="font-semibold opacity-70">
            These are your contracts, they are visible on only your public
            profile
          </span>
        </div>

        <div className="grid grid-cols-1  border-[2px] border-custom-green-60 rounded-[5px] p-3 mt-[25px]">
          <div className="flex justify-center items-center mb-4">
            <p className="font-bold text-[22px]">Your Contract is here</p>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div>
              <img
                src="https://picsum.photos/id/64/200/300"
                className="rounded-full w-[80px] h-[80px] object-cover p-1"
                alt=""
              />
            </div>

            <div>
              <i className="bi bi-arrow-left-right"></i>
            </div>

            <div>
              <i className="bi bi-file-earmark-check text-[50px]"></i>
            </div>

            <div>
              <i className="bi bi-arrow-left-right"></i>
            </div>

            <div>
              <img
                src={logo}
                className="w-[80px] h-[80px] object-contain p-1"
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-center items-center m-2">
            <button className="border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
              <i className="bi bi-upload mr-2"></i>
              <span>Upload Contract</span>
            </button>
            <button className="border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 text-red-500 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
              <i className="bi bi-trash3 mr-2"></i>
              <span>Delete Contract</span>
            </button>
          </div>
        </div>

        <div className="border-[2px] border-custom-green-60 bg-custom-green-30 mt-[25px] rounded-[5px] h-[200px] flex items-center justify-center">
          <div className="grid grid-cols-1 text-center">
            <p className="text-[70px] font-bold">PDF</p>
            <span className="font-semibold opacity-70">PDF file open here</span>
          </div>
        </div>
      </div>
      {/* My Contract END */}

      {/* My Payment START */}
      <div
        className={` ${
          smlist === "payment" ? "block" : "hidden"
        } px-[10px] py-[10px] rounded-[5px] mt-[25px] text-custom-green-dark`}
      >
        <div>
          <p className="font-bold">Profile Information</p>
          <span className="font-semibold opacity-70">
            These are your personal details, they are visible on your public
            profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[25px] gap-4">
          <div className="border-[2px] border-custom-green-60 rounded-[5px]">
            <div className="flex p-4">
              <p className="justify-start font-bold text-[24px] w-full">
                BankName Card 1
              </p>

              <EditCardInfo />
            </div>

            <div className="flex p-4 h-[150px] items-end">
              <div className="w-full">
                <p className="font-bold text-[18px] text-custom-green-80">
                  Zerda Jursinova
                </p>
                <span className="font-semibold">6789 6346 3426 3467</span>
              </div>
              <div>
                <span className="font-semibold">03/12</span>
              </div>
            </div>
          </div>

          <div className="border-[2px] border-custom-green-60 rounded-[5px] flex justify-center items-center">
            <AddCard />
          </div>
        </div>
      </div>
      {/* My Payment END */}

      {/* Delete IMG modal start */}
      <dialog id="deleteUserImg" className="modal">
        <Toaster />
        <div className="modal-box">
          <h3 className="font-bold text-lg text-custom-green-dark text-center">
            Are you sure delete your profile IMG?
          </h3>
          <div className="flex justify-center items-center gap-12 pt-10">
            <button
              onClick={deleteUserProfileImg}
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-red-700 hover:text-white border-transparent"
            >
              Yes
            </button>
            <button
              onClick={() => document.getElementById("deleteUserImg").close()}
              className="btn w-[70px] text-custom-green-dark bg-custom-green-15 hover:border-transparent hover:bg-custom-green-dark hover:text-white border-transparent"
            >
              No
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>No</button>
        </form>
      </dialog>
      {/* Delete IMG modal end */}
    </>
  );
}

export default MasterSettings;
