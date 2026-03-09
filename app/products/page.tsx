import ProductCard from "@/components/ProductCard";
export default function ProductsPage(){
    return(
        <div className ="p-10 grid grid-cols-3 gap-6">
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    );
}