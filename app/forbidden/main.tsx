/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavigasiBar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ForbiddenIllustration from "@/src/components/images/Forbidden.webp";
import Image from "next/image";

function Forbidden() {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // Countdown logic
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    // Redirect after 3 seconds
    const redirectTimeout = setTimeout(() => {
      router.push("/auth/signin");
    }, 3000);

    // Cleanup intervals and timeouts
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <>
      <NavigasiBar />
      <div className="flex flex-col justify-center items-center mt-[25vh]">
        <Image src={ForbiddenIllustration} width={200} height={200} alt="Forbidden" />
        <h1 className="text-center text-4xl mt-10">403 Forbidden</h1>
        <p className="text-center text-gray-600">You don't have permission to access this page.</p>
        <p className="text-center text-gray-600 mt-4">
          Redirecting to sign-in page in <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Forbidden;
