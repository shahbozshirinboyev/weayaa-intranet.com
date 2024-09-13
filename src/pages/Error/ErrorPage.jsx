import React from 'react';
import logo_long from '../../../public/img/logo_long.png'
import error from '../../../public/img/error.jpg'

const ErrorPage = () => {

    return (


        <main class="w-screen h-screen grid grid-col-1 md:grid-col-2 lg:grid-cols-2 p-[150px]">

            <div class="text-left lg:ml-[120px]" >

                <div className='flex justify-left pt-[200px]'>
                    <img src={logo_long} className='w-[400px]' alt="" />
                </div>


                <p class="mt-8 text-base font-semibold ">404. That's error</p>
                <p class="mt-6 text-base leading-7 text-gray-600"> The required URL /2r09324 was not found on this server </p>
                <p class=" text-base leading-7 text-gray-600"> That's all we know. </p>

                <div class="mt-10 flex items-center  gap-x-6">
                    <a href="#" class="rounded-md bg-custom-green-30 text-custom-green-dark hover:bg-custom-green-dark hover:text-white  px-3.5 py-2.5 text-sm font-semibold ">Go back home</a>
                    {/* <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a> */}
                </div>

            </div>

            <div class="flex justify-right items-center h-full">
                <img src={error} className='w-[400px]' alt="" />
            </div>

        </main>


    );

};

export default ErrorPage;