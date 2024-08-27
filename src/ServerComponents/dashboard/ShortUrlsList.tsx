"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/src/config/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import InputUrls from "@/src/ServerComponents/dashboard/InputUrls";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@nextui-org/react";
import { CopyDocumentIcon } from "@/src/components/icons/CopyDocumentIcon";
import { EditDocumentIcon } from "@/src/components/icons/EditDocumentIcon";
import { DeleteDocumentIcon } from "@/src/components/icons/DeleteDocumentIcon";

function ShortUrlsList() {
  const [user] = useAuthState(auth);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [shortUrls, setShortUrls] = useState<any[]>([]);
  const [totalShortUrls, setTotalShortUrls] = useState<number>(0);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, "shorturls"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const urls = querySnapshot.docs.map((doc) => doc.data());

        setShortUrls(urls);
        setTotalShortUrls(urls.length);
        setTotalVisitors(urls.reduce((acc, url) => acc + (url.visitors || 0), 0));
      }
    };

    fetchData();
  }, [user]);

  const handleCopy = (shortUrl: string, index: number) => {
    // Determine if it's production or development
    const domain = process.env.NODE_ENV === "production" ? "https://ishort.my.id" : "http://localhost:3000";
    const fullUrl = `${domain}/${shortUrl}`;

    // Copy the full URL to the clipboard
    navigator.clipboard.writeText(fullUrl);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard Summary</h2>
        <div className="flex justify-around text-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-600">{totalShortUrls}</h3>
            <p className="text-gray-600">Total Short URLs</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600">{totalVisitors}</h3>
            <p className="text-gray-600">Total Visitors</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Short URLs</h2>
          <InputUrls />
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {shortUrls.map((url, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Title: {url.title}</h3>
                <Dropdown>
                  <DropdownTrigger>
                    <button>
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                    <DropdownItem onClick={() => handleCopy(url.shortUrl, index)} key="copy" description="Copy the file link" startContent={<CopyDocumentIcon className={iconClasses} />}>
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </DropdownItem>
                    <DropdownItem key="edit" showDivider description="Allows you to edit the file" startContent={<EditDocumentIcon className={iconClasses} />}>
                      Edit file
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger" description="Permanently delete the file" startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}>
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-500">
                  <span className="text-black">Your short url:</span> {url.shortUrl}
                </p>
              </div>
              <p className="text-gray-600 text-sm">Created: {new Date(url.createdAt?.seconds * 1000).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm">Visitors: {url.visitors}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShortUrlsList;
