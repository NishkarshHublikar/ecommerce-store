import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {

  const body = await req.text();

  const event = stripe.webhooks.constructEvent(
    body,
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {

    const stripeSession = event.data.object as Stripe.Checkout.Session;

    const userEmail =
      (stripeSession.metadata as { userEmail?: string })?.userEmail;

    const cart = await prisma.cart.findFirst({
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.order.create({
      data: {
        userId: user.id,
        items: {
          create: cart.items.map((item) => ({
            quantity: item.quantity,
            price: item.product.price,
            productId: item.product.id
          }))
        }
      }
    });

    // clear cart after purchase
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    });

  }

  return NextResponse.json({ received: true });
}