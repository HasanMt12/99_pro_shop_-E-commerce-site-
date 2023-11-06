import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Categories = ({category}) => {
    const {name , categoryId } = category
   
    return (
        <Link to={`/categories/${categoryId}`}>
        <li className = "cursor-pointer font-Montserrat hover:text-sky-500 hover:bg-sky-100/60  px-6 py-1  text-[0.9rem]  text-pink-500  text-start flex justify-between start gap-4 items-center" >
            {name}
             <IoIosArrowForward></IoIosArrowForward>
        </li>
        </Link>
    );
};

export default Categories;