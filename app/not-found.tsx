import React from "react";
import NavigasiBar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Illustration from "@/src/components/images/404.webp";

function NotFound() {
  return (
    <>
      <NavigasiBar />
      <div className="flex flex-col items-center justify-center mt-[10vh]">
        <Image alt="Image Error 404" width={100} height={100} className="lg:w-[20vw] w-[50vw]" src={Illustration} />
        <h1 className="text-4xl font-bold mb-4">Not Found</h1>
        <p className="text-lg text-gray-500 text-center">The page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Back to Homepage
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
