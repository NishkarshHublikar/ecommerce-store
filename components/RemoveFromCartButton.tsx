"use client";

import toast from "react-hot-toast";
import { useTransition } from "react";

export default function RemoveFromCartButton({ id, action }: any) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    const toastId = toast.loading("Removing item...");

    startTransition(async () => {
      try {
        await action(id);

        toast.success("Item removed from cart", {
          id: toastId
        });

      } catch {
        toast.error("Failed to remove item", {
          id: toastId
        });
      }
    });
  };

  return (
    <button
      onClick={handleRemove}
      className="text-red-500 font-medium"
    >
      {isPending ? "Removing..." : "Remove"}
    </button>
  );
}