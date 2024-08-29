"use client";
import { useState } from "react";
import { auth, db, googleProvider } from "@/src/config/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import GoogleIcon from "@/src/components/icons/GoogleIcon";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import Logo from "@/src/components/images/Logo.webp";
import Image from "next/image";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [showAlert, setShowAlert] = useState(false); // State for showing alert
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL || null,
        password: hashedPassword,
      });

      setAlertMessage("Success: Your account has been successfully registered");
      setShowAlert(true);
      setTimeout(() => {
        router.push("/auth/signin");
      }, 4000);
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Sign-up failed. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        password: null,
      });

      setAlertMessage("Success: Your account has been successfully registered");
      setShowAlert(true);
      setTimeout(() => {
        router.push("/auth/signin");
      }, 4000);
    } catch (error) {
      console.error("Error with Google sign-up:", error);
      alert("Google sign-up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <h1 className="font-medium self-center text-xl sm:text-3xl text-gray-800">Sign Up</h1>
        <Link href="/" className="flex justify-center items-center">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </Link>
        <p className="mt-4 self-center text-xl sm:text-sm text-gray-800">Sign up your account for unlimited access to all features</p>
        <div className="mt-10">
          {showAlert && (
            <>
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded">{alertMessage}</div>
            </>
          )}
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col mb-5">
              <label htmlFor="name" className="mb-1 text-xs tracking-wide text-gray-600">
                Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i aria-hidden className="fas fa-user text-blue-500"></i>
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="email_user" className="mb-1 text-xs tracking-wide text-gray-600">
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i aria-hidden className="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="email_user"
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex w-full">
              <button type="submit" className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Sign Up</span>
                <span>
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
          <div className="mt-2 mb-4 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-2/3">Or sign Up With</div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button variant="bordered" onClick={handleGoogleSignUp}>
              Sign Up with{" "}
              <span className="bg-white p-2 rounded-full">
                <GoogleIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <p className="ml-2 inline-flex items-center text-gray-700 font-medium text-xs text-center">You have an account?</p>
        <Link href="/auth/signin" className="text-xs ml-2 text-blue-500 font-semibold">
          Sign In here
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;
