"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-white text-black px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}