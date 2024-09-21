"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/src/config/FirebaseConfig";
import Image from "next/image";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Link from "next/link";
import { Button } from "@nextui-org/react";

interface RedirectPageProps {
  params: { shortUrl: string };
}

export default function RedirectPage({ params }: RedirectPageProps) {
  const [countdown, setCountdown] = useState(5);
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

    const trackVisitor = async (docId: string, existingVisitors: { visitorId: string; accessDate: string }[]) => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;

      const isVisitorExist = existingVisitors.some((visitor) => visitor.visitorId === visitorId);

      if (!isVisitorExist) {
        const currentDate = new Date().toISOString();

        const newVisitor = {
          visitorId,
          accessDate: currentDate,
        };

        existingVisitors.push(newVisitor);

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
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [longUrl, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Image
          src="https://cdn3d.iconscout.com/3d/free/thumb/free-404-error-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--alert-warning-no-results-found-empty-state-pack-seo-web-illustrations-2969402.png?f=webp"
          alt="Error"
          width={300}
          height={300}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-lg text-gray-700 mb-4">{error}</p>
        <Link href="/">
          <a className="text-blue-500 underline">Go back to the homepage</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
      <p className="text-lg mb-2">You will be redirected to:</p>
      <p className="text-blue-500 text-lg underline break-all">{longUrl}</p>
      <p className="text-gray-600 mb-4">in {countdown} seconds...</p>
      <div className="relative w-full max-w-xl aspect-w-16 aspect-h-9 mb-4">{longUrl && <iframe src={longUrl} className="w-full h-full" />}</div>
      <Button variant="flat" color="danger" onClick={() => router.push("/")}>
        Back to Home
      </Button>
    </div>
  );
}
