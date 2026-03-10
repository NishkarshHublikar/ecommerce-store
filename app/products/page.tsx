import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className ="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* <h1>Products</h1> */}
      {/*<pre>{JSON.stringify(products, null, 2)}</pre>*/}
      {products.map((product) => (
        <ProductCard 
            key={product.id} 
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
        />
      ))}
    </div>
  );
}