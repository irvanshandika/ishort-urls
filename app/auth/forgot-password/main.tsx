/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { auth } from "@/src/config/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import Logo from "@/src/components/images/Logo.webp";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);

      toast.success(`Password reset URL successfully sent to ${email}`, {
        duration: 6000,
      });

      router.push("/auth/signin");
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <h1 className="font-medium self-center text-xl sm:text-3xl text-gray-800">Reset Password</h1>
          <Link href="/" className="flex justify-center items-center">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>
          <p className="mt-4 self-center text-xl sm:text-sm text-gray-800">Enter your email to receive a password reset link</p>

          <div className="mt-10">
            <form onSubmit={handleResetPassword}>
              <div className="flex flex-col mb-5">
                <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i aria-hidden className="fas fa-at text-blue-500"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button type="submit" className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Reset Password</span>
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  If you don't have an account yet, you can create one{" "}
                  <Link href="/auth/signup" className="text-blue-500 uppercase">
                    here
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
