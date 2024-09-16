import http from "../../../services/http";

function MasterDashboard() {

  http.get("users/announcements/", {

      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    })
    .then((dashboad) => {
      console.log(dashboad.data.results[1])})
    .catch((error) => {
      toast.error("Dashboard ma'lumotlari olinmadi");
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
      {/* CARD 1 START */}
      <div className="bg-custom-green-10 rounded-[20px] p-[15px] text-custom-green-dark relative border border-custom-green-30 group transition-all duration-300 ease-in-out">
        <h2 className="font-bold text-[18px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          odit!
        </h2>

        <p className="text-justify text-[16px] opacity-90 font-medium pt-[25px] pb-[20px] mb-[25px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod autem
          enim quis odio ratione amet ullam sapiente, reiciendis repellendus ab.
        </p>

        <div className="grid grid-cols-2 text-[14px] font-bold absolute inset-x-0 bottom-[15px] mx-[15px]">
          <div className="text-start">
            <span className="mr-[5px]">
              <i className="bi bi-person-circle"></i>
            </span>
            <span>Tommy Kim</span>
          </div>

          {/* <div className="text-center">
            <span className="mr-[5px]">
              <i className="bi bi-clock"></i>
            </span>
            <span>10:45</span>
          </div> */}

          <div className="text-end">
            <span className="mr-[5px]">
              <i className="bi bi-calendar-week"></i>
            </span>
            <span className="tooltip" data-tip="10:45 AM">
              7 Sep. 2024
            </span>
          </div>
        </div>
        {/* Card Hover Section Start */}
        <div className="absolute w-full h-full inset-x-0 top-0 rounded-[20px] bg-custom-green-60 text-center hidden group-hover:block transition-all duration-300 ease-in-out">
          <div className="flex justify-center items-center h-full text-white">
            <button className="w-[70px] h-[70px] rounded-[10px] mx-[40px] bg-custom-green-dark text-[20px] hover:text-[25px] hover:border-[2px] transition-all duration-75 ease-in-out">
              <i className="bi bi-pencil"></i>
            </button>

            <button className="w-[70px] h-[70px] rounded-[10px] mx-[40px] bg-custom-green-dark text-[20px] hover:text-[25px] hover:border-[2px] transition-all duration-75 ease-in-out">
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
        {/* Card Hover Section End */}
      </div>
      {/* CARD 1 END */}

      {/* Add new card start */}
      <button
        className="group bg-custom-green-10 hover:bg-custom-green-15 transition-all rounded-[20px] cursor-pointer border-[3px] border-dashed border-custom-green-60"
        onClick={() => document.getElementById("add_new_news").showModal()}
      >
        <div className="flex items-center justify-center h-full w-full">
          <i className="bi bi-plus-circle text-[30px] group-hover:text-[35px] transition-all text-custom-green-60"></i>
        </div>
      </button>

      <dialog id="add_new_news" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
      {/* Add new card end */}
    </div>
  );
}

export default MasterDashboard;
