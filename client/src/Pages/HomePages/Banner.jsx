import banner from "/logo52.svg";
import { BsFacebook } from "react-icons/bs";
const Banner = () => {
  return (
    <div className="relative z-1 my-6 lg:mx-[8rem]">
      <div className="absolute z-2 top-2 lg:left-40 left-20 lg:h-[2rem] h-[1rem] shadow-md rounded-lg lg:p-2 p-1 shadow-sky-100 text-white font-semibold lg:text-lg md:text-sm text-sx  flex justify-center items-center">
        {/* redirect facebook to page */}
        <a className="" title="visit our facebook page " target="blank" href="https://www.facebook.com/99ProShopBD/">Connect with us on FaceBook Page</a>
        <a target="blank" href="https://www.facebook.com/99ProShopBD/"><BsFacebook className="text-blue-500 ml-3"></BsFacebook></a>
      </div>
      <img className="w-full shadow-lg rounded-lg mt-2 shadow-pink-100" src={banner}></img>
    </div>
  );
};

export default Banner;
