import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddStaff() {
  // Add New Staff START
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    specialist: "",
    workTime: "",
    address: "",
    account_type: "",
    userId: "",
    userPassword: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // har bir inputga qo'shamiz
  // value={state.name}
  // onChange={inputHandle}
  const next = () => {
    if (formNo === 1 && state.firstName && state.lastName && state.specialist) {
      setFormNo(formNo + 1);
    } else if (formNo === 2) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fillup all input field");
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };
  const finalSubmit = () => {
    if (state.district && state.thana && state.post) {
      console.log(state);
      toast.success("form submit success");
    } else {
      toast.error("Please fillup all input field");
    }
  };
  // Add New Staff END

  const [userImage, setUserImage] = useState(null);

  const handleFileUserImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClearFileUserImage = () => {
    setUserImage(null);
    document.getElementById("user-image").value = "";
  };

  return (
    <section>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

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

        <div className="modal-box max-w-3xl h-[700px] p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">
              Add New Staff
            </span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
                ✕
              </button>
            </div>
          </form>
          {/* Modal header End */}

          <section>
            <div className="p-6 ">
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
                            type="file"
                            id="user-image"
                            className="text-[14px] text-custom-green-dark font-medium placeholder-custom-green-60
                        file:mr-4 file:py-1 file:px-2 file:w-[100px]
                        file:rounded-[10px] file:border-0
                        file:text-sm file:font-semibold
                        file:bg-custom-green-30 file:text-custom-green-dark
                        hover:file:bg-custom-green-dark hover:file:text-white
                        hover:file:transition-all
                        "
                            onChange={handleFileUserImageChange}
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
                            <i class="bi bi-telephone"></i> Phone Number
                          </span>
                          <input
                            value={state.phone}
                            onChange={inputHandle}
                            name="phone"
                            type="text"
                            placeholder="+998 90 123 45 67"
                            className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]">
                            <i class="bi bi-envelope"></i> Email Address
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
                          </span>
                          <select
                            value={state.specialist}
                            onChange={inputHandle}
                            name="specialist"
                            id=""
                            placeholder="Select Specialist Stuff"
                            className="text-custom-green-dark transition-all w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                          >
                            <option selected>Select Specialist Stuff</option>
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
                              value={state.workTime}
                              onChange={inputHandle}
                              type="radio"
                              name="workTime"
                            />
                            <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                              Full Time
                            </span>
                          </label>
                          <label className="p-2 border rounded-md flex items-center">
                            <input
                              value={state.workTime}
                              onChange={inputHandle}
                              type="radio"
                              name="workTime"
                            />
                            <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                              Part Time
                            </span>
                          </label>
                        </div>
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

              {formNo === 2 && (
                <div>
                  <div className="grid grid-cols-1">
                    <div className="mt-2">
                      <span className="text-custom-green-dark font-semibold text-[15px]">
                        Working days:
                      </span>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-80 flex items-center">
                        <input
                          onChange={inputHandle}
                          type="radio"
                          name="workTime"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Monday
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-80 flex items-center">
                        <input onChange={inputHandle} type="radio" name="" />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Tuesday
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-80 flex items-center">
                        <input onChange={inputHandle} type="radio" name="" />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Wednesday
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-80 flex items-center">
                        <input onChange={inputHandle} type="radio" name="" />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Thursday
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-80 flex items-center">
                        <input onChange={inputHandle} type="radio" name="" />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Friday
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-60 flex items-center">
                        <input onChange={inputHandle} type="radio" name="" />
                        <span className="text-custom-green-60 font-semibold text-[15px] ml-[15px]">
                          Saturday
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="mt-2 p-2 border-b-[2px] border-custom-green-60 flex items-center">
                        <input onChange={inputHandle} type="radio" name="" />
                        <span className="text-custom-green-60 font-semibold text-[15px] ml-[15px]">
                          Sunday
                        </span>
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
                      onClick={next}
                      className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-white bg-custom-green-80 hover:bg-custom-green-dark transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {formNo === 3 && (
                <div>
                  <div className="text-custom-green-dark font-semibold text-[15px] mt-2">
                    <span>Account Type</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border rounded-md">
                    <div>
                      <label className="p-2 flex items-center">
                        <input
                          onChange={inputHandle}
                          type="radio"
                          name="accountType"
                        />
                        <span className="text-custom-green-dark font-semibold text-[15px] ml-[15px]">
                          Staff Account
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="p-2 flex items-center">
                        <input
                          onChange={inputHandle}
                          type="radio"
                          name="accountType"
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
                          <i class="bi bi-person-check"></i> WeaYaa ID
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
                          <i class="bi bi-key"></i> Password
                        </span>
                        <input
                          value={state.lastName}
                          onChange={inputHandle}
                          name="lastName"
                          type="password"
                          placeholder="**********"
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        />
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
            </div>
          </section>
        </div>
      </dialog>
    </section>
  );
}

export default AddStaff;
