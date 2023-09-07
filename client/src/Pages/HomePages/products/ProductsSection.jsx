import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";
import CategoriesCard from "../categories/CategoriesCard";

const ProductsSection = () => {
     const allProduct = useLoaderData()
     console.log(allProduct);


    return (
         <div className="lg:px-20 px-3  lg:mx-[6rem]">
            {/* fetching categories  */}
            <CategoriesCard></CategoriesCard>
              <div className="productsDiv ">
                  {allProduct && 
                    allProduct.map((product, key) => (
                      <ProductCard key={key} product={product}>
                      </ProductCard>                       
                  ))}
            </div>
        </div>
    );
};

export default ProductsSection;