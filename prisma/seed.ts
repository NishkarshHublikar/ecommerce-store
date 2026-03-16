import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "iPhone 15",
        price: 999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
      },
      {
        name: "MacBook Pro",
        price: 1999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
      },
      {
        name: "AirPods",
        price: 199,
        image: "https://images.unsplash.com/photo-1588156979435-379b9d802b3f"
      },
      {
        name: "Gaming Mouse",
        price: 79,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
      },
      {
        name: "Mechanical Keyboard",
        price: 149,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef"
      }
    ]
  });
}

main();