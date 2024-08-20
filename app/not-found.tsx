import React from "react";
import NavigasiBar from "@/src/components/Navbar";

function NotFound() {
  return (
    <>
      <NavigasiBar />
      <div className="flex flex-col items-center justify-center mt-[30vh]">
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
        <p className="text-lg text-gray-500">The page you are looking for does not exist.</p>
      </div>
    </>
  );
}

export default NotFound;
