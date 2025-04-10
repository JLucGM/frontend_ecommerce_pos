"use client";

import { CircleX } from "lucide-react";


export default function NotFoundPage() {

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <CircleX className="text-red-500 w-24 h-24 mb-4" />
      <h2 className="text-2xl font-bold mb-2">¡Oops!</h2>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>      
    </div>
  );
}