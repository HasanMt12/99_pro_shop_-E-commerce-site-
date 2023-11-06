import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";
import CategoriesCard from "../../Pages/categories/CategoriesCard";


const ProductsSection = () => {
     const allProduct = useLoaderData()

    return (
         <div className="lg:px-20 px-3  lg:mx-[6rem] min-h-screen">
      {/* fetching categories  */}
            <CategoriesCard></CategoriesCard>
            <div>
 
     {/* Render your actual data once it's fetched */}
        <div className="productsDiv ">
       
          {allProduct && 
                    allProduct.map((product, key) => (
                      <ProductCard key={key} product={product}>
                      </ProductCard>                       
                  ))}
        </div>
    
    </div>
             
        </div>
    );
};

export default ProductsSection;