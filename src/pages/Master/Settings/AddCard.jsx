import React, { useState } from 'react';

export default function AddCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

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
  

  const handleCardNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 16) input = input.slice(0, 16);

    const formattedCardNumber = input.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 4) input = input.slice(0, 4);

    const formattedExpiryDate = input.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    setExpiryDate(formattedExpiryDate);
  };

  return (
    <div>

      <button className="rounded-[5px] flex justify-center items-center w-full h-full" onClick={toggleModal}>
        <span className='text-[30px]  hover:custom-green-60'>
          <i className="bi bi-plus-circle"></i>
        </span>
      </button>

      {isOpen && (
        <div
          className={`bg-black bg-opacity-50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full max-h-full flex overflow-y-auto transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className={`relative p-4 w-full max-w-md max-h-full transition-transform duration-300 transform ${isAnimating ? 'translate-y-0' : 'translate-y-10'}`}
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
                      <label
                        htmlFor="cardName"
                        className="block mb-2 text-sm font-medium text-custom-green-dark"
                      >
                        Card Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        id="cardName"
                        className="border border-custom-green-60 text-sm rounded-lg focus:border-custom-green-dark focus:outline-none block w-full p-2.5"
                        placeholder="Zerda Jursinova"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block mb-2 text-sm font-medium text-custom-green-dark"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className="border border-custom-green-60 text-sm rounded-lg focus:border-custom-green-dark focus:outline-none block w-full p-2.5"
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block mb-2 text-sm font-medium text-custom-green-dark"
                      >
                        Card Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        maxLength={5}
                        className="border border-custom-green-60 text-sm rounded-lg focus:border-custom-green-dark focus:outline-none block w-full p-2.5"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-custom-green-60 hover:bg-custom-green-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login to your account
                    </button>
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
