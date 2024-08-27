"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/src/config/FirebaseConfig";

interface RedirectPageProps {
  params: { shortUrl: string };
}

export default function RedirectPage({ params }: RedirectPageProps) {
  const [countdown, setCountdown] = useState(3); // 3-second countdown
  const [longUrl, setLongUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const q = query(collection(db, "shorturls"), where("shortUrl", "==", params.shortUrl));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Short URL not found in the database");
          return;
        }

        const doc = querySnapshot.docs[0].data();
        setLongUrl(doc.longUrl);
      } catch (err) {
        setError("Failed to fetch the long URL from the database");
      }
    };

    fetchLongUrl();
  }, [params.shortUrl]);

  useEffect(() => {
    if (longUrl) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const redirectTimer = setTimeout(() => {
        router.push(longUrl);
      }, 3000); // Redirect after 3 seconds

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [longUrl, router]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!longUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
      <p className="text-lg mb-2">You will be redirected to:</p>
      <p className="text-blue-500 text-lg underline mb-4">{longUrl}</p>
      <p className="text-gray-600">in {countdown} seconds...</p>
    </div>
  );
}
