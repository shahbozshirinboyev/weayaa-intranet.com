import { useState } from "react";

// img
import logo from "../../../../public/img/logo.png";

function MasterSettings() {
  const [smlist, setSmlist] = useState("profile");

  // Change Staff/Master list START
  const changeListToStaff = (e) => {
    setSmlist(e);
  };
  // Change Staff/Master list END

  return (
    <>
      {/* Top Header START */}
      <div className="font-semibold bg-custom-green-10 px-[10px] py-[10px] rounded-[5px]">
        <div className="grid grid-cols-3 justify-center items-center gap-4 text-custom-green-dark transition-all duration-300">
          {/* <div
                className={`w-[130px] h-[35px] bg-custom-green-dark absolute rounded-[8px] transition-all duration-300 ease-in-out transform ${
                  smlist === "staff"
                    ? "translate-x-[-65px]"
                    : "translate-x-[65px]"
                }`}
              ></div> */}

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
          <div className="flex border-[2px] border-custom-green-60 rounded-[5px] gap-4 mt-[25px] p-3 items-center">
            <div className="flex justify-center items-center w-[80px] h-[80px]">
              {/* <i className="bi bi-person-bounding-box text-[35px]"></i> */}
              <img
                src="https://picsum.photos/id/64/200/300"
                className="rounded-full w-[80px] h-[80px] object-cover p-1"
                alt="user_image"
              />
            </div>

            <div className="items-center">
              <div>
                <p className="font-bold text-[14px] md:text-[18px] lg:text-[20px] mb-3">
                  Image must be 300x300px - max 1 MB
                </p>
              </div>
              <div>
                <button className="border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
                  <i class="bi bi-upload mr-2"></i>
                  <span>Upload Image</span>
                </button>
                <button className="border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 text-red-500 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
                  <i class="bi bi-trash3 mr-2"></i>
                  <span>Delete Image</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 border-[2px] border-custom-green-60 rounded-[5px] gap-4 mt-[25px] p-3 items-center">
            <div className="col-span-2 text-[18px] font-bold">
              <p>Personal Information</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                First name
              </span>
              <p className="font-semibold text-[18px]">Zerda</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Last name
              </span>
              <p className="font-semibold text-[18px]">Jursinova</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Phone number:
              </span>
              <p className="font-semibold text-[18px]">+998 (97) 123 45 67</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Email Address
              </span>
              <p className="font-semibold text-[18px]">
                jursinova@gmail.com
              </p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Specialist
              </span>
              <p className="font-semibold text-[18px]">Coder</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Job time
              </span>
              <p className="font-semibold text-[18px]">Part-Time</p>
            </div>

            <div className="px-6">
              <span className="font-semibold text-[14px] opacity-60">
                Account type
              </span>
              <p className="font-semibold text-[18px]">Master</p>
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
              <i class="bi bi-upload mr-2"></i>
              <span>Upload Contract</span>
            </button>
            <button className="border px-2 py-1 bg-custom-green-30 font-semibold rounded-[5px] mr-2 text-red-500 hover:bg-custom-green-dark hover:text-white  transition-all duration-300">
              <i class="bi bi-trash3 mr-2"></i>
              <span>Delete Contract</span>
            </button>
          </div>
        </div>

        <div className="border-[2px] border-custom-green-60 bg-custom-green-30 mt-[25px] rounded-[5px] h-[400px] flex items-center justify-center">
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
              <button className="justify-end flex py-1 px-2 rounded-[5px] h-full border font-semibold bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300">
                <i class="bi bi-pencil mr-2"></i>
                <span>Edit</span>
              </button>
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

          <div className="border-[2px] border-custom-green-60 rounded-[5px] opacity-40">
            <div className="flex p-4">
              <p className="justify-start font-bold text-[24px] w-full">
                BankName Card 2
              </p>
              <button className="justify-end flex py-1 px-2 rounded-[5px] h-full border font-semibold bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300">
                <i class="bi bi-pencil mr-2"></i>
                <span>Edit</span>
              </button>
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

          <div className="border-[2px] border-custom-green-60 rounded-[5px] opacity-40">
            <div className="flex p-4">
              <p className="justify-start font-bold text-[24px] w-full">
                BankName Card 3
              </p>
              <button className="justify-end flex py-1 px-2 rounded-[5px] h-full border font-semibold bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300">
                <i class="bi bi-pencil mr-2"></i>
                <span>Edit</span>
              </button>
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

        </div>
      </div>
      {/* My Payment END */}
    </>
  );
}

export default MasterSettings;
