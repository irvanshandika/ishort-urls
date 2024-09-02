"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Illustration from "@/src/components/images/Illustration.webp";
import { db } from "@/src/config/FirebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import SuccessAlert2 from "@/src/components/SuccessAlert2";
import ErrorAlert from "@/src/components/ErrorAlert";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/config/FirebaseConfig";
import { useRouter } from "next/navigation";

function HeroSection() {
  const [longUrl, setLongUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortCount, setShortCount] = useState(0);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const checkQuota = async () => {
      const publicShortsQuery = query(collection(db, "shorturls"), where("deviceId", "==", getDeviceId()));
      const snapshot = await getDocs(publicShortsQuery);
      setShortCount(snapshot.size);
    };

    if (!user) {
      checkQuota();
    }
  }, [user]);

  const getDeviceId = () => {
    // Simple function to get or set a device ID for tracking
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2);
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shortCount >= 5 && !user) {
      setError("Maaf, quota short urls publik anda telah melampaui batas. Jika ingin mengakses tanpa batasan, harap login");
      setTimeout(() => {
        setError("");
        router.refresh(); // Refresh the page
      }, 5000);
      return;
    }

    try {
      setIsLoading(true);

      // Create short URL data
      const shortUrlData = {
        longUrl,
        shortUrl: customShortUrl || Math.random().toString(36).substring(7), // Generate short URL if custom not provided
        deviceId: user ? null : getDeviceId(), // Null if user is logged in
        userId: user?.uid || null, // Save userId if logged in
      };

      await addDoc(collection(db, "shorturls"), shortUrlData);

      setShortUrl(customShortUrl ? customShortUrl : shortUrlData.shortUrl);
      setSuccess("Short URL created successfully!");
      setLongUrl("");
      setCustomShortUrl("");
    } catch (err) {
      setError("Failed to create short URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Simplify Your Links with <span className="text-blue-500">iShort URLs</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">Tired of long and confusing URLs? With iShort URLs, you can easily shorten your links for a clean and concise look.</p>
          <form className="w-full max-w-md items-center mb-6 flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long URL here"
              className="w-full py-[7px] px-4 rounded-lg text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={customShortUrl}
              onChange={(e) => setCustomShortUrl(e.target.value)}
              placeholder="Custom short URL"
              required
              className="w-full py-[7px] px-4 my-3 rounded-lg text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-500 text-gray-100 font-semibold ml-3 rounded-lg hover:bg-blue-300 transition duration-300 ease-in-out" type="submit" disabled={isLoading}>
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </form>
          {shortUrl && (
            <input
              type="text"
              value={`https://${process.env.NODE_ENV === "production" ? "ishort.my.id" : "localhost:3000"}/${shortUrl}`}
              readOnly
              className="w-full py-[7px] px-4 mt-4 rounded-lg text-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {success && <SuccessAlert2 message={success} />}
          {error && <ErrorAlert message={error} />}
          <p className="text-sm mt-4">Sign up your account to enjoy unlimited URL shortening</p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image src={Illustration} alt="URL Shortening Illustration" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
