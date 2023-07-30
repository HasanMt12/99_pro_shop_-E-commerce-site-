import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Categories = ({category}) => {
    
    const {name , categoryId} = category
    return (
        <Link to = {
            `categories/${categoryId}`
        } >
        <li className = "cursor-pointer    mx-6 my-3 font-semibold  uppercase hover:text-[#EA0F62]  text-start flex justify-start gap-4 items-center " >
            <h2>{name}</h2>
             <IoIosArrowForward></IoIosArrowForward>
        </li>
        </Link>
    );
};

export default Categories;