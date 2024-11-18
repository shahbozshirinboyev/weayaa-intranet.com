import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import MaskedInput from "react-text-mask";
import http from "../../../services/http";

export default function EditUserInfo({ personalInfo, getPersonalInfo }) {
  const [editPersonalInfo, setEditPersonalInfo] = useState({
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
    work_days: "",
    work_type: "",
  });

  useEffect(() => {
    if (personalInfo) {
      setEditPersonalInfo({
        address: personalInfo.address || "",
        email: personalInfo.email || "",
        first_name: personalInfo.first_name || "",
        id: personalInfo.id || "",
        image: personalInfo.image || "",
        label: personalInfo.label || "",
        last_name: personalInfo.last_name || "",
        phone_number: personalInfo.phone_number || "",
        speciality: personalInfo.speciality || "",
        user_type: personalInfo.user_type || "",
        weayaa_id: personalInfo.weayaa_id || "",
        work_days: personalInfo.work_days || "",
        work_type: personalInfo.work_type || "",
      });
    }
  }, [personalInfo]);

  const inputHandle = (e) => {
    setEditPersonalInfo({
      ...editPersonalInfo,
      [e.target.name]: e.target.value,
    });
  };
  const EditPersonalInformation = (e) => {
    e.preventDefault();
  
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    const sanitizedPhoneNumber = editPersonalInfo.phone_number.replace(/\s+/g, "");
    // console.log(sanitizedPhoneNumber)
  
    // FormData obyektini yaratamiz
    const formData = new FormData();
    formData.append("first_name", editPersonalInfo.first_name);
    formData.append("last_name", editPersonalInfo.last_name);
    formData.append("phone_number", sanitizedPhoneNumber);
    formData.append("address", editPersonalInfo.address);
    formData.append("email", editPersonalInfo.email);
    formData.append("label", editPersonalInfo.label);
    formData.append("speciality", editPersonalInfo.speciality);
    formData.append("work_type", editPersonalInfo.work_type);
  
    toast.promise(
      http.patch(`users/profile/`, formData, { headers }),
      {
        loading: "Edit Your Personal Info ...",
        success: (response) => {
          // console.log(response.data);
          document.getElementById("editPersonalInfo").close();
          getPersonalInfo();
          setEditPersonalInfo({
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
            work_days: "",
            work_type: "",
          })
          return <b>Done :)</b>;
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
      <button
        onClick={() => document.getElementById("editPersonalInfo").showModal()}
        className="justify-end flex py-1 px-2 rounded-[5px] font-semibold bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300"
      >
        <i className="bi bi-pencil mr-2"></i>
        Edit
      </button>

      <dialog id="editPersonalInfo" className="modal">
        <Toaster />
        <div className="modal-box max-w-3xl p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Edit Your Personal Info
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <section className="text-[14px]">
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#" onSubmit={EditPersonalInformation}>
                <div>
                  <div className="grid grid-cols-1 mt-2">
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]">
                            First Name
                            <span className="text-red-700 font-bold">*</span>
                          </span>
                          <input
                            type="text"
                            name="first_name"
                            value={editPersonalInfo.first_name}
                            onChange={inputHandle}
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
                            name="last_name"
                            value={editPersonalInfo.last_name}
                            onChange={inputHandle}
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
                            mask={[
                              "+",
                              "9",
                              "9",
                              "8",
                              " ",
                              "(",
                              /\d/,
                              /\d/,
                              ")",
                              " ",
                              /\d/,
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                              " ",
                              /\d/,
                              /\d/,
                            ]}
                            value={editPersonalInfo.phone_number}
                            onChange={inputHandle}
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
                            name="email"
                            value={editPersonalInfo.email}
                            onChange={inputHandle}
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
                            name="speciality"
                            value={editPersonalInfo.speciality}
                            onChange={inputHandle}
                            placeholder="Select Specialist Stuff"
                            className="text-custom-green-dark bg-transparent transition-all w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
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
                              type="radio"
                              name="work_type"
                              checked={
                                editPersonalInfo.work_type === "full_time"
                              }
                              value="full_time"
                              onChange={inputHandle}
                              className="accent-custom-green-dark"
                            />
                            <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                              Full Time
                            </span>
                          </label>
                          <label className="p-2 border rounded-md flex items-center">
                            <input
                              type="radio"
                              checked={
                                editPersonalInfo.work_type === "part_time"
                              }
                              name="work_type"
                              value="part_time"
                              onChange={inputHandle}
                              className="accent-custom-green-dark"
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
                            type="text"
                            name="label"
                            value={editPersonalInfo.label}
                            onChange={inputHandle}
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
                          name="address"
                          value={editPersonalInfo.address}
                          onChange={inputHandle}
                          rows="3"
                          placeholder="Enter Staff Address here ..."
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        ></textarea>
                      </label>
                    </div>
                  </div>
                  {/* Next Button Start */}
                  <div className="gap-4 grid grid-cols-1 justify-center items-center inset-x-0 bottom-[20px]">
                    <button className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all">
                      Save
                    </button>
                  </div>
                  {/* Next Button End */}
                </div>
              </form>
            </div>
          </section>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
