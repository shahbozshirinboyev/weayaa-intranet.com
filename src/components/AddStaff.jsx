import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MaskedInput from "react-text-mask";

// http
import http from "../services/http";

function AddStaff({ setCount }) {
  const [showPassword, setShowPassword] = useState(false);

  const [workDays, setWorkDays] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]);
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [userImage, setUserImage] = useState(null);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    image: "",
    phone: "",
    email: "",
    specialist: "",
    label: "",
    workType: "full_time",
    address: "",
    accountType: "staff",
    userId: "",
    userPassword: "",
  });

  // A function that keep changes in input START
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // A function that keep changes in input START

  // Choose IMG file and render for visible START
  const handleFileUserImageChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Choose IMG file and render for visible END

  // DELETE render ING file START
  const handleClearFileUserImage = () => {
    setUserImage(null);
    document.getElementById("user-image").value = "";
    setState({
      ...state,
      image: "",
    });
  };
  // DELETE render ING file END

  // Password hide/show function START
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Password hide/show function END

  // Function to handle checkbox change START
  const handleCheckboxChange = (index) => {
    setWorkDays((prevWorkDays) => {
      // Create a copy of the current state
      const newWorkDays = [...prevWorkDays];
      // Toggle the value at the specific index
      newWorkDays[index] = !newWorkDays[index];
      return newWorkDays;
    });
  };
  // Function to handle checkbox change END

  // Multi form next button START
  const next = () => {
    if (formNo === 1 && state.firstName && state.lastName && state.specialist) {
      setFormNo(formNo + 1);
    } else if (formNo === 2) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fillup all input field!");
    }
  };
  // Multi form back button START
  const pre = () => {
    setFormNo(formNo - 1);
  };
  // Multi form next/back button END

  const access = localStorage.getItem("access");

  // const array = [true, false, true, false, true, false, true];
  // const array = [true];

  // Submit Form START
  const finalSubmit = () => {
    console.log(state, workDays);

    // speciality[name] ni to'g'irlash
    // phone number ni to'g'irlash
    // work_days ni to'g'irlash

    if (state.accountType && state.userId && state.userPassword) {
      const formData = new FormData();
      formData.append("weayaa_id", state.userId); //1
      formData.append("password", state.userPassword); //2
      formData.append("first_name", state.firstName); //3
      formData.append("last_name", state.lastName); //4
      formData.append("label", state.label); //5
      formData.append("phone_number", state.phone.replace(/\s+/g, "")); //6
      formData.append("email", state.email); //7
      formData.append("speciality", state.specialist); //8
      formData.append("work_type", state.workType); //9
      formData.append("address", state.address); //10
      formData.append("image", state.image); //11
      // formData.append("work_days", workDays);                                   //12
      workDays.forEach((day, index) => {
        formData.append(`work_days[${index}]`, day);
      });
      formData.append("user_type", state.accountType); //13

      toast.promise(
        http.post("users/staff/", formData, {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "multipart/form-data",
          },
        }),

        {
          loading: "Adding...",

          success: (response) => {
            console.log(response);

            setState({
              firstName: "",
              lastName: "",
              image: "",
              phone: "",
              email: "",
              specialist: "",
              label: "",
              workType: "full_time",
              address: "",
              accountType: "staff",
              userId: "",
              userPassword: "",
            });
            setWorkDays([true, true, true, true, true, false, false]);
            document.getElementById("add_user_modal").close();
            setFormNo(formArray[0]);
            
            const randomNum = Math.floor(Math.random() * 100); // 0 dan 99 gacha bo'lgan random son
            setCount(randomNum);

            return <b>Add new User!</b>;
          },
          error: (error) => {
            console.log(error.response.data);

            return <b>Something went wrong :(</b>;
          },
        }
      );
    } else {
      toast.error("Please fillup all input field!");
    }
  };
  // Submit Form END

  return (
    <section>
      {/* Modal Open Button START && Add New Staff*/}
      <button
        className="rounded-[10px] w-[125px] h-[35px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark transition-all duration-150"
        onClick={() => document.getElementById("add_user_modal").showModal()}
      >
        <i className="bi bi-person-add text-[22px] mx-[5px]"></i>
        <span className="mx-[5px] text-[14px] font-semibold">Add Staff</span>
      </button>
      {/* Modal Open Button END && Add New Staff */}

      <dialog id="add_user_modal" className="modal">
        <Toaster />
        <div className="modal-box max-w-3xl h-[735px] p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Add News Staff
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <section>
            <div className="p-6 ">
              {/* Show Condition MULTI FORM 1 - 2 - 3 START */}
              <div className="flex justify-center items-center transition-all duration-300">
                {formArray.map((v, i) => (
                  <Fragment key={i}>
                    <div
                      className={`w-[35px] my-3 font-semibold rounded-full h-[35px] flex justify-center items-center
                      ${
                        formNo - 1 === i ||
                        formNo - 1 === i + 1 ||
                        formNo === formArray.length
                          ? "bg-custom-green-dark text-white"
                          : "bg-custom-green-15 text-custom-green-dark"
                      }`}
                    >
                      {v}
                    </div>
                    {i !== formArray.length - 1 && (
                      <div
                        className={`w-[85px] h-[2px] ${
                          formNo === i + 2 || formNo === formArray.length
                            ? "bg-custom-green-dark"
                            : "bg-custom-green-15"
                        }`}
                      ></div>
                    )}
                  </Fragment>
                ))}
              </div>
              {/* Show Condition MULTI FORM 1 - 2 - 3 START */}

              {/* START FORM 1 */}
              {formNo === 1 && (
                <div>
                  <div className="grid grid-cols-1 mt-2">
                    <div className="flex mt-2 gap-4 items-center">
                      <div className="w-[100px] h-[100px] flex justify-center items-center">
                        {userImage === null ? (
                          <i className="bi bi-person-bounding-box text-[35px] text-custom-green-80"></i>
                        ) : (
                          <img
                            src={userImage}
                            alt="user-image"
                            className="w-[100px] rounded-full"
                          />
                        )}
                      </div>

                      <div className="w-full">
                        <label htmlFor="">
                          {userImage && (
                            <button
                              onClick={handleClearFileUserImage}
                              className="w-[100px] px-2 py-1 mr-2 rounded-[10px] text-[14px] bg-red-400 hover:bg-red-600 text-white font-medium transition-all"
                            >
                              Delete
                            </button>
                          )}
                          <input
                            // value={state.image.data}
                            // textni rransparent qilib qo'ydim orqaga qaytganda file name ni qayta topa olmayabdi
                            name="image"
                            onChange={handleFileUserImageChange}
                            type="file"
                            id="user-image"
                            className="text-[14px] text-transparent font-medium placeholder-custom-green-60
                                      file:mr-4 file:py-1 file:px-2 file:w-[100px]
                                      file:rounded-[10px] file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-custom-green-30 file:text-custom-green-dark
                                      hover:file:bg-custom-green-dark hover:file:text-white
                                      hover:file:transition-all
                        "
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

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]">
                            First Name
                            <span className="text-red-700 font-bold">*</span>
                          </span>
                          <input
                            value={state.firstName}
                            onChange={inputHandle}
                            name="firstName"
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
                            value={state.lastName}
                            onChange={inputHandle}
                            name="lastName"
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
                            value={state.phone}
                            onChange={inputHandle}
                            name="phone"
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
                            value={state.email}
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
                            value={state.specialist}
                            onChange={inputHandle}
                            name="specialist"
                            id=""
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
                              checked={state.workType === "full_time"}
                              onChange={inputHandle}
                              type="radio"
                              name="workType"
                              value="full_time"
                            />
                            <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                              Full Time
                            </span>
                          </label>
                          <label className="p-2 border rounded-md flex items-center">
                            <input
                              checked={state.workType === "part_time"}
                              onChange={inputHandle}
                              type="radio"
                              name="workType"
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
                            value={state.label}
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
                          value={state.address}
                          onChange={inputHandle}
                          name="address"
                          id=""
                          rows="3"
                          placeholder="Enter Staff Address here ..."
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        ></textarea>
                      </label>
                    </div>
                  </div>
                  {/* Next Button Start */}
                  <div className="gap-4 grid grid-cols-1 justify-center items-center absolute inset-x-0 bottom-[20px] mx-6">
                    <button
                      onClick={next}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Next
                    </button>
                  </div>
                  {/* Next Button End */}
                </div>
              )}
              {/* END FORM 1 */}

              {/* START FORM 2 */}
              {formNo === 2 && (
                <div>
                  <div className="grid grid-cols-1">
                    <div className="mt-2">
                      <span className="text-custom-green-dark font-semibold text-[15px]">
                        Working days:
                      </span>
                    </div>

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
                          className={`mt-2 p-2 border-b-[2px] ${
                            index < 5
                              ? "border-custom-green-80"
                              : "border-custom-green-60"
                          } flex items-center`}
                        >
                          <input
                            type="checkbox"
                            checked={workDays[index]}
                            onChange={() => handleCheckboxChange(index)}
                            name={`workDays${day}`}
                          />
                          <span
                            className={`text-custom-green-${
                              index < 5 ? "dark" : "60"
                            } font-semibold text-[15px] ml-[15px]`}
                          >
                            {day}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="gap-4 grid grid-cols-2 justify-center items-center absolute inset-x-0 bottom-[20px] mx-6">
                    <button
                      onClick={pre}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={next}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* END FORM 2 */}

              {/* START FORM 3 */}
              {formNo === 3 && (
                <div>
                  <div className="text-custom-green-dark font-semibold text-[15px] mt-2">
                    <span>Account Type</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border rounded-md">
                    <div>
                      <label className="p-2 flex items-center justify-center">
                        <input
                          checked={state.accountType === "staff"}
                          onChange={inputHandle}
                          type="radio"
                          name="accountType"
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
                          checked={state.accountType === "master"}
                          onChange={inputHandle}
                          type="radio"
                          name="accountType"
                          value="master"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Master Account
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <i className="bi bi-person-check"></i> WeaYaa ID
                        </span>
                        <input
                          value={state.userId}
                          name="userId"
                          onChange={inputHandle}
                          type="text"
                          placeholder="Enter WeaYaa ID"
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        />
                      </label>
                    </div>

                    <div>
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <i className="bi bi-key"></i> Password
                        </span>
                        <div className="relative">
                          <input
                            value={state.userPassword}
                            name="userPassword"
                            onChange={inputHandle}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-0 end-0 p-2.5 rounded-full w-[30px] font-medium flex justify-center items-center text-custom-green-60 hover:text-custom-green-dark"
                          >
                            {showPassword ? (
                              <i className="bi bi-eye"></i>
                            ) : (
                              <i className="bi bi-eye-slash"></i>
                            )}
                          </button>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="gap-4 grid grid-cols-2 justify-center items-center absolute inset-x-0 bottom-[20px] mx-6">
                    <button
                      onClick={pre}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={finalSubmit}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
              {/* END FORM 3 */}
            </div>
          </section>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}

export default AddStaff;
