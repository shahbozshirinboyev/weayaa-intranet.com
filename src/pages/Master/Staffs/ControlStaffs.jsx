import React, { useState } from "react";
import AddStaff from "../../../components/AddStaff";

function ControlStaffs() {
    const [smlist, setSmlist] = useState("staff");

    const changeListToStaff = (e) => {
        setSmlist(e);
    };

    return (
        <>
            <div className="font-semibold bg-white pb-[15px]">
                <div className="grid grid-cols-2">
                    <div className="flex justify-start items-start">
                        <div className="mr-[5px] rounded-[10px] w-[260px] h-[35px] flex justify-center items-center bg-custom-green-30 text-custom-green-dark">
                            <div
                                className={`w-[130px] h-[35px] bg-custom-green-dark absolute rounded-[8px] transition-all duration-300 ease-in-out transform ${smlist === "staff"
                                        ? "translate-x-[-65px]"
                                        : "translate-x-[65px]"
                                    }`}
                            ></div>

                            <button
                                onClick={() => {
                                    changeListToStaff("staff");
                                }}
                                className={`flex justify-center items-center w-full rounded-[8px] transform  ${smlist === "staff" ? "text-white" : ""
                                    } transition-all duration-300`}
                            >
                                <i className="bi bi-person text-[22px] mx-[5px]"></i>
                                <span className="mx-[5px] text-[14px] font-semibold">
                                    Staffs
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    changeListToStaff("master");
                                }}
                                className={`flex justify-center items-center w-full rounded-[8px] transform ${smlist === "master" ? "text-white" : ""
                                    } transition-all duration-300`}
                            >
                                <i className="bi bi-person-check text-[22px] mx-[5px]"></i>
                                <span className="mx-[5px] text-[14px] font-semibold">
                                    Masters
                                </span>
                            </button>
                        </div>

                        <button className="rounded-[10px] w-[125px] h-[35px] bg-custom-green-30 text-custom-green-dark cursor-default transition-all duration-150">
                            <span className="text-[22px] mx-[5px]">25</span>
                            <span className="text-[14px] font-semibold">Staffs</span>
                        </button>
                    </div>

                    <div className="flex justify-end items-center">
                        <div className="relative z-50">
                            <AddStaff />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-[14px] text-custom-green-90 bg-custom-green-10">
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Working Days
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>

                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    {smlist === "staff" ? (
                        <tbody>
                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/id/237/300/300"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Neil Sims
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            UI/UX developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 93 009 11 66
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Designer
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        PART-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/300/300/?blur"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Bonnie Green
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            iOS Developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 94 567 34 21
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Coder
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        FULL-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/id/237/300/300"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Neil Sims
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            UI/UX developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 93 009 11 66
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Designer
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        PART-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/300/300/?blur"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Bonnie Green
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            iOS Developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 94 567 34 21
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Coder
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        FULL-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/360/360/?blur"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Bonnie Green
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            iOS Developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 94 567 34 21
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Coder
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        FULL-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/303/330/?blur"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Bonnie Green
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            iOS Developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 94 567 34 21
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Coder
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        FULL-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="bg-white border-b border-custom-green-30 hover:bg-custom-green-5">
                                <td
                                    scope="row"
                                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://picsum.photos/200/200/?blur"
                                        alt="Jese image"
                                    />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold text-custom-green-dark">
                                            Bonnie Green
                                        </div>
                                        <div className="font-normal text-custom-green-80">
                                            iOS Developer
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className="text-base font-semibold text-custom-green-dark">
                                        +998 94 567 34 21
                                    </div>
                                    <div className="font-normal text-custom-green-80">
                                        bonnie@flowbite.com
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            M
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            W
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            T
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-dark text-white font-semibold">
                                            F
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                        <div className=" mr-[2px] w-[22px] h-[22px] rounded-full flex  justify-center items-center bg-custom-green-30 text-custom-green-dark font-semibold">
                                            S
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex items-center text-custom-green-dark font-semibold">
                                        Coder
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="bg-custom-green-30 text-custom-green-dark font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                                        FULL-TIME
                                    </span>
                                </td>

                                <td>
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="border btn btn-sm border-custom-green-30 px-[5px] py-[3px] rounded-full text-custom-green-dark font-bold hover:bg-custom-green-30">
                                            <i className="bi bi-person-gear text-[22px]"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
}

export default ControlStaffs;
