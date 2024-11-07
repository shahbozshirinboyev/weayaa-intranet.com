import { NavLink } from "react-router-dom";
import logo_long from "../../../public/img/logo_long.png";
import error from "../../../public/img/error.jpg";

const ErrorPage = () => {
  return (
    <section className="w-screen h-screen grid grid-col-1 p-[25px] md:p-[150px]">
      <div className="text-left lg:ml-[120px]">
        <div className="flex justify-left pt-[200px]">
          <img
            src={logo_long}
            className="w-[250px] md:w-[350px] xl:w-[400px]"
            alt=""
          />
        </div>

        <p className="mt-8 text-base font-semibold text-red-600 text-[24px]">
          404. That's error
        </p>

        <p className="mt-6 text-base leading-7 text-gray-600 text-[12px]">
          {" "}
          The required URL /2r09324 was not found on this server{" "}
        </p>

        <p className=" text-base leading-7 text-gray-600">
          {" "}
          That's all we know.{" "}
        </p>

        <div className="mt-10 flex items-center  gap-x-6">
          <NavLink to="/">
            <button className="rounded-md bg-custom-green-30 text-custom-green-dark hover:bg-custom-green-dark hover:text-white  px-3 py-2 text-sm font-semibold transition-all duration-300">
              Go back home
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
