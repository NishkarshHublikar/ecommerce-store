import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <ProductCard
            id={1}
            name="Classic Watch"
            price={149}
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        />

        <ProductCard
            id={2}
            name="Modern Lamp"
            price={299}
            image="https://images.unsplash.com/photo-1503602642458-232111445657"
        />

        <ProductCard
            id={3}
            name="Elegant Chair"
            price={199}
            image="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
        />

        <ProductCard
            id={4}
            name="Minimalist Table"
            price={399}
            image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
        />


        <ProductCard 
            id={5}
            name ="Smartphone Pro"
            price={699}
            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
        />
        
        <ProductCard   
            id={6}
            name="Amazon Echo "
            price ={299}
            image="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
        />

    </div>
  );
}