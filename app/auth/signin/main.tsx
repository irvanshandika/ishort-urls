/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { auth, db } from "@/src/config/FirebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import GoogleIcon from "@/src/components/icons/GoogleIcon";
import { useRouter } from "next/navigation";
import Logo from "@/src/components/images/Logo.webp";
import Image from "next/image";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setAlertMessage(`Sorry, the account with email ${email} has not been registered. Please register on the signup page.`);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setAlertMessage("Incorrect email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setAlertMessage(`Sorry, the account with email ${user.email} has not been registered. Please register on the signup page.`);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setAlertMessage("An error occurred while logging in with Google. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {alertMessage && <div className="fixed top-5 bg-red-500 text-white p-4 rounded-lg shadow-lg">{alertMessage}</div>}
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <h1 className="font-medium self-center text-xl sm:text-3xl text-gray-800">Sign In</h1>
          <Link href="/" className="flex justify-center items-center">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>
          <p className="mt-4 self-center text-xl sm:text-sm text-gray-800">Sign in to your account to access all features</p>

          <div className="mt-10">
            <form onSubmit={handleSignIn}>
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
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <i aria-hidden className="fas fa-lock text-blue-500"></i>
                    </span>
                  </div>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex justify-end items-end mt-6">
                  <Link href="/auth/forgot-password" className="text-xs text-blue-500 font-semibold">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="flex w-full">
                <button type="submit" className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Sign In</span>
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="mt-2 mb-4 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2/3">Or sign In With</div>
              </div>
              <div className="flex justify-center items-center mt-4">
                <Button variant="bordered" onClick={handleGoogleSignIn}>
                  <span className="ml-4">Continue with Google</span>
                  <div className="bg-white p-2 rounded-full">
                    <GoogleIcon />
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <p className="ml-2 inline-flex items-center text-gray-700 font-medium text-xs text-center">Don't have an account yet?</p>
          <Link href="/auth/signup" className="text-xs ml-2 text-blue-500 font-semibold">
            Sign Up here
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
