import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function OrdersPage() {

  const session = await getServerSession();

  if (!session) {
    return <div className="p-10">Please login to see your orders.</div>;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!
    }
  });

  if (!user) {
    return <div className="p-10">User not found.</div>;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4">

          <p className="font-semibold">Order ID: {order.id}</p>

          {order.items.map((item) => (
            <p key={item.id}>
              {item.product.name} × {item.quantity}
            </p>
          ))}

        </div>
      ))}

    </div>
  );
}