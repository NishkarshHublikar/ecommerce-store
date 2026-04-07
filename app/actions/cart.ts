"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function addToCart(productId: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not logged in");
  }

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name,
      image: session.user.image
    }
  });

  if (!user) throw new Error("User not found");

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
      include: { items: true }
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 }
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1
      }
    });
  }

  revalidatePath("/cart");
}

export async function removeFromCart(cartItemId: number) {
  await prisma.cartItem.delete({
    where: { id: cartItemId }
  });

  revalidatePath("/cart");
}

export async function updateCartQuantity(
  cartItemId: number,
  quantity: number
) {
  if (quantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: cartItemId }
    }); 
  } else {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity }
    });
  }

  revalidatePath("/cart");
}