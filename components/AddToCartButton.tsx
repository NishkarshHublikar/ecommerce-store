"use client";

import toast from "react-hot-toast";
import { useTransition } from "react";

export default function AddToCartButton({ productId, action }: any) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {

    const toastId = toast.loading("Adding item to cart...");

    startTransition(async () => {
      try {
        await action(productId);

        toast.success("Item added to cart 🛒", {
          id: toastId
        });

      } catch (error) {

        toast.error("Failed to add item to cart ❌", {
          id: toastId
        });

      }
    });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}