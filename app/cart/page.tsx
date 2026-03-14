import { prisma } from "@/lib/prisma";
import { removeFromCart } from "@/app/actions/cart";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import { updateCartQuantity } from "@/app/actions/cart";
import CartQuantityButton from "@/components/CartQuantityButton";
import { checkout } from "@/app/actions/checkout";

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

  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

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

              <CartQuantityButton
                id={item.id}
                quantity={item.quantity}
                action={updateCartQuantity}
              />

            </div>

            <div className="font-semibold">
              ${item.product.price * item.quantity}
            </div>

            <RemoveFromCartButton
              id={item.id}
              action={removeFromCart}
            />

          </div>

        ))}
      </div>

      <div className="mt-10 flex justify-between items-center">

        <div className="text-2xl font-bold">
          Total: ${total}
        </div>

        <form action={checkout}>
          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Checkout
          </button>
        </form>

      </div>

    </div>
  );
}