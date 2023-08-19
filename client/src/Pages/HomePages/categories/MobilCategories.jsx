import { Link } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";
const MobilCategories = ({category}) => {
   const {name , categoryId} = category
    return (
        <Link to={`categories/${categoryId}`}>
        <li className = "cursor-pointer md:mx-4 sm:mx-2 text-xs   font-semibold  uppercase hover:text-[#EA0F62]  text-start flex justify-start  items-center " >
            <h2>{name}</h2>
            <IoIosArrowForward></IoIosArrowForward>
        </li>
        </Link>
    );
};

export default MobilCategories;