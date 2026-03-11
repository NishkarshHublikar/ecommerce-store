"use client";

import toast from "react-hot-toast";
import { useTransition } from "react";

export default function CartQuantityButton({
  id,
  quantity,
  action
}: any) {

  const [isPending, startTransition] = useTransition();

  const update = (newQty: number) => {

    const toastId = toast.loading("Updating cart...");

    startTransition(async () => {
      try {

        await action(id, newQty);

        toast.success("Cart updated", {
          id: toastId
        });

      } catch {

        toast.error("Update failed", {
          id: toastId
        });

      }
    });

  };

  return (
    <div className="flex items-center gap-3">

      <button
        onClick={() => update(quantity - 1)}
        className="border px-2 rounded"
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        onClick={() => update(quantity + 1)}
        className="border px-2 rounded"
      >
        +
      </button>

    </div>
  );

}