"use server";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export async function checkout() {

  const authSession = await getServerSession();

  if (!authSession) {
    throw new Error("Not logged in");
  }

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
    throw new Error("Cart empty");
  }

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    })),

    mode: "payment",

    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",

    metadata: {
      userEmail: authSession.user?.email || ""
    }
  });

  redirect(stripeSession.url!);
}