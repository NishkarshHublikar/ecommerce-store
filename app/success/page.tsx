import { prisma } from "@/lib/prisma";

export default async function SuccessPage() {

  const cart = await prisma.cart.findFirst({
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (cart && cart.items.length > 0) {

    const order = await prisma.order.create({
      data: {
        items: {
          create: cart.items.map((item) => ({
            quantity: item.quantity,
            price: item.product.price,
            productId: item.product.id
          }))
        }
      }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    });

  }

  return (
    <div className="p-10 text-center">

      <h1 className="text-4xl font-bold text-green-500">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-gray-500">
        Your order has been placed successfully.
      </p>

      <a
        href="/products"
        className="mt-6 inline-block bg-black text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </a>

    </div>
  );

}