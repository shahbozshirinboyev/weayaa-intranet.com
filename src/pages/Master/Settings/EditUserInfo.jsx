import { useState } from "react";
import MaskedInput from "react-text-mask";

export default function EditUserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleModal = () => {
    if (isOpen) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 800);
    } else {
      setIsOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="justify-end flex py-1 px-2 rounded-[5px] font-semibold bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300"
        type="button">
        <i className="bi bi-pencil mr-2"></i>
        Edit
      </button>

      {isOpen && (
        <div
          onClick={toggleModal}
          className={`bg-black bg-opacity-50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full max-h-full flex overflow-y-auto transition-all duration-300 ${isAnimating ? "opacity-100" : "opacity-0"
            }`}
        >
          <div
          onClick={(event) => {event.stopPropagation();}}
            className={`relative p-4 w-11/12 max-w-5xl transition-transform duration-300 transform ${isAnimating ? "translate-y-0" : "translate-y-10"
              }`}
          >
            <div className="bg-white rounded-lg shadow">
              <div className="bg-custom-green-5 rounded-lg">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-custom-green-dark dark:text-white">
                    Add
                  </h3>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <i className="bi bi-x-lg text-custom-green-dark"></i>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <form className="space-y-4" action="#">


                    <div>
                      <div className="grid grid-cols-1 mt-2">
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <label>
                              <span className="block text-custom-green-dark font-semibold text-[14px]">
                                First Name
                                <span className="text-red-700 font-bold">
                                  *
                                </span>
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
                                <span className="text-red-700 font-bold">
                                  *
                                </span>
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
                                <span className="text-red-700 font-bold">
                                  *
                                </span>
                              </span>
                              <select
                                name="specialist"
                                id=""
                                placeholder="Select Specialist Stuff"
                                className="text-custom-green-dark transition-all w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                              >
                                <option>Select Specialist Stuff</option>
                                <option value="coder">Coder</option>
                                <option value="designer">Designer</option>
                                <option value="manager">Manager</option>
                                <option value="director">
                                  Director && Master
                                </option>
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
                          Next
                        </button>
                      </div>
                      {/* Next Button End */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
