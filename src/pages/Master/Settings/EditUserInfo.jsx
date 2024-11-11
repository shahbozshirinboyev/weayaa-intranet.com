import MaskedInput from "react-text-mask";

export default function EditUserInfo() {
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
              <form className="space-y-4" action="#">
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
                            // value={state.phone}
                            // onChange={inputHandle}
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
                            name="specialist"
                            id=""
                            placeholder="Select Specialist Stuff"
                            className="text-custom-green-dark bg-transparent transition-all w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                          >
                            <option>Select Specialist Stuff</option>
                            <option value="coder">Coder</option>
                            <option value="designer">Designer</option>
                            <option value="manager">Manager</option>
                            <option value="director">Director && Master</option>
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
