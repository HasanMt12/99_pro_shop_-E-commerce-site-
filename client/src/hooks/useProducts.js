import { useQuery } from "@tanstack/react-query";

const useProducts = () => {

    const {data: allProducts = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['allProducts'],
        queryFn: async() => {
            const res = await fetch('https://99-pro-shop-server.vercel.app/allProducts');
            return res.json();
        }
    })

    return [allProducts, loading, refetch]
}

export default useProducts;