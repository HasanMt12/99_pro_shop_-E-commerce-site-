import { useNavigate } from "react-router-dom";



const SIngleCategoriesCard = ({category}) => {
    const {imageUrl , categoryId} = category

  const navigate = useNavigate()
  const from = location.state?.from?.pathname || `/categories/${categoryId}`
  const handleRedirectClick = () => {
    // Redirect to the desired route when the <div> is clicked
     navigate(from, { replace: true });  navigate(`/categories/${categoryId}`);
  }
    return (
       
        
        <div
         onClick={handleRedirectClick} 
         className="bg-sky-50 py-1 cursor-pointer flex justify-center items-center">
        <div className="mx-auto">
                <img src={imageUrl} className="lg:w-[8rem] lg:h-[8rem] md:w-[5.rem] md:h-[5.5rem] w-[4rem] h-[4rem] rounded-sm object-cover">
                    
                </img>
                <h2 className="text-center text-pink-500 lg:text-sm md:text-xs text-[8px]">{categoryId}</h2>
            </div>
        </div>
       
    );
};

export default SIngleCategoriesCard;