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
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [longUrl, router]);

  if (error) {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-4">
          <Image
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-404-error-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--alert-warning-no-results-found-empty-state-pack-seo-web-illustrations-2969402.png?f=webp" // Replace this with a relevant error image
            alt="Error"
            width={300}
            height={300}
            className="mb-[-10vh]"
          />
          <h1 className="text-3xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-lg text-gray-700">{error}</p>
          <Link href="/" className="mb-[-10vh]">
            <span className="text-blue-500 underline">Go back to the homepage</span>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[5vh] bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
        <p className="text-lg mb-2">You will be redirected to:</p>
        <div className="absolute">
          {longUrl && (
            <>
              <iframe src={longUrl} className="lg:w-[40vw] w-full lg:h-[50vh] h-[50vh]" />
            </>
          )}
        </div>
        <div className="relative lg:w-[40vw] w-full lg:h-[51vh] h-[50vh] bg-opacity-10 bg-gray-200 text-gray-600 translate-y-[-5vh]">
          <div className="flex justify-center items-center">
            <span className="font-bold text-white mt-[20vh]">Review</span>
          </div>
        </div>
        <p className="text-blue-500 text-lg underline">{longUrl}</p>
        <p className="text-gray-600 mb-[-10vh]">in {countdown} seconds...</p>
        <Button variant="flat" color="danger" className="translate-y-[12vh]" onClick={() => router.push("/")}>
          Cancle
        </Button>
      </div>
    </>
  );
}
