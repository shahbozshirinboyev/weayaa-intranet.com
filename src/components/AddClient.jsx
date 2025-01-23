import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import http from "../services/http"

function AddClient({ setCount }) {
  // Password hide/show function START
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => { setShowPassword(!showPassword); };
  // Password hide/show function END
  const [state, setState] = useState({ weayaa_id: "", password: "", first_name: "", last_name: "", address: "", email: "", organization: "", image: "" })
  const inputHandle = (e) => { setState({ ...state, [e.target.name]: e.target.value, }); };

  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const clearAvatar = () => { setAvatar({ file: null, url: "" }) }
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      setState({ ...state, image: e.target.files[0], });
    }
  };

  const addClientUser = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("weayaa_id", state.weayaa_id);
    formData.append("password", state.password);
    formData.append("first_name", state.first_name);
    formData.append("last_name", state.last_name);
    formData.append("email", state.email);
    formData.append("address", state.address);
    formData.append("organization", state.organization);
    formData.append("image", state.image);

    const access = localStorage.getItem("access");
    console.log(state.address)

    toast.promise(
      http.post("users/clients/register/", formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      }),
      {
        loading: "Adding...",
        success: (response) => {
          const randomNum = Math.floor(Math.random() * 100); // 0 dan 99 gacha bo'lgan random son
          setCount(randomNum);
          document.getElementById("add_client_modal").close();
          setState({ weayaa_id: "", password: "", first_name: "", address: "", last_name: "", email: "", organization: "", image: "" })
          console.log(response.data);
          return <b>Add new User!</b>;
        },
        error: (error) => {
          console.log(error.response.data);
          return <span>Something went wrong :(</span>;
        },
      }
    );


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
            <form onSubmit={addClientUser}>
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
                          className="text-[14px] text-transparent font-medium placeholder-custom-green-60 file:mr-4 file:py-1 file:px-2 file:w-[100px] file:rounded-[10px] file:border-0 file:text-sm file:font-semibold file:bg-custom-green-30 file:text-custom-green-dark hover:file:bg-custom-green-dark hover:file:text-white hover:file:transition-all"
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
                          <span>First Name</span><span className="text-red-700 font-bold">*</span>
                        </span>
                        <input
                          value={state.first_name}
                          onChange={inputHandle}
                          name="first_name"
                          autoComplete="username"
                          required
                          type="text"
                          placeholder="Enter Staff First Name"
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <span>Last Name</span><span className="text-red-700 font-bold">*</span>
                        </span>
                        <input
                          value={state.last_name}
                          onChange={inputHandle}
                          name="last_name"
                          required
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
                        <i className="bi bi-telegram mr-1"></i><span>Telegram</span>
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
                          <i className="bi bi-envelope-at-fill mr-1"></i><span>Email Address</span>
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
                      <span className="block text-custom-green-dark font-semibold text-[14px]">
                      <i className="bi bi-person-fill-gear mr-1"></i><span>Account Type</span>
                        
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
                          <i className="bi bi-building-fill mr-1"></i><span>Organization</span>
                        </span>
                        <input
                          value={state.organization}
                          onChange={inputHandle}
                          name="organization"
                          type="text"
                          placeholder="Enter organization"
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <i className="bi bi-person-check-fill mr-1"></i><span>WeaYaa ID</span><span className="text-red-700 font-bold">*</span>
                        </span>
                        <input
                          value={state.weayaa_id}
                          name="weayaa_id"
                          onChange={inputHandle}
                          required
                          type="text"
                          placeholder="Enter WeaYaa ID"
                          className="w-full p-2 border rounded-md outline-0 focus:border-custom-green-80 placeholder-custom-green-60"
                        />
                      </label>
                    </div>

                    <div>
                      <label>
                        <span className="block text-custom-green-dark font-semibold text-[14px]">
                          <i className="bi bi-key-fill mr-1"></i><span>Password</span><span className="text-red-700 font-bold">*</span>
                        </span>
                        <div className="relative">
                          <input
                            value={state.password}
                            name="password"
                            required
                            onChange={inputHandle}
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
                  <button type="submit" className="px-3 py-2 text-[15px] rounded-[10px] w-full font-medium text-custom-green-dark hover:text-white bg-custom-green-10 hover:bg-custom-green-dark transition-all mt-3">
                    Save
                  </button>
                </div>
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
