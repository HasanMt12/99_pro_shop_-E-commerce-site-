import { useQuery } from "@tanstack/react-query";
import SIngleCategoriesCard from "./SIngleCategoriesCard";
import { Link } from "react-router-dom";


const CategoriesCard = () => {
     const {data: categories = []  } = useQuery({
        queryKey: ['categories'],
        queryFn: async() =>{
            const res = await fetch(`https://99-pro-shop-server.vercel.app/categories`);
            const data = await res.json();
            return data;    
        }
    });
    return (
        <div className="grid lg:grid-cols-8  grid-cols-4 gap-2 my-2 ">
            {
               categories.map(category=> <SIngleCategoriesCard
                    key={category._id}
                    category={category}
                    >    
                    </SIngleCategoriesCard>)
            }
            <Link to='/offer'><div className=" bg-sky-50 cursor-pointer py-1 flex justify-center items-center">
                <div>
                    <img src="https://i.ibb.co/P4vYWjJ/bigDeal.jpg" className="lg:w-[8rem] lg:h-[8rem] md:w-[5.rem] md:h-[5.5rem] w-[4rem] h-[4rem] rounded-sm object-cover"/>
                    <h2 className="text-center text-pink-500 lg:text-sm md:text-xs text-[8px]">Big deal</h2>
                </div>
            </div></Link>
            
             <Link to='/offer'><div className="bg-sky-50 cursor-pointer py-1 flex justify-center items-center">
                <div>
                    <img src="https://i.ibb.co/fkfVSp7/free-Delivery.jpg" className="lg:w-[8rem] lg:h-[8rem] md:w-[5.rem] md:h-[5.5rem] w-[4rem] h-[4rem] rounded-sm object-cover"/>
                    <h2 className="text-center text-pink-500 lg:text-sm md:text-xs text-[8px] lg:text-sm md:text-xs text-[8px]">Free delivery</h2>
                </div>
            </div></Link>
            <Link to='/offer'><div className="bg-sky-50 cursor-pointer py-1 flex justify-center items-center">
                <div>
                    <img src="https://i.ibb.co/3CGpxM3/offer.jpg" className="lg:w-[8rem] lg:h-[8rem] md:w-[5.rem] md:h-[5.5rem] w-[4rem] h-[4rem] rounded-sm object-cover"/>
                    <h2 className="text-center text-pink-500 lg:text-sm md:text-xs text-[8px]">special Offer</h2>
                </div>
            </div></Link> 
        
        </div>
    );
};

export default CategoriesCard;