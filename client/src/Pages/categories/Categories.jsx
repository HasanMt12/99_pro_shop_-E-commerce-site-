/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Categories = ({category}) => {
    
    const {name , categoryId } = category
   
    return (
        <Link to = {
            `categories/${categoryId}`
        } >
        <li className = "cursor-pointer  hover:text-sky-400 hover:bg-sky-100 hover:opacity-80 pl-[4.5rem] pr-[3rem] py-2  text-[0.9rem]  text-[#EA0F62]  text-start flex justify-between start gap-4 items-center" >
            <h2>{name}</h2>

             <IoIosArrowForward></IoIosArrowForward>
        </li>
        </Link>
    );
};

export default Categories;