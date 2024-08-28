"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/src/config/FirebaseConfig";
import Image from "next/image";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

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

        const docData = querySnapshot.docs[0].data();
        setLongUrl(docData.longUrl);

        if (process.env.NODE_ENV === "production") {
          trackVisitor(querySnapshot.docs[0].id, docData.visitors || []);
        }
      } catch (err) {
        setError("Failed to fetch the long URL from the database");
      }
    };

    const trackVisitor = async (docId: string, existingVisitors: string[]) => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;

      if (!existingVisitors.includes(visitorId)) {
        existingVisitors.push(visitorId);
        await updateDoc(doc(db, "shorturls", docId), {
          visitors: existingVisitors,
          visitorCount: existingVisitors.length,
        });
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
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [longUrl, router]);

  if (error) {
    return <div>{error}</div>;
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
