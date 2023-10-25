import { Link } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
const MobilCategories = ({category}) => {
   const {name , categoryId} = category
    return (
        <Link to={`categories/${categoryId}`}>
        <li className = "cursor-pointer hover:text-blue-400/80  text-[#EA0F62] md:mx-4 sm:mx-2 text-xs   font-semibold  uppercase hover:text-[#EA0F62]  text-start flex justify-start  items-center  " >
            <h2>{name}</h2>
            <IoIosArrowForward className="ml-1 mr-2"></IoIosArrowForward>
        </li>
        </Link>
    );
};

export default MobilCategories;