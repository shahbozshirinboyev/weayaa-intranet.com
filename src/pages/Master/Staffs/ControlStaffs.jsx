import { Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ControlStaffs() {
  // Add New Staff START
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    name: "",
    dept: "",
    batch: "",
    varsity: "",
    session: "",
    address: "",
    district: "",
    thana: "",
    post: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const next = () => {
    if (formNo === 1 && state.name && state.dept && state.batch) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 2 &&
      state.varsity &&
      state.session &&
      state.address
    ) {
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
    setUserImage(e.target.files[0]);
  };
  const handleClearFileUserImage = () => {
    setFile(null);
    document.getElementById('user-image').value = '';
  };

  return (
    <section>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {/* Modal Open Button START && Add New Staff*/}
      <button
        className="rounded-[10px] w-[150px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark hover:text-white hover:bg-custom-green-dark transition-all duration-150"
        onClick={() => document.getElementById("add_user_modal").showModal()}
      >
        <i className="bi bi-person-add text-[24px] mx-[5px]"></i>
        <span className="mx-[5px]">Add Staff</span>
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
            <div className="p-6">
              <div className="flex justify-center items-center border border-red-700 transition-all duration-300">
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
                  <div className="grid grid-cols-1">

                    <div className="flex mt-2 gap-2 items-center">

                      <div className="w-[100px] h-[100px] border border-red-700">
                        {
                          userImage === null
                          ?
                          <i class="bi bi-person-bounding-box"></i>
                          :
                          <img src={userImage} alt="" />
                        }
                        
                      </div>

                      <div className="w-full border border-red-600">

                        <label htmlFor="">
                        <button onClick={handleClearFileUserImage} className="px-2 py-1 mr-2 rounded-[10px] text-[14px] bg-red-400 hover:bg-red-600 text-white font-medium transition-all">Delete</button>
                        <input type="file" id="user-image" className=" text-[14px] text-custom-green-dark font-medium placeholder-custom-green-60
                        file:mr-4 file:py-1 file:px-2
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
                        An image of the person, it’s best if it has the same length and height.
                        <br /> 
                        <span className="text-custom-green-dark font-medium">Recommendation: 300x300px</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]">First Name</span>
                          <input type="text" placeholder="Enter Staff First Name" className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60" />
                        </label>
                      </div>
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]">Last Name</span>
                          <input type="text" placeholder="Enter Staff Last Name" className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60" />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]"><i class="bi bi-telephone"></i> Phone Number</span>
                          <input type="text" placeholder="+998 90 123 45 67" className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60" />
                        </label>
                      </div>
                      <div>
                        <label>
                          <span className="block text-custom-green-dark font-semibold text-[14px]"><i class="bi bi-envelope"></i> Email Address</span>
                          <input type="email" placeholder="example@gmail.com" className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60" />
                        </label>
                      </div>
                    </div>

                    <div></div>

                    <div></div>

                    <div></div>

                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      value={state.name}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                      type="text"
                      name="name"
                      placeholder="name"
                      id="name"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="dept">Dept</label>
                    <input
                      value={state.dept}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                      type="text"
                      name="dept"
                      placeholder="dept name"
                      id="dept"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="batch">Batch</label>
                    <input
                      value={state.batch}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                      type="number"
                      name="batch"
                      placeholder="batch"
                    />
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    <button
                      onClick={next}
                      className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                    >
                      Next
                    </button>
                  </div>

                </div>
              )}

              {formNo === 2 && (
                <div>
                  <div className="flex flex-col mb-2">
                    <label className="text-slate-500" htmlFor="varsity">
                      Varsity
                    </label>
                    <input
                      value={state.varsity}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                      type="text"
                      name="varsity"
                      placeholder="varsity name"
                      id="varsity"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label className="text-slate-500" htmlFor="session">
                      session
                    </label>
                    <input
                      value={state.session}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                      type="text"
                      name="session"
                      placeholder="session"
                      id="session"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label className="text-slate-500" htmlFor="address">
                      Address
                    </label>
                    <textarea
                      value={state.address}
                      onChange={inputHandle}
                      row="10"
                      className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                      type="number"
                      name="address"
                      placeholder="address"
                    ></textarea>
                  </div>
                  <div className="mt-4 gap-3 flex justify-center items-center">
                    <button
                      onClick={pre}
                      className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                    >
                      Previous
                    </button>
                    <button
                      onClick={next}
                      className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {formNo === 3 && (
                <div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="district">District</label>
                    <input
                      value={state.district}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                      type="text"
                      name="district"
                      placeholder="district name"
                      id="district"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="thana">Thana</label>
                    <input
                      value={state.thana}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                      type="text"
                      name="thana"
                      placeholder="thana"
                      id="thana"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label htmlFor="post">Post</label>
                    <input
                      value={state.post}
                      onChange={inputHandle}
                      className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                      type="text"
                      name="post"
                      placeholder="post"
                      id="post"
                    />
                  </div>
                  <div className="mt-4 gap-3 flex justify-center items-center">
                    <button
                      onClick={pre}
                      className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                    >
                      Previous
                    </button>
                    <button
                      onClick={finalSubmit}
                      className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
                    >
                      Submit
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

export default ControlStaffs;
