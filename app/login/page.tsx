"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6">
      <h1 className="text-3xl font-bold">Login</h1>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-white text-black px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}