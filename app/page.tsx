// app/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Our App</h1>
      <p className="text-gray-500 text-lg mt-2">Secure and Fast Authentication</p>

      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        onClick={() => router.push("/sign-in")}
      >
        Sign In
      </button>
    </div>
  );
}
