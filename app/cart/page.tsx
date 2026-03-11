import { prisma } from "@/lib/prisma";

export default async function CartPage() {

  const cart = await prisma.cart.findFirst({
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-4 text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.items.map((item) => (

          <div
            key={item.id}
            className="flex items-center gap-6 border p-4 rounded-lg"
          >

            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.product.name}</h2>

              <p className="text-gray-500">
                ${item.product.price}
              </p>

              <p className="text-sm mt-1">
                Quantity: {item.quantity}
              </p>
            </div>

            <div className="font-semibold">
              ${item.product.price * item.quantity}
            </div>

          </div>

        ))}
      </div>

    </div>
  );
}