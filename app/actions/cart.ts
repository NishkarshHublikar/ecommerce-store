"use server";

import { prisma } from "@/lib/prisma";

export async function addToCart(productId: number) {

  // Find existing cart (for now we use a single cart)
  let cart = await prisma.cart.findFirst();

  // If cart doesn't exist, create one
  if (!cart) {
    cart = await prisma.cart.create({
      data: {}
    });
  }

  // Check if product already in cart
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: productId
    }
  });

  if (existingItem) {
    // Increase quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + 1
      }
    });
  } else {
    // Add new item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: productId,
        quantity: 1
      }
    });
  }
}