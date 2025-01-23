import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import http from "../services/http";
import noneuser from "/img/noneuser.png";

function AddStaff({ setCount }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    specialist: "",
    label: "",
    workType: "full_time",
    address: "",
    accountType: "staff",
    userId: "",
    userPassword: "",
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Choose IMG file and render for visible START
  const handleFileUserImageChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
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

  // DELETE render IMG file START
  const handleClearFileUserImage = () => {
    setUserImage(null);
    document.getElementById("user-image").value = "";
    setState({ ...state, image: "" });
  };
  // DELETE render IMG file END

  const handleClearUserState = () => {
    setState({
      ...state,
      firstName: "",
      lastName: "",
      image: "",
      email: "",
      specialist: "",
      label: "",
      workType: "full_time",
      address: "",
      accountType: "staff",
      userId: "",
      userPassword: "",
    });
  };

  // Password hide/show function START
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Password hide/show function END

  // Submit Form START
  const finalSubmit = (e) => {
    e.preventDefault();
    if (state.accountType && state.userId && state.userPassword) {
      const formData = new FormData();
      formData.append("weayaa_id", state.userId);
      formData.append("password", state.userPassword);
      formData.append("first_name", state.firstName);
      formData.append("last_name", state.lastName);
      formData.append("label", state.label);
      formData.append("email", state.email);
      formData.append("speciality", state.specialist);
      formData.append("work_type", state.workType);
      formData.append("address", state.address);
      formData.append("image", state.image);
      formData.append("user_type", state.accountType);

      const access = localStorage.getItem("access");
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
            // console.log(response);
            document.getElementById("add_user_modal").close();
            const randomNum = Math.floor(Math.random() * 100);
            setCount(randomNum);
            handleClearFileUserImage();
            handleClearUserState();
            return <span>Add new user :)</span>;
          },
          error: (error) => {
            console.log(error.response.data);
            return <span>Something went wrong :(</span>;
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
        className="rounded-[10px] min-w-[125px] h-[35px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark transition-all duration-150"
        onClick={() => document.getElementById("add_user_modal").showModal()}
      >
        <i className="bi bi-person-add text-[22px] mx-[10px]"></i>
        <span className="ml-[5px] mr-[10px] text-[14px] font-semibold">
          Add Staff/Master
        </span>
      </button>
      {/* Modal Open Button END && Add New Staff */}

      <dialog id="add_user_modal" className="modal">
        <Toaster />
        <div className="modal-box max-w-3xl p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Add New Staff/Master
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <section className="px-6 py-4 text-custom-green-dark">
            <form onSubmit={finalSubmit}>

                <div className="flex gap-4 items-center">
                  
                <div className="w-[100px] h-[100px] flex justify-center items-center">

                    <img
                      src={userImage || noneuser}
                      alt="user-img"
                      className="w-[80px] h-[80px] rounded-full object-cover border border-custom-green-30"

                    />
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
                        // text is transparent
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
                    <span className="block text-[14px] mt-[5px] text-custom-green-80">
                        An image of the person, it’s best if it has the same length and height.
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
                        <span>First Name</span>
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <input
                        value={state.firstName}
                        onChange={inputHandle}
                        required
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
                        <span>Last Name</span>
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <input
                        value={state.lastName}
                        onChange={inputHandle}
                        required
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
                    <span className="block text-custom-green-dark font-semibold text-[14px]">
                      <i className="bi bi-telegram mr-1"></i>
                      <span>Telegram</span>
                    </span>
                    <label className="w-full grow p-2 border rounded-md outline-0 focus-within:border-custom-green-80 placeholder-custom-green-60 flex items-center gap-0">
                      <span>t.me/</span>
                      <input
                        value={state.address}
                        onChange={inputHandle}
                        name="address"
                        type="text"
                        placeholder="sh_shirinboyev"
                        className="w-full grow outline-0 placeholder-custom-green-60"
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        <i className="bi bi-envelope-fill mr-1"></i><span>Last Name</span>
                      </span>
                      <input
                        value={state.email}
                        onChange={inputHandle}
                        name="email"
                        type="email"
                        autoComplete="email"
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
                        <span>Specialist Staff/Master</span>
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <select
                        value={state.specialist}
                        onChange={inputHandle}
                        name="specialist"
                        required
                        placeholder="Select Specialist Stuff"
                        className="text-custom-green-dark transition-all w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                      >
                        {/* <option className="text-custom-green-60">Select specialist Staff/Master</option> */}
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
                          className="accent-custom-green-dark"
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
                          className="accent-custom-green-dark"
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
                          className="accent-custom-green-dark"
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
                          required
                          type="text"
                          autoComplete="username"
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
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            autoComplete="current-password"
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
                  
                </div>
                <button
                    type="submit"
                    className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-custom-green-dark hover:text-white bg-custom-green-10 hover:bg-custom-green-dark transition-all mt-3"
                  >
                    Save
                  </button>
            </form>
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
