import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { addToCart } from "@/app/actions/cart";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
    const { productId } = await params;
    const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });

  if (!product) return notFound();

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-lg"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-xl text-gray-600 mb-6">
          ${product.price}
        </p>
        <AddToCartButton productId={product.id} action={addToCart} />
      </div>
    </div>
  );
}