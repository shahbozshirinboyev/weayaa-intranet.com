import React from "react";
import AddStaff from "../../../components/AddStaff";

function ControlStaffs() {
  return (
    <>
      <div>ControlStaffs - Coming Soon ...</div>
      <AddStaff />

      

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

          <table class="w-full text-sm text-left text-gray-500">

          <caption class="p-2 text-lg font-semibold text-left text-gray-900 bg-white">
            Our products
            <p class="mt-1 text-sm font-normal text-gray-500">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
          </caption>

              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                  <tr className="text-[14px] text-custom-green-90 bg-custom-green-10">   

                      <th scope="col" class="px-6 py-3">
                          Full Name
                      </th>

                      <th scope="col" class="px-6 py-3">
                          Contact
                      </th>
                      
                      <th scope="col" class="px-6 py-3">
                          Working Days
                      </th>

                      <th scope="col" class="px-6 py-3">
                          Position
                      </th>

                      <th scope="col" class="px-6 py-3">
                          Type
                      </th>

                  </tr>

              </thead>

              <tbody>

                  <tr class="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                     
                      <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <img class="w-10 h-10 rounded-full" src="https://picsum.photos/id/237/300/300" alt="Jese image"/>
                          <div class="ps-3">
                              <div class="text-base font-semibold text-custom-green-dark">Neil Sims</div>
                              <div class="font-normal text-custom-green-80">UI/UX developer</div>
                          </div>  
                      </td>

                      <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <div class="text-base font-semibold text-custom-green-dark">+998 93 009 11 66</div>
                          <div class="font-normal text-custom-green-80">bonnie@flowbite.com</div>
                      </td>
                      
                      <td class="px-6 py-4">
                        <div className="flex">
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">M</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">T</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">W</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">T</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">F</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">S</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">S</div>
                        </div>   
                      </td>

                      <td class="px-6 py-4">
                          <div class="flex items-center text-custom-green-dark font-semibold">
                              Designer
                          </div>
                      </td>

                      <td class="px-6 py-4">
                          <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">PART-TIME</span>
                      </td>

                  </tr>

                  <tr class="bg-white border-b hover:bg-gray-50">
                      
                      <td scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <img class="w-10 h-10 rounded-full" src="https://picsum.photos/300/300/?blur" alt="Jese image"/>
                          <div class="ps-3">
                              <div class="text-base font-semibold text-custom-green-dark">Bonnie Green</div>
                              <div class="font-normal text-custom-green-80">iOS Developer</div>
                          </div>
                      </td>

                      <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          <div class="text-base font-semibold text-custom-green-dark">+998 94 567 34 21</div>
                          <div class="font-normal text-custom-green-80">bonnie@flowbite.com</div>
                      </td>

                      <td class="px-6 py-4">
                        <div className="flex">
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">M</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">T</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">W</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">T</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">F</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">S</div>
                          <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">S</div>
                        </div>   
                      </td>

                      <td class="px-6 py-4">
                          <div class="flex items-center text-custom-green-dark font-semibold">
                              Coder
                          </div>
                      </td>

                      <td class="px-6 py-4">
                      <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">FULL-TIME</span>
                      </td>

                  </tr>

              </tbody>
          </table>
      </div>

      



    </>
  );
}

export default ControlStaffs;
