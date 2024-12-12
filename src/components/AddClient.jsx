import { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";
import toast, { Toaster } from "react-hot-toast";

function AddClient() {
    // Password hide/show function START
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => { setShowPassword(!showPassword); };
    // Password hide/show function END
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const handleAvatar = (e) => {
      if (e.target.files[0]) {
        setAvatar({
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0]),
        });
      }
    };
    const clearAvatar = () => {
        setAvatar({ file: null, url: "" })
    }

  return (
    <>
    {/* Modal Open Button START */}
      <div className="ml-[10px]">
        <button
          className="rounded-[10px] min-w-[125px] h-[35px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark transition-all duration-150"
          onClick={() => document.getElementById("add_client_modal").showModal()}
        >
          <i className="bi bi-person-add text-[22px] mx-[5px]"></i>
          <span className="mx-[5px] text-[14px] font-semibold">Add Client</span>
        </button>
      </div>
    {/* Modal Open Button END */}

      <dialog id="add_client_modal" className="modal">
        <Toaster />
        <div className="modal-box max-w-3xl p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Add New Client
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <>
          <form action="">
            <div className="px-6 py-4 text-custom-green-dark">

              <div className="grid grid-cols-1">
                <div className="flex gap-4 items-center">
                  <div className="w-[100px] h-[100px] flex justify-center items-center">
                      <img
                        src={avatar.url || "./img/noneuser.png"}
                        alt="user-image"
                        className="w-[80px] h-[80px] rounded-full object-cover border border-custom-green-30"
                      />
                  </div>
                  <div className="w-full">
                    <label htmlFor="">
                      {avatar.url && (
                        <button
                            onClick={clearAvatar}
                          className="w-[100px] px-2 py-1 mr-2 rounded-[10px] text-[14px] bg-red-400 hover:bg-red-600 text-white font-medium transition-all"
                        >
                          Delete
                        </button>
                      )}
                      <input
                        onChange={handleAvatar}
                        type="file"
                        id="file"
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
                        First Name
                        <span className="text-red-700 font-bold">*</span>
                      </span>
                      <input
                        // value={state.firstName}
                        // onChange={inputHandle}
                        // name="firstName"
                        autoComplete="username"
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
                        // value={state.lastName}
                        // onChange={inputHandle}
                        // name="lastName"
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
                        mask={[ "+", "9", "9", "8", " ", "(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, ]}
                        // value={state.phone}
                        // onChange={inputHandle}
                        // name="phone"
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
                        // value={state.email}
                        // onChange={inputHandle}
                        // name="email"
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
                    <span className="block text-custom-green-dark font-semibold text-[14px]">
                      Account Type
                    </span>
                    <div className="grid grid-cols-1">
                      <label className="p-2 border rounded-md flex items-center accent-custom-green-dark">
                        <input
                          type="radio"
                          defaultChecked 
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Client
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                        {/* <i className="bi bi-envelope"></i>  */}
                        Organization
                      </span>
                      <input
                        // value={state.email}
                        // onChange={inputHandle}
                        // name="email"
                        type="text"
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
                        <i className="bi bi-person-check"></i> WeaYaa ID
                      </span>
                      <input
                        //   value={state.userId}
                        //   name="userId"
                        //   onChange={inputHandle}
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
                          // value={state.userPassword}
                        //   name="userPassword"
                          // onChange={inputHandle}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
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
                <button className="btn mt-3 text-custom-green-dark">
                    Save
                </button>
              </div>
              {/* Next Button Start */}
              {/* <div className="gap-4 grid grid-cols-1 justify-center items-center absolute inset-x-0 bottom-[20px] mx-6">
                    <button
                      onClick={next}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Next
                    </button>
                  </div> */}
              {/* Next Button End */}
            </div>
            </form>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddClient;
