import React, { useState } from "react";

export default function EditCardInfo() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleCardNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 16) input = input.slice(0, 16);

    const formattedCardNumber = input.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 4) input = input.slice(0, 4);

    const formattedExpiryDate = input.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    setExpiryDate(formattedExpiryDate);
  };

  return (
    <>
      <button onClick={() => document.getElementById("EditCardInfo").showModal()}
        className="flex justify-center items-center py-1 px-2 rounded-[5px] font-semibold bg-custom-green-30 hover:bg-custom-green-dark hover:text-white transition-all duration-300"
      >
        <i className="bi bi-pencil mr-2"></i> Edit
      </button>

      <dialog id="EditCardInfo" className="modal">
        <div className="modal-box max-w-lg p-0">
          {/* Modal header Start */}
          <form
            method="dialog"
            className="border-b-[2px] border-custom-green-80 h-[60px] grid grid-cols-2 items-center px-[24px] bg-custom-green-10"
          >
            <span className="text-custom-green-dark font-bold">Edit Card Info</span>
            <div className="text-end">
              <button className="btn btn-sm border-0 btn-circle text-center border-red-700 items-center text-custom-green-dark bg-custom-green-10 hover:bg-custom-green-30">
              <i className="bi bi-x-lg flex justify-center items-center"></i>
              </button>
            </div>
          </form>
          {/* Modal header End */}
          <section className="text-[14px]">
            <form className=" p-4" action="#">
              <div>
                <label
                  htmlFor="cardName"
                  className="block mb-2 text-sm font-medium text-custom-green-dark"
                >
                  <span>Card Name</span>
                  <input
                  type="text"
                  name="cardName"
                  id="cardName"
                  className="border placeholder:text-custom-green-60 border-custom-green-60 text-sm rounded-lg focus:border-custom-green-dark focus:outline-none block w-full p-2.5"
                  placeholder="Zerda Jursinova"
                  required
                />
                </label>
                
              </div>
              <div className="grid grid-cols-4">
                <label
                  htmlFor="cardNumber"
                  className="block mb-2 text-sm font-medium text-custom-green-dark col-span-3 mr-1"
                >
                  <span>Card Number</span>
                  <input
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="border placeholder:text-custom-green-60 border-custom-green-60 text-sm rounded-lg focus:border-custom-green-dark focus:outline-none block w-full p-2.5"
                  placeholder="0000 0000 0000 0000"
                  required
                />
                </label>
                
              
                <label
                  htmlFor="expiryDate"
                  className="block mb-2 text-sm font-medium text-custom-green-dark ml-1"
                >
                  <span>Card Expiry Date</span>
                  <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5}
                  className="border placeholder:text-custom-green-60 border-custom-green-60 text-sm rounded-lg focus:border-custom-green-dark focus:outline-none block w-full p-2.5"
                  placeholder="MM/YY"
                  required
                />
                </label>
                
              </div>
              <button
                type="submit"
                className=" mt-4 w-full text-white bg-custom-green-60 hover:bg-custom-green-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300"
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
    </>
  );
}
